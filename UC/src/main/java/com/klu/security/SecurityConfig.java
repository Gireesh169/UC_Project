package com.klu.security;

import com.klu.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/auth/**").permitAll()
                
                // USER role bookings, update profile, submit reviews
                .requestMatchers(HttpMethod.POST, "/booking/create").hasRole("USER")
                .requestMatchers(HttpMethod.GET, "/booking/user/**").hasRole("USER")
                .requestMatchers(HttpMethod.PUT, "/users/edit/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/reviews").hasRole("USER")
                
                // TECHNICIAN role bookings & profile
                .requestMatchers(HttpMethod.GET, "/booking/technician/**").hasAnyRole("TECHNICIAN", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/booking/*/status").hasAnyRole("TECHNICIAN", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/technicians/user/**").hasAnyRole("TECHNICIAN", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/technicians/update/**").hasAnyRole("TECHNICIAN", "ADMIN")

                // ADMIN role users, technicians, services, issues
                .requestMatchers(HttpMethod.POST, "/technicians").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/technicians/all").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/services/create").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/issues/create").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/booking/all").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/booking/pending").hasAnyRole("ADMIN", "TECHNICIAN")
                .requestMatchers(HttpMethod.GET, "/booking/history").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/booking/*/assign/*").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/booking/*").hasRole("ADMIN")
                
                // Shared authenticated endpoints
                .requestMatchers(HttpMethod.GET, "/services/all", "/services/*").hasAnyRole("USER", "TECHNICIAN", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/issues/service/*").hasAnyRole("USER", "TECHNICIAN", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/reviews/technician/*").hasAnyRole("USER", "TECHNICIAN", "ADMIN")
                .requestMatchers(HttpMethod.GET, "/technicians/available/**").hasAnyRole("USER", "ADMIN")
                
                .anyRequest().authenticated()
            );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedHeaders(List.of("Origin", "Content-Type", "Accept", "Authorization"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

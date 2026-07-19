# Home Appliance Repair & Technician Booking System

A full-stack web application for managing home appliance repairs, booking appointments, assigning technicians, and tracking repair statuses. Secured using **Spring Security 6 (Spring Boot 3)**, **JWT Authentication**, and **Role-Based Access Control (RBAC)**.

---

## 🛠️ Tech Stack
* **Backend**: Java 17+, Spring Boot 3, Spring Data JPA, MySQL, Spring Security 6, JJWT (JSON Web Token)
* **Frontend**: React (Vite), Axios, Tailwind CSS, React Router DOM v6
* **Database**: MySQL

---

## 🔒 Security Architecture

### 1. User Roles & Mappings
The application maps user registration roles to backend Spring Security roles:
* **Customer (`citizen`)** ➔ `ROLE_USER` (Can search services, report issues, book appointments, and view booking history).
* **Technician (`worker`)** ➔ `ROLE_TECHNICIAN` (Can view assigned bookings, complete technician profiles, and update booking status).
* **Admin (`admin`)** ➔ `ROLE_ADMIN` (Can manage services, issues, assign technicians, and view global dashboards).

### 2. Authentication Flow
```
[ Frontend Login ]
        │
        ▼ POST /auth/login (email + password)
[ Spring Boot AuthenticationManager ] ➔ Validates credentials via CustomUserDetailsService
        │
        ▼ Success
[ JWT Token Generated ] ➔ Returns JWT token + User details object
        │
        ▼ Saved
[ LocalStorage ] ➔ Token and User details stored in frontend
```

### 3. Request Authorization
Every API request (except public routes `/auth/login` and `/auth/signup`) is intercepted on both backend and frontend:
* **Frontend**: Axios global request interceptor automatically attaches the `Authorization: Bearer <jwt-token>` header from `localStorage`.
* **Backend**: `JwtAuthenticationFilter` parses the header, verifies token validity/expiration using `JwtService`, and populates the `SecurityContext`.

---

## 🚀 Getting Started

### Prerequisites
* **JDK 17 or 21**
* **MySQL Server**
* **Node.js** (v18+) & **npm**

### Database Setup
1. Create a MySQL database named `uc`:
   ```sql
   CREATE DATABASE uc;
   ```
2. Configure credentials in [application.properties](file:///Users/apple/Documents/2@year/Repair_Project_with_Dhanush/UC/src/main/resources/application.properties):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/uc
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

---

## ⚙️ Running the Application

### 1. Start the Spring Boot Backend
Navigate to the `UC` directory and run:
```bash
# Using Maven wrapper (macOS/Linux)
./mvnw spring-boot:run

# Or run using system Maven (specifying Java 17/21 home if needed)
JAVA_HOME=/path/to/jdk-17-or-21 mvn spring-boot:run
```
The backend server runs on `http://localhost:8080`.

### 2. Start the React Frontend
Navigate to the `uc-frontend` directory and run:
```bash
npm install
npm run dev
```
The frontend application runs on `http://localhost:5173`.

---

## 🧪 Testing the APIs via Postman

### 1. User Registration (Public)
* **Method**: `POST`
* **URL**: `http://localhost:8080/auth/signup`
* **Body** (JSON):
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "password": "mySecurePassword",
    "phone": "9876543210",
    "address": "456 Oak Street",
    "role": "citizen"
  }
  ```

### 2. User Login (Public)
* **Method**: `POST`
* **URL**: `http://localhost:8080/auth/login`
* **Body** (JSON):
  ```json
  {
    "email": "alex@example.com",
    "password": "mySecurePassword"
  }
  ```
* **Response**: Contains the `token` string and the `user` detail object. Copy the token.

### 3. Hitting Protected Endpoints (Authenticated)
* Add a header to your Postman request:
  * **Key**: `Authorization`
  * **Value**: `Bearer <YOUR_COPIED_TOKEN>`
* Try calling `GET http://localhost:8080/services/all` to retrieve services list.

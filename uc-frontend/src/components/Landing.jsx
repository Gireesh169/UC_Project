import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/vite.svg";
import {
  FaCheckCircle,
  FaStar,
  FaQuestionCircle,
  FaChevronDown,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaClock,
  FaThumbsUp
} from "react-icons/fa";

export default function Landing() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const services = [
    {
      title: "AC Services",
      desc: "Deep cleaning, gas charging, leak repairs, and complete installation/uninstallation.",
      price: "₹299",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=60"
    },
    {
      title: "Refrigerator Repair",
      desc: "Fixing cooling issues, thermostat replacements, gas leakage, and compressor repairs.",
      price: "₹349",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60"
    },
    {
      title: "Washing Machine",
      desc: "Resolving drum issues, drainage problems, motor malfunctions, and general servicing.",
      price: "₹249",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500&auto=format&fit=crop&q=60"
    },
    {
      title: "Television Repair",
      desc: "LED/LCD screen repairs, sound issues, power board failures, and port replacements.",
      price: "₹399",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60"
    }
  ];

  const testimonials = [
    {
      name: "Rohan Sharma",
      role: "Homeowner",
      content: "The service was incredibly fast! The technician arrived within an hour of booking and fixed my AC in no time. Highly recommended!",
      rating: 5
    },
    {
      name: "Sneha Patel",
      role: "Apartment Resident",
      content: "Super convenient platform. I booked a washing machine repair late at night, and they had someone over by 10 AM. Excellent service.",
      rating: 5
    },
    {
      name: "Amit Verma",
      role: "Office Manager",
      content: "Transparent pricing and verified technicians. I love that there are no hidden fees. B1K Services is my go-to for all repairs.",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "How does booking a service work on B1K Services?",
      a: "It's simple! Sign up as a customer, choose your desired appliance service, select the specific issue you're facing, enter your address, and submit. We'll assign a certified technician to your booking."
    },
    {
      q: "Are the technicians background verified?",
      a: "Yes, all technicians on B1K Services undergo rigorous background verification and skill assessment tests to ensure your safety and high service quality."
    },
    {
      q: "What is the warranty on repairs?",
      a: "We offer a 30-day warranty on all repairs and parts replaced during the service. If the issue recurs within 30 days, we'll fix it for free."
    },
    {
      q: "Can I reschedule or cancel my booking?",
      a: "Absolutely. You can cancel or reschedule your booking at any time directly through your dashboard before the technician has been assigned or started working."
    }
  ];

  return (
    <div className="min-h-screen bg-custom-bg text-custom-text font-sans selection:bg-primary selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-custom-border/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center justify-center">
            <img src={logo} alt="B1K Services Logo" className="h-16 md:h-18 w-auto object-contain transition-all duration-300 hover:scale-105" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-600 hover:text-primary font-medium transition-colors">Services</a>
            <a href="#about" className="text-slate-600 hover:text-primary font-medium transition-colors">Why Us</a>
            <a href="#testimonials" className="text-slate-600 hover:text-primary font-medium transition-colors">Reviews</a>
            <a href="#faqs" className="text-slate-600 hover:text-primary font-medium transition-colors">FAQs</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-slate-700 hover:text-primary font-semibold px-4 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-primary/10 hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-blue-50/50 via-white to-custom-bg">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 bg-[radial-gradient(#0B3D91_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-semibold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
              Reliable. Fast. Professional.
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-navy leading-tight tracking-tight">
              Professional Home <br />
              <span className="text-primary relative inline-block">
                Appliance Repair
                <span className="absolute bottom-1.5 left-0 w-full h-2 bg-blue-100 -z-10 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Book certified technicians for AC repair, refrigerator servicing, washing machine troubleshooting, TV repair, and more. Transparent pricing and guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="bg-primary hover:bg-primary-hover text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 text-center flex items-center justify-center gap-3 group"
              >
                Book a Service Now
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#services"
                className="border border-custom-border bg-white hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-2xl text-center transition-all duration-300"
              >
                Explore Services
              </a>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-custom-border">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-primary text-xl shrink-0" />
                <span className="text-sm font-bold text-slate-700">Verified Pros</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-primary text-xl shrink-0" />
                <span className="text-sm font-bold text-slate-700">Quick Turnaround</span>
              </div>
              <div className="flex items-center gap-3">
                <FaThumbsUp className="text-primary text-xl shrink-0" />
                <span className="text-sm font-bold text-slate-700">30-Day Warranty</span>
              </div>
            </div>
          </div>

          <div className="relative justify-self-center lg:justify-self-end w-full max-w-lg">
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
            <div className="bg-white p-5 rounded-[2.5rem] shadow-xl border border-custom-border">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60"
                alt="Appliance Service Technician"
                className="w-full aspect-[4/3] object-cover rounded-[2rem] shadow-inner"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-navy">
              Our Professional Services
            </h2>
            <p className="text-lg text-slate-600">
              Get premium quality repairs and installation for all major home appliance brands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, i) => (
              <div
                key={i}
                className="group bg-custom-bg rounded-3xl overflow-hidden border border-custom-border shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white font-bold px-3.5 py-1.5 rounded-full text-xs shadow-md">
                    Starts {svc.price}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-navy">{svc.title}</h3>
                  <p className="text-slate-650 text-sm leading-relaxed">{svc.desc}</p>
                  <div className="pt-2">
                    <Link
                      to="/login"
                      className="text-primary hover:text-primary-hover font-bold text-sm inline-flex items-center gap-2 transition-colors"
                    >
                      Book service
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 bg-custom-bg border-y border-custom-border/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-navy tracking-tight">
              Why B1K Services is the Best Choice for You
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We understand how disruptive appliance failures can be. Our platform is built to solve your problems as fast, professionally, and stress-free as possible.
            </p>
            <div className="space-y-4 pt-4">
              {[
                "Certified, background-verified technicians with years of hands-on expertise.",
                "100% transparent pricing—you know the cost before the work starts.",
                "Hassle-free online booking and secure tracking from start to finish.",
                "Dedicated customer support team available to assist with any questions."
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <FaCheckCircle className="text-primary text-xl shrink-0 mt-0.5" />
                  <p className="font-semibold text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-custom-border space-y-4 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center text-xl font-bold">1</div>
              <h4 className="text-lg font-bold text-navy">Select Service</h4>
              <p className="text-slate-600 text-sm">Choose from a variety of appliance repairs and servicing options.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-custom-border space-y-4 mt-6 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center text-xl font-bold">2</div>
              <h4 className="text-lg font-bold text-navy">Choose Issue</h4>
              <p className="text-slate-655 text-sm">Specify the exact problem to get a real-time price estimate.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-custom-border space-y-4 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center text-xl font-bold">3</div>
              <h4 className="text-lg font-bold text-navy">Assign Technician</h4>
              <p className="text-slate-600 text-sm">We automatically assign a certified professional near your area.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-custom-border space-y-4 mt-6 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center text-xl font-bold">4</div>
              <h4 className="text-lg font-bold text-navy">Repair Done</h4>
              <p className="text-slate-600 text-sm">The expert visits your doorstep, repairs, and guarantees work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-navy tracking-tight">
              Customer Testimonials
            </h2>
            <p className="text-lg text-slate-600">
              See what our customers are saying about our premium home repair services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-custom-bg p-8 rounded-[2rem] border border-custom-border shadow-sm hover:shadow-md transition-all duration-305 relative">
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(t.rating)].map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed mb-6">"{t.content}"</p>
                <div>
                  <h4 className="font-bold text-navy">{t.name}</h4>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-24 bg-custom-bg border-t border-custom-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-navy tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Clear answers to your common questions about booking, pricing, and warranty.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-custom-border overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-navy hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <FaQuestionCircle className="text-primary text-lg" />
                    {faq.q}
                  </span>
                  <FaChevronDown
                    className={`text-slate-400 transform transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-primary" : ""}`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 border-t border-slate-50 animate-fadeIn">
                    <p className="pl-7 leading-relaxed text-slate-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="B1K Services Logo" className="h-20 w-auto object-contain transition-all duration-300 hover:scale-105" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              High-quality, reliable home appliance repair and booking platform. Fast turnaround, verified experts, and transparent pricing.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-light-blue transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-light-blue transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-light-blue transition-colors">Reviews</a></li>
              <li><a href="#faqs" className="hover:text-light-blue transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>AC Repair & Servicing</li>
              <li>Refrigerator Service</li>
              <li>Washing Machine Repair</li>
              <li>LED/LCD TV Servicing</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-light-blue" />
                <span>+91 9491490888</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-light-blue" />
                <span>support@b1kservices.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-light-blue" />
                <span>KLEF, Vaddeswaram, AP, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 B1K Services. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-light-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-light-blue transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

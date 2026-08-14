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
  FaThumbsUp,
  FaBolt,
  FaAward,
  FaWrench,
  FaTv,
  FaSnowflake,
  FaUserCheck,
  FaLock,
  FaHeadset,
  FaTag,
  FaTruck,
  FaCheck,
  FaFilter,
  FaFire,
  FaMicrochip,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Landing() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const services = [
    {
      title: "AC Services",
      desc: "Deep cleaning, gas charging, leak repairs, and complete installation/uninstallation.",
      price: "₹299",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80",
      icon: <FaSnowflake className="text-blue-500 text-lg sm:text-xl" />,
    },
    {
      title: "Refrigerator Repair",
      desc: "Fixing cooling issues, thermostat replacements, gas leakage, and compressor repairs.",
      price: "₹349",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80",
      icon: <FaShieldAlt className="text-cyan-500 text-lg sm:text-xl" />,
    },
    {
      title: "Washing Machine",
      desc: "Resolving drum issues, drainage problems, motor malfunctions, and general servicing.",
      price: "₹249",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&auto=format&fit=crop&q=80",
      icon: <FaWrench className="text-indigo-500 text-lg sm:text-xl" />,
    },
    {
      title: "Television Repair",
      desc: "LED/LCD screen repairs, sound issues, power board failures, and port replacements.",
      price: "₹399",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80",
      icon: <FaTv className="text-blue-600 text-lg sm:text-xl" />,
    },
    {
      title: "Microwave Repair",
      desc: "Heating coil replacement, touchpad fix, magnetron troubleshooting, and door latch repair.",
      price: "₹299",
      image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&auto=format&fit=crop&q=80",
      icon: <FaFire className="text-orange-500 text-lg sm:text-xl" />,
    },
    {
      title: "Water Purifier Service",
      desc: "RO filter replacement, UV lamp fixing, membrane replacement, and complete descaling.",
      price: "₹199",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4e?w=600&auto=format&fit=crop&q=80",
      icon: <FaFilter className="text-teal-500 text-lg sm:text-xl" />,
    },
    {
      title: "Geyser Repair",
      desc: "Thermostat diagnosis, heating element replacement, tank cleaning, and leak sealant.",
      price: "₹299",
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80",
      icon: <FaBolt className="text-amber-500 text-lg sm:text-xl" />,
    },
    {
      title: "Kitchen Chimney",
      desc: "Blower motor cleaning, filter degreasing, ducting repair, and noise reduction service.",
      price: "₹349",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
      icon: <FaMicrochip className="text-purple-500 text-lg sm:text-xl" />,
    },
  ];

  const stats = [
    { number: "20,000+", label: "Happy Customers", icon: <FaThumbsUp className="text-[#2563EB] text-xl sm:text-2xl" /> },
    { number: "500+", label: "Verified Technicians", icon: <FaUserCheck className="text-[#2563EB] text-xl sm:text-2xl" /> },
    { number: "50,000+", label: "Completed Repairs", icon: <FaWrench className="text-[#2563EB] text-xl sm:text-2xl" /> },
    { number: "4.9★", label: "Customer Rating", icon: <FaStar className="text-[#2563EB] text-xl sm:text-2xl" /> },
  ];

  const steps = [
    { num: "01", title: "Choose Service", desc: "Select from 8+ appliance repair & maintenance categories." },
    { num: "02", title: "Select Issue", desc: "Pick specific symptoms for transparent upfront pricing." },
    { num: "03", title: "Choose Date", desc: "Select your preferred date & convenient arrival slot." },
    { num: "04", title: "Technician Assigned", desc: "A background-verified local expert is assigned." },
    { num: "05", title: "Repair Completed", desc: "Expert arrives at your doorstep & fixes appliance." },
    { num: "06", title: "Rate & Warranty", desc: "Pay securely, rate experience & enjoy 30-day warranty." },
  ];

  const whyChooseUs = [
    {
      title: "Verified Experts",
      desc: "Rigorous background checks & skill evaluations for all technicians before onboarding.",
      icon: <FaAward className="text-[#0B3D91] text-2xl sm:text-3xl" />,
    },
    {
      title: "Transparent Pricing",
      desc: "Fixed upfront quotes with no hidden fees or unexpected post-repair surcharges.",
      icon: <FaTag className="text-[#0B3D91] text-2xl sm:text-3xl" />,
    },
    {
      title: "Doorstep Service",
      desc: "Fast doorstep visits within 60 minutes across all major city locations.",
      icon: <FaTruck className="text-[#0B3D91] text-2xl sm:text-3xl" />,
    },
    {
      title: "Secure Booking",
      desc: "Encrypted platform with OTP-verified appointments and instant confirmation.",
      icon: <FaLock className="text-[#0B3D91] text-2xl sm:text-3xl" />,
    },
    {
      title: "30-Day Warranty",
      desc: "Complete 30-day warranty coverage on all replacement parts and repair workmanship.",
      icon: <FaShieldAlt className="text-[#0B3D91] text-2xl sm:text-3xl" />,
    },
    {
      title: "24/7 Support",
      desc: "Dedicated customer happiness team ready to assist via call, email, or chat.",
      icon: <FaHeadset className="text-[#0B3D91] text-2xl sm:text-3xl" />,
    },
  ];

  const brands = [
    { name: "Samsung", category: "AC, Fridge, TV" },
    { name: "LG", category: "Washing, AC, Fridge" },
    { name: "Sony", category: "Smart TV, Audio" },
    { name: "Whirlpool", category: "Fridge, Washing" },
    { name: "Bosch", category: "Washing, Microwave" },
    { name: "IFB", category: "Washing, Dryer" },
    { name: "Panasonic", category: "AC, TV, Microwave" },
    { name: "Haier", category: "Fridge, AC" },
  ];

  const testimonials = [
    {
      name: "Rohan Sharma",
      role: "Homeowner in Hyderabad",
      content:
        "The service was incredibly fast! The technician arrived within 45 minutes of booking and fixed my AC cooling leak in under an hour. Super clean work!",
      rating: 5,
      service: "AC Deep Clean & Gas Refill",
    },
    {
      name: "Sneha Patel",
      role: "Apartment Resident",
      content:
        "Super convenient platform. I booked a washing machine repair late at night, and they had a certified technician over by 10 AM. Transparent pricing!",
      rating: 5,
      service: "Washing Machine Drum Fix",
    },
    {
      name: "Amit Verma",
      role: "Office Manager",
      content:
        "Transparent pricing and verified technicians. I love that there are zero hidden fees. The 30-day warranty gave us total peace of mind.",
      rating: 5,
      service: "Refrigerator Compressor Repair",
    },
  ];

  const faqs = [
    {
      q: "How does booking a service work on B1K Services?",
      a: "It's simple! Sign up as a customer, choose your desired appliance service, select the specific issue you're facing, pick a convenient time slot, and submit. We'll assign a certified technician immediately.",
    },
    {
      q: "Are the technicians background verified?",
      a: "Yes! All technicians on B1K Services undergo rigorous background checks, identity verification, and technical skill assessments before visiting customer homes.",
    },
    {
      q: "What is the warranty on repairs?",
      a: "We offer a 30-day hassle-free warranty on all repairs and replacement parts. If the exact issue recurs within 30 days, we fix it free of charge.",
    },
    {
      q: "Can I reschedule or cancel my booking?",
      a: "Absolutely. You can reschedule or cancel your booking anytime directly through your customer dashboard before the technician starts travel.",
    },
    {
      q: "What payment methods are supported?",
      a: "We accept UPI, Credit/Debit cards, Net Banking, and Cash after the repair is completed to your full satisfaction.",
    },
    {
      q: "How fast will a technician arrive?",
      a: "We offer same-day service! Technicians usually arrive within 60 minutes or at your exact chosen scheduled time slot.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans selection:bg-[#0B3D91] selection:text-white">
      {/* 1. Mobile-First Glass Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-[#E2E8F0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="B1K Services Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-300"
            />
            <span className="font-extrabold text-lg sm:text-xl text-[#0B3D91] tracking-tight">
              B1K <span className="text-[#2563EB]">Services</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#services" className="hover:text-[#0B3D91] transition-colors py-2">
              Services
            </a>
            <a href="#how-it-works" className="hover:text-[#0B3D91] transition-colors py-2">
              How It Works
            </a>
            <a href="#about" className="hover:text-[#0B3D91] transition-colors py-2">
              Why Choose Us
            </a>
            <a href="#brands" className="hover:text-[#0B3D91] transition-colors py-2">
              Brands
            </a>
            <a href="#testimonials" className="hover:text-[#0B3D91] transition-colors py-2">
              Reviews
            </a>
            <a href="#faqs" className="hover:text-[#0B3D91] transition-colors py-2">
              FAQs
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-slate-700 hover:text-[#0B3D91] font-semibold text-sm px-4 py-2 transition-colors min-h-[48px] flex items-center"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-[#0B3D91] to-[#2563EB] hover:from-[#072a66] hover:to-[#1d4ed8] text-white font-bold text-sm px-5 rounded-xl shadow-md shadow-blue-900/15 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 min-h-[48px]"
            >
              Book Service
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {/* Mobile Hamburger Button (Touch Target >= 48px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden min-w-[48px] min-h-[48px] p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center text-xl transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Slide-Over Drawer Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-white animate-fadeIn">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <img src={logo} alt="B1K Services Logo" className="h-9 w-auto object-contain" />
                <span className="font-extrabold text-lg text-[#0B3D91]">
                  B1K <span className="text-[#2563EB]">Services</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="min-w-[48px] min-h-[48px] flex items-center justify-center text-slate-600 hover:text-slate-900 text-xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 text-base font-semibold text-slate-800">
              <a
                href="#services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 border-b border-slate-100 hover:text-[#0B3D91]"
              >
                Services
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 border-b border-slate-100 hover:text-[#0B3D91]"
              >
                How It Works
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 border-b border-slate-100 hover:text-[#0B3D91]"
              >
                Why Choose Us
              </a>
              <a
                href="#brands"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 border-b border-slate-100 hover:text-[#0B3D91]"
              >
                Brands We Repair
              </a>
              <a
                href="#testimonials"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 border-b border-slate-100 hover:text-[#0B3D91]"
              >
                Customer Reviews
              </a>
              <a
                href="#faqs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2.5 border-b border-slate-100 hover:text-[#0B3D91]"
              >
                FAQs
              </a>

              <div className="pt-6 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full border border-slate-300 text-slate-800 font-bold py-3.5 rounded-xl text-center flex items-center justify-center min-h-[48px]"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-[#0B3D91] text-white font-bold py-3.5 rounded-xl text-center flex items-center justify-center gap-2 shadow-md min-h-[48px]"
                >
                  Book Service Now
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. Responsive Mobile-First Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-blue-50/70 via-white to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Hero Left Content */}
          <div className="space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0B3D91] text-xs sm:text-sm font-bold shadow-xs max-w-full">
              <FaCheckCircle className="text-[#22C55E] shrink-0" />
              <span className="truncate">India's Trusted Home Appliance Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
              Home Appliance Repairs <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#0B3D91] via-[#2563EB] to-indigo-600 bg-clip-text text-transparent">
                Made Simple.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
              Book verified technicians for all your home appliance repairs with transparent pricing, real-time booking updates, and reliable doorstep service.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-[#0B3D91] hover:bg-[#072a66] text-white text-base font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-[#0B3D91]/20 transition-all duration-300 text-center flex items-center justify-center gap-2 group min-h-[48px]"
              >
                Book a Service
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#services"
                className="w-full sm:w-auto border border-[#E2E8F0] bg-white hover:bg-slate-50 text-slate-700 text-base font-bold px-7 py-3.5 rounded-2xl text-center shadow-xs transition-all duration-300 min-h-[48px] flex items-center justify-center"
              >
                Explore Services
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                <FaStar className="text-amber-500 text-xs shrink-0" />
                <span className="text-xs font-bold text-slate-700">4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                <FaCheckCircle className="text-[#2563EB] text-xs shrink-0" />
                <span className="text-xs font-bold text-slate-700">Verified Experts</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                <FaShieldAlt className="text-[#0B3D91] text-xs shrink-0" />
                <span className="text-xs font-bold text-slate-700">Secure Booking</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-100 shadow-xs">
                <FaBolt className="text-amber-500 text-xs shrink-0" />
                <span className="text-xs font-bold text-slate-700">Same Day</span>
              </div>
            </div>
          </div>

          {/* Hero Right - Responsive Image & Floating Badges */}
          <div className="relative flex flex-col justify-center items-center mt-4 lg:mt-0">
            <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-[#E2E8F0] w-full max-w-md">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
                alt="Appliance Repair Technician"
                loading="lazy"
                className="w-full h-64 sm:h-80 object-cover object-center rounded-2xl shadow-inner max-w-full"
              />

              {/* Floating Badges Grid on Mobile / Overlay on Desktop */}
              <div className="grid grid-cols-2 gap-2 mt-3 sm:mt-0">
                <div className="sm:absolute sm:-top-3 sm:-left-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-[#22C55E] flex items-center justify-center text-xs font-bold shrink-0">
                    <FaCheck />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Verified Technician</span>
                </div>

                <div className="sm:absolute sm:-top-3 sm:-right-3 bg-[#0B3D91] text-white px-3 py-2 rounded-xl shadow-md flex items-center gap-2 justify-center">
                  <FaTag className="text-amber-400 text-xs shrink-0" />
                  <span className="text-xs font-bold">Starts ₹299</span>
                </div>

                <div className="sm:absolute sm:-bottom-3 sm:-left-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                  <FaShieldAlt className="text-[#2563EB] text-xs shrink-0" />
                  <span className="text-xs font-bold text-slate-800">30-Day Warranty</span>
                </div>

                <div className="sm:absolute sm:-bottom-3 sm:-right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                  <FaTruck className="text-indigo-600 text-xs shrink-0" />
                  <span className="text-xs font-bold text-slate-800">Doorstep Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST STATISTICS */}
      <section className="py-8 sm:py-12 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((st, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-sm flex items-center gap-3 sm:gap-4"
              >
                <div className="p-2.5 sm:p-3.5 bg-blue-50 rounded-xl sm:rounded-2xl shrink-0">{st.icon}</div>
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">{st.number}</p>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-0.5">{st.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICE CATEGORIES */}
      <section id="services" className="py-12 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Expert Repairs
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Service Categories
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base">
              Transparent upfront pricing for repair, maintenance, and complete installation across major home appliances.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {services.map((svc, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center max-w-full"
                    />
                    <div className="absolute top-3 right-3 bg-[#0B3D91] text-white font-bold px-3 py-1 rounded-full text-xs shadow-md">
                      Starts {svc.price}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-50 rounded-xl shrink-0">{svc.icon}</div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">{svc.title}</h3>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed pt-1">{svc.desc}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pt-0">
                  <Link
                    to="/login"
                    className="w-full bg-slate-50 hover:bg-[#0B3D91] text-[#0B3D91] hover:text-white font-bold py-3 rounded-xl border border-slate-200 hover:border-[#0B3D91] text-xs transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    Book Service Now
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-12 sm:py-20 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Simple & Fast
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base">
              Getting your home appliance repaired takes less than 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] p-5 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#0B3D91] text-white font-black text-sm flex items-center justify-center mb-3 shadow-sm">
                    {st.num}
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1">{st.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE B1K SERVICES */}
      <section id="about" className="py-12 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Why Us
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Why Choose B1K Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base">
              Built specifically to provide transparent, reliable, and professional doorstep repairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {whyChooseUs.map((w, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-md hover:shadow-xl transition-all duration-300 space-y-3"
              >
                <div className="p-3 bg-blue-50 rounded-2xl w-fit">{w.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">{w.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LIVE BOOKING PREVIEW */}
      <section className="py-12 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-light-blue font-bold text-xs uppercase tracking-widest bg-blue-950 px-3 py-1 rounded-full border border-blue-500/30">
              Real-Time Tracking
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Live Booking Experience
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Track your repair status in real-time on your smartphone.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5">
            <div className="flex flex-wrap justify-between items-center gap-3 pb-4 border-b border-slate-800">
              <div>
                <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Booking ID</p>
                <p className="text-base sm:text-lg font-bold text-white font-mono">#B1K-89241</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                  Technician En Route
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-slate-400 text-xs">Customer</p>
                <p className="font-bold text-white mt-0.5">Priya Sharma</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Service</p>
                <p className="font-bold text-white mt-0.5">AC Deep Clean</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Technician</p>
                <p className="font-bold text-blue-400 mt-0.5">Rajesh Verma (★ 4.9)</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Arrival</p>
                <p className="font-bold text-emerald-400 mt-0.5">15 Mins</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Price</p>
                <p className="font-bold text-white mt-0.5">₹499</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Warranty</p>
                <p className="font-bold text-amber-400 mt-0.5">30 Days</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#2563EB] to-emerald-400 h-full w-[75%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BRANDS WE SERVICE */}
      <section id="brands" className="py-12 sm:py-16 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Brands We Repair
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Certified repairs using original spare parts for all major global brands.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {brands.map((b, i) => (
              <div
                key={i}
                className="bg-[#F8FAFC] p-3.5 rounded-xl sm:rounded-2xl border border-[#E2E8F0] shadow-xs text-center"
              >
                <p className="font-extrabold text-sm sm:text-base text-[#0F172A]">{b.name}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{b.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER TESTIMONIALS */}
      <section id="testimonials" className="py-12 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Customer Testimonials
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base">
              Real reviews from real homeowners who trust B1K Services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E2E8F0] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex text-amber-400 gap-1 text-xs sm:text-sm">
                      {[...Array(t.rating)].map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                    </div>
                    <span className="px-2 py-0.5 bg-blue-50 text-[#0B3D91] text-[10px] font-bold rounded-full">
                      ✔ Verified Customer
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">"{t.content}"</p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4">
                  <h4 className="font-bold text-[#0F172A] text-sm sm:text-base">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                  <p className="text-[11px] font-semibold text-[#2563EB] mt-0.5">{t.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faqs" className="py-12 sm:py-20 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base">
              Everything you need to know about our service booking and warranty.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-xl sm:rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-[#0F172A] hover:text-[#0B3D91] transition-colors gap-3 min-h-[48px]"
                >
                  <span className="flex items-center gap-2.5 text-xs sm:text-sm md:text-base">
                    <FaQuestionCircle className="text-[#2563EB] shrink-0" />
                    {faq.q}
                  </span>
                  <FaChevronDown
                    className={`text-slate-400 shrink-0 transform transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180 text-[#0B3D91]" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-slate-600 border-t border-slate-200/60 text-xs sm:text-sm leading-relaxed">
                    <p className="pl-6 sm:pl-7 text-slate-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CALL TO ACTION */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B3D91] via-[#2563EB] to-indigo-900 text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden text-center space-y-5">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
              Ready to Repair Your Appliance?
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base">
              Book verified technicians today with transparent pricing, instant updates, and 30-day warranty coverage.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-white text-[#0B3D91] hover:bg-blue-50 font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
              >
                Book Your Service Now
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-[#0F172A] text-slate-400 py-12 sm:py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="B1K Services Logo" className="h-9 w-auto object-contain" />
              <span className="font-extrabold text-lg text-white">
                B1K <span className="text-[#60A5FA]">Services</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reliable. Fast. Professional. High-quality home appliance repair and booking platform. Transparent pricing & verified experts.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="text-white font-bold text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-[#60A5FA] transition-colors py-1 block">
                  Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#60A5FA] transition-colors py-1 block">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#60A5FA] transition-colors py-1 block">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#60A5FA] transition-colors py-1 block">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#60A5FA] transition-colors py-1 block">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="text-white font-bold text-sm">Appliance Services</h4>
            <ul className="space-y-1.5">
              <li>AC Repair & Servicing</li>
              <li>Refrigerator Service</li>
              <li>Washing Machine Repair</li>
              <li>LED/LCD TV Servicing</li>
              <li>Water Purifier & Chimney</li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="text-white font-bold text-sm">Contact Support</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#60A5FA] shrink-0" />
                <span className="break-all">b1kservices.org@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#60A5FA] shrink-0" />
                <span>+91 9491490888</span>
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#60A5FA] shrink-0" />
                <span>KLEF, Vaddeswaram, AP, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>© 2026 B1K Services. Reliable. Fast. Professional. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#60A5FA] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#60A5FA] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

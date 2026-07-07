import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaTools, 
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
      content: "Transparent pricing and verified technicians. I love that there are no hidden fees. Flezo is my go-to for all repairs.",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "How does booking a service work on Flezo?",
      a: "It's simple! Sign up as a customer, choose your desired appliance service, select the specific issue you're facing, enter your address, and submit. We'll assign a certified technician to your booking."
    },
    {
      q: "Are the technicians background verified?",
      a: "Yes, all technicians on Flezo undergo rigorous background verification and skill assessment tests to ensure your safety and high service quality."
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white text-xl shadow-md shadow-teal-600/20">
              <FaTools />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Fle<span className="text-teal-600">zo</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Services</a>
            <a href="#about" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Why Us</a>
            <a href="#testimonials" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Reviews</a>
            <a href="#faqs" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">FAQs</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-slate-700 hover:text-teal-600 font-semibold px-4 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-teal-600/10 hover:shadow-teal-600/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-teal-50/50 via-white to-slate-50">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Doorstep Services in 60 Minutes
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Professional Home <br />
              <span className="text-teal-600 relative inline-block">
                Appliance Repair
                <span className="absolute bottom-1.5 left-0 w-full h-2 bg-teal-100 -z-10 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Book certified technicians for AC repair, refrigerator servicing, washing machine troubleshooting, TV repair, and more. Transparent pricing and guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/signup" 
                className="bg-teal-600 hover:bg-teal-700 text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-lg shadow-teal-600/20 hover:shadow-teal-600/30 transition-all duration-300 text-center flex items-center justify-center gap-3 group"
              >
                Book a Service Now
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#services" 
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-2xl text-center transition-all duration-300"
              >
                Explore Services
              </a>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-teal-600 text-xl shrink-0" />
                <span className="text-sm font-bold text-slate-700">Verified Pros</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-teal-600 text-xl shrink-0" />
                <span className="text-sm font-bold text-slate-700">Quick Turnaround</span>
              </div>
              <div className="flex items-center gap-3">
                <FaThumbsUp className="text-teal-600 text-xl shrink-0" />
                <span className="text-sm font-bold text-slate-700">30-Day Warranty</span>
              </div>
            </div>
          </div>
          
          <div className="relative justify-self-center lg:justify-self-end w-full max-w-lg">
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl -z-10"></div>
            <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-slate-100">
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
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
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
                className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={svc.image} 
                    alt={svc.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white font-bold px-3 py-1 rounded-full text-sm shadow-md">
                    Starts {svc.price}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">{svc.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{svc.desc}</p>
                  <div className="pt-2">
                    <Link 
                      to="/login"
                      className="text-teal-600 group-hover:text-teal-700 font-bold text-sm inline-flex items-center gap-2 transition-colors"
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
      <section id="about" className="py-24 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Flezo is the Best Choice for You
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
                  <FaCheckCircle className="text-teal-600 text-xl shrink-0 mt-0.5" />
                  <p className="font-semibold text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl font-bold">1</div>
              <h4 className="text-lg font-bold text-slate-900">Select Service</h4>
              <p className="text-slate-600 text-sm">Choose from a variety of appliance repairs and servicing options.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4 mt-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl font-bold">2</div>
              <h4 className="text-lg font-bold text-slate-900">Choose Issue</h4>
              <p className="text-slate-650 text-sm">Specify the exact problem to get a real-time price estimate.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl font-bold">3</div>
              <h4 className="text-lg font-bold text-slate-900">Assign Technician</h4>
              <p className="text-slate-600 text-sm">We automatically assign a certified professional near your area.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4 mt-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl font-bold">4</div>
              <h4 className="text-lg font-bold text-slate-900">Repair Done</h4>
              <p className="text-slate-600 text-sm">The expert visits your doorstep, repairs, and guarantees work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Customer Testimonials
            </h2>
            <p className="text-lg text-slate-600">
              See what our customers are saying about our premium home repair services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="flex gap-1 text-teal-500 mb-6">
                  {[...Array(t.rating)].map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed mb-6">"{t.content}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-24 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
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
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 hover:text-teal-600 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <FaQuestionCircle className="text-teal-600 text-lg" />
                    {faq.q}
                  </span>
                  <FaChevronDown 
                    className={`text-slate-400 transform transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-teal-600" : ""}`} 
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
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white text-xl shadow-md">
                <FaTools />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Fle<span className="text-teal-500">zo</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              High-quality, reliable home appliance repair and booking platform. Fast turnaround, verified experts, and transparent pricing.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-teal-500 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-teal-500 transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-teal-500 transition-colors">Reviews</a></li>
              <li><a href="#faqs" className="hover:text-teal-500 transition-colors">FAQs</a></li>
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
                <FaPhoneAlt className="text-teal-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-teal-500" />
                <span>support@flezo.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-teal-500" />
                <span>KLEF, Vaddeswaram, AP, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Flezo. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

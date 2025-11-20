import React, { useState, useEffect } from "react";
import type {
  ServiceCardProps,
  TestimonialCardProps,
} from "../../types/landing";
import { useNavigate } from "react-router-dom";
import "./landing.css";

const LightStars: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Smooth scrolling function
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking on links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        const href = target.getAttribute("href");
        if (href) {
          const sectionId = href.substring(1); // Remove the # character
          scrollToSection(sectionId);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const navigate = useNavigate();

  const getStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="dark">
      {/* Navigation Bar */}
      <nav
        className="fixed w-full z-50 bg-opacity-90 backdrop-blur-sm"
        style={{ backgroundColor: "hsl(0, 0%, 6%)" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold gradient-text">Nexus</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:text-yellow-500 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="hover:text-yellow-500 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="hover:text-yellow-500 transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-yellow-500 transition-colors"
              >
                About
              </button>
              <button
                onClick={getStarted}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:hidden mt-4 pb-4`}
          >
            <button
              onClick={() => scrollToSection("hero")}
              className="block py-2 hover:text-yellow-500 transition-colors w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block py-2 hover:text-yellow-500 transition-colors w-full text-left"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block py-2 hover:text-yellow-500 transition-colors w-full text-left"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block py-2 hover:text-yellow-500 transition-colors w-full text-left"
            >
              About
            </button>
            <button
              onClick={getStarted}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors w-full"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="hero-bg min-h-screen flex items-center justify-center pt-16"
      >
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Productivity At Its Peak
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl mb-10 text-gray-300">
              LightStars is the next-generation command center for data
              architects, providing centralized AI-driven tools to manage
              complex cloud infrastructure, automate deployment pipelines, and
              visualize real-time operational data.
            </p>
            <p className="text-lg md:text-xl mb-12 text-gray-400">
              Our platform simplifies IT operations, allowing your team to focus
              on innovation rather than maintenance. Join us in streamlining the
              future of operations.
            </p>
            <button
              onClick={getStarted}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-10 rounded-lg text-lg transition-all transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section
        id="services"
        className="py-20"
        style={{ backgroundColor: "hsl(0, 0%, 10%)" }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ServiceCard
              icon="fa-cloud"
              title="Cloud Infrastructure Management"
              description="Centralized control over complex cloud environments with AI-driven optimization and monitoring tools."
            />

            <ServiceCard
              icon="fa-cogs"
              title="Automated Deployment"
              description="Streamline your deployment pipelines with our intelligent automation system that reduces errors and speeds up delivery."
            />

            <ServiceCard
              icon="fa-chart-line"
              title="Real-time Data Visualization"
              description="Transform complex data into actionable insights with our intuitive visualization tools and real-time dashboards."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            What Our Clients Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              stars={5}
              quote="LightStars has revolutionized how we manage our cloud infrastructure. The automation features alone have saved us countless hours each week."
              name="Michael Chen"
              position="CTO, TechNova"
              image="https://randomuser.me/api/portraits/men/32.jpg"
            />

            <TestimonialCard
              stars={5}
              quote="The real-time data visualization capabilities are unmatched. Our team can now make informed decisions faster than ever before."
              name="Sarah Johnson"
              position="Data Director, InsightCorp"
              image="https://randomuser.me/api/portraits/women/44.jpg"
            />

            <TestimonialCard
              stars={5}
              quote="Implementing LightStars was a game-changer for our operations. We've reduced deployment time by 70% and significantly decreased errors."
              name="David Rodriguez"
              position="DevOps Lead, CloudFirst"
              image="https://randomuser.me/api/portraits/men/67.jpg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="about"
        className="py-12 border-t border-gray-800"
        style={{ backgroundColor: "hsl(0, 0%, 6%)" }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">
                LightStars
              </h3>
              <p className="text-gray-400">
                Revolutionizing data architecture with AI-driven solutions for
                the modern enterprise.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  123 Tech Street, Silicon Valley
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone mr-2"></i>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  info@lightstars.com
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors text-xl"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors text-xl"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors text-xl"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors text-xl"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors text-xl"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2023 LightStars. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div
    className="bg-opacity-20 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition-colors"
    style={{ backgroundColor: "hsl(0, 0%, 8%)" }}
  >
    <div className="text-yellow-500 mb-6">
      <i className={`fas ${icon} text-4xl`}></i>
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// Testimonial Card Component
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  stars,
  quote,
  name,
  position,
  image,
}) => (
  <div
    className="bg-opacity-20 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
    style={{ backgroundColor: "hsl(0, 0%, 8%)" }}
  >
    <div className="flex items-center mb-4">
      <div className="text-yellow-500 mr-2">
        {[...Array(stars)].map((_, i) => (
          <i key={i} className="fas fa-star"></i>
        ))}
      </div>
    </div>
    <p className="text-gray-400 mb-6">"{quote}"</p>
    <div className="flex items-center">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-gray-500 text-sm">{position}</p>
      </div>
    </div>
  </div>
);

export default LightStars;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Modified scroll function to ensure it works reliably
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    // Add a small delay to ensure the menu has time to close
    setTimeout(() => {
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const sectionPosition = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
      });
    }, 100);
  } else {
    console.warn(`Section with ID "${sectionId}" not found`);
  }
};

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const sectionId = href.substring(1); // Remove the # from the href
    
    // Close mobile menu first
    setIsOpen(false);
    
    // Then scroll to section
    scrollToSection(sectionId);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('#mobile-menu') && !e.target.closest('button')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  return (
    <nav
      id="navbar"
      className={`fixed w-full z-50 transition-all duration-300 bg-ivory bg-opacity-95 shadow-md ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="text-gold font-greatvibes text-2xl"
            onClick={(e) => handleNavClick(e, "#home")}
          >
            H&R
          </a>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:text-rose transition-colors duration-300 font-montserrat text-sm uppercase tracking-wide"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <i className={`fas fa-${isOpen ? "times" : "bars"} text-xl`}></i>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-ivory absolute w-full shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-full text-center py-2 text-gray-800 hover:text-rose hover:bg-gray-100 transition-colors duration-300 font-montserrat text-sm uppercase tracking-wide"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
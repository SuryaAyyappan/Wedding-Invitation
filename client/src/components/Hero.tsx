import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { createHeartParticles } from "@/lib/animations";
import { useCountdown, scrollToSection } from "@/lib/utils";

// Wedding date: Sunday, 8th June 2025, 7:00 AM - 8:30 AM
const WEDDING_DATE = new Date('June 8, 2025 07:00:00').getTime();

export default function Hero() {
  const heartContainerRef = useRef<HTMLDivElement>(null);
  const [showNames, setShowNames] = useState(false);
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const [showEventDetails, setShowEventDetails] = useState(false);
  
  useEffect(() => {
    if (heartContainerRef.current) {
      const cleanupParticles = createHeartParticles(heartContainerRef.current);
      
      // Animation for title elements
      gsap.from(".animate-title", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.3,
      });
      
      // Show names after animation completes
      const timer = setTimeout(() => {
        setShowNames(true);
      }, 1000);
      
      return () => {
        cleanupParticles();
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <section
      id="home"
      className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/onlyretro (2).mp4" type="video/mp4" />
        </video>
      </div>

      {/* Floating flower petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute rounded-full w-4 h-4 bg-pink-200 opacity-60"
            initial={{
              x: Math.random() * 100 + "%",
              y: -20,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: "120vh",
              x: `calc(${Math.random() * 100}% + ${Math.sin(i) * 200}px)`,
              rotate: Math.random() * 360 + 360,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20,
            }}
            style={{
              background: `radial-gradient(circle, rgba(253,242,248,0.9) 0%, rgba(244,114,182,0.6) 100%)`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              repeatDelay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div 
        className="heart-particles" 
        ref={heartContainerRef}
      ></div>

      <div className="text-center text-black z-10 w-full max-w-4xl mx-auto">
        <motion.div className="mb-6">
        <motion.p 
            className="animate-title font-dancing text-lg md:text-xl uppercase tracking-widest"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          We are getting married
        </motion.p>
          <div className="w-24 h-0.5 bg-pink-300 mx-auto mt-2 rounded-full"></div>
        </motion.div>

        {/* Names with glowing effect */}
        {showNames && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl mb-6 flex flex-col items-center justify-center">
              <motion.span
                className="animate-title block text-black font-bold mb-6 font-rubik-mono-one"
                animate={{ 
                  textShadow: [
                    "0 0 8px rgba(255,255,255,0.4)",
                    "0 0 20px rgba(255,255,255,0.6)",
                    "0 0 30px rgba(255,255,255,0.8)",
                    "0 0 20px rgba(255,255,255,0.6)",
                    "0 0 8px rgba(255,255,255,0.4)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ 
                  textShadow: "0 0 3px rgba(0,0,0,0.3)",
                  letterSpacing: "0.05em",
                  color: "#000000",
                  WebkitTextFillColor: "#000000",
                  filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.3))",
                  fontFamily: "inherit"
                }}
          >
            A.Hariharan
          </motion.span>
              
              {/* Weds Box - Centered and with proper spacing */}
              <motion.div
                className="animate-title text-black block text-4xl md:text-5xl lg:text-6xl my-4 font-nunito"
            initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  textShadow: [
                    "0 0 5px rgba(255,255,255,0.4)",
                    "0 0 15px rgba(255,255,255,0.6)",
                    "0 0 5px rgba(255,255,255,0.4)"
                  ]
                }}
            transition={{ delay: 0.5, duration: 1 }}
          >
                <motion.div
                  className="px-1 relative flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Flying hearts on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={`fly-heart-${i}`}
                        className="absolute left-1/2 top-1/2 text-pink-400 z-20"
                        initial={{ 
                          x: 0, 
                          y: 0, 
                          scale: 0,
                          opacity: 0
                        }}
                        whileHover={{
                          x: [0, (Math.random() - 0.5) * 60], 
                          y: [0, -40 - Math.random() * 30],
                          rotate: [0, (Math.random() - 0.5) * 90],
                          scale: [0, 0.5 + Math.random() * 0.5],
                          opacity: [0, 0.9, 0]
                        }}
                        transition={{
                          duration: 1 + Math.random() * 0.5,
                          ease: "easeOut",
                          delay: 0.1 * i,
                        }}
                        style={{ fontSize: `${12 + Math.random() * 8}px` }}
                      >
                        ❤
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Box with light pink background */}
                  <motion.div 
                    className="absolute inset-0 -z-10 rounded-md bg-pink-50/95"
                    animate={{
                      boxShadow: [
                        "0 0 5px rgba(249,168,212,0.5), inset 0 0 5px rgba(249,168,212,0.5)",
                        "0 0 10px rgba(249,168,212,0.7), inset 0 0 10px rgba(249,168,212,0.7)",
                        "0 0 5px rgba(249,168,212,0.5), inset 0 0 5px rgba(249,168,212,0.5)"
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                    style={{
                      border: "1px solid rgba(244,114,182,0.7)"
                    }}
                  />
                  
                  {/* Date appears on hover - updated for contrast */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-300 to-rose-300 rounded-md overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-sm md:text-base font-medium">
                      08.06.2025
                    </span>
                  </motion.div>
                  
                  {/* Black "weds" text */}
                  <motion.span 
                    className="font-greatvibes italic text-2xl md:text-3xl z-10 text-black py-1 px-6"
                    style={{
                      fontWeight: "600",
                      textShadow: "0 0 1px rgba(255,255,255,1)",
                      letterSpacing: "0.03em"
                    }}
                  >
                    weds
          </motion.span>
                </motion.div>
              </motion.div>
              
          <motion.span 
                className="animate-title block text-black font-bold mt-6 font-rubik-mono-one"
                animate={{ 
                  textShadow: [
                    "0 0 8px rgba(255,255,255,0.4)",
                    "0 0 20px rgba(255,255,255,0.6)",
                    "0 0 30px rgba(255,255,255,0.8)",
                    "0 0 20px rgba(255,255,255,0.6)",
                    "0 0 8px rgba(255,255,255,0.4)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{ 
                  textShadow: "0 0 3px rgba(0,0,0,0.3)",
                  letterSpacing: "0.05em",
                  color: "#000000",
                  WebkitTextFillColor: "#000000",
                  filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.3))",
                  fontFamily: "inherit"
                }}
          >
            V.Rajarajeswari
          </motion.span>
        </h1>
          </motion.div>
        )}

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center items-center gap-4 md:gap-8 mb-8"
        >
          <CountdownItem label="Days" value={days} />
          <CountdownItem label="Hours" value={hours} />
          <CountdownItem label="Minutes" value={minutes} />
          <CountdownItem label="Seconds" value={seconds} />
        </motion.div>

        {/* Wedding Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-xl font-libre mb-8 text-black"
        >
          <p>Sunday, 8th June 2025</p>
          <p>7:00 AM - 8:30 AM</p>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 right-8 transform"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <a
              href="#events"
              className="text-black hover:text-black/80 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('events');
              }}
            >
              <i className="fas fa-chevron-down text-2xl"></i>
            </a>
          </motion.div>
        </motion.div>

        {/* Event Details Modal */}
        {showEventDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowEventDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-lg max-w-md mx-4 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Background for Event Details */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                >
                  <source src="/retroonly.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
              </div>

              {/* Content with backdrop blur for better readability */}
              <div className="relative z-10">
                <button
                  onClick={() => setShowEventDetails(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h3 className="text-2xl font-bold mb-4 text-center text-black">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center bg-white/60 backdrop-blur-sm p-3 rounded-lg">
                    <i className="fas fa-calendar-alt text-pink-500 mr-3"></i>
                    <span className="text-black font-medium">Sunday, 8th June 2025</span>
                  </div>
                  <div className="flex items-center bg-white/60 backdrop-blur-sm p-3 rounded-lg">
                    <i className="fas fa-clock text-pink-500 mr-3"></i>
                    <span className="text-black font-medium">7:00 AM - 8:30 AM</span>
                  </div>
                  <div className="flex items-center bg-white/60 backdrop-blur-sm p-3 rounded-lg">
                    <i className="fas fa-map-marker-alt text-pink-500 mr-3"></i>
                    <span className="text-black font-medium">Venue details coming soon</span>
                  </div>
                  <div className="flex items-center bg-white/60 backdrop-blur-sm p-3 rounded-lg">
                    <i className="fas fa-info-circle text-pink-500 mr-3"></i>
                    <span className="text-black font-medium">Dress code: Traditional</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface CountdownItemProps {
  label: string;
  value: number;
}

function CountdownItem({ label, value }: CountdownItemProps) {
  return (
    <div className="text-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[80px] md:min-w-[100px]">
        <div className="text-3xl md:text-4xl font-bold text-black mb-1 font-poppins">{value}</div>
        <div className="text-sm md:text-base uppercase tracking-wider font-nunito text-black">{label}</div>
      </div>
    </div>
  );
}
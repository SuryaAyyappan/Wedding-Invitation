import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { scrollToSection } from "@/lib/utils";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/eventDetails.css';
import '../styles/mobile-optimizations.css';

const events = [
  {
    title: "Wedding Ceremony",
    date: "Sunday, 8th June 2025",
    time: "7:00 AM - 8:30 AM",
    location: "Vairawar Valagam, Vairavanpatti",
    image: "https://images.unsplash.com/photo-1519741347686-c1e30c4aaaaed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    coordinates: { lat: 10.1281969, lng: 78.6585806 },
    mapLink: "https://www.google.com/maps/dir//4MH5%2B7CG+Vairavar+Valagam,+Vairavanpatti,+Tamil+Nadu/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3b0061bd4c0dc1bf:0x2b12faabe8146004?sa=X&ved=1t:57443&ictx=111"
  },
  {
    title: "Wedding Reception",
    date: "Saturday, 14th June 2025",
    time: "6:30 PM - 9:00 PM",
    location: "KNT Mahal A/C, Neyveli",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    coordinates: { lat: 11.6319012, lng: 79.5500311 },
    mapLink: "https://www.google.com/maps/dir//Kumbakonam+Main+Road,+Near+Neyveli+Arch+Gate,+Keelakollai,+Rainbow+Nagar,+Vadakuthu,+Tamil+Nadu+607308/@11.6318891,79.4676202,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a54b09838e06ce9:0x329edf86505a20f9!2m2!1d79.5500311!2d11.6319012?entry=ttu"
  }
];

export default function EventDetails() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [hoverEvent, setHoverEvent] = useState<number | null>(null);
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const openMap = (coordinates: { lat: number, lng: number }, location: string, mapLink?: string) => {
    if (mapLink) {
      window.open(mapLink, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
      window.open(url, '_blank');
    }
    
    toast({
      title: "Opening Map",
      description: `Showing directions to ${location}`,
      duration: 3000,
    });
  };

  return (
    <section id="events" className="py-20 relative overflow-hidden hardware-accelerated" ref={ref}>
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover video-smooth video-scale optimize-transitions"
        >
          <source src="/onlyretro (4).mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 content-visibility">
        <motion.div
          className="text-center mb-16 optimize-text"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4 section-title drop-shadow-glow font-bold italic optimize-text">Wedding Events</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white/30 via-white to-white/30 mx-auto mb-6 shadow-glow"></div>
          <motion.p 
            className="font-montserrat text-white text-xl md:text-2xl max-w-2xl mx-auto font-semibold optimize-text"
            animate={{ 
              textShadow: ["0 0 4px rgba(255,255,255,0.5)", "0 0 8px rgba(255,255,255,0.8)", "0 0 4px rgba(255,255,255,0.5)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Join us on these special dates
            <span className="text-white ml-2">✨</span>
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 optimize-transitions"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {events.map((event, index) => (
            <motion.div 
              key={index}
              className="event-card bg-black/70 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-white/10 hardware-accelerated optimize-touch no-tap-highlight"
              variants={itemVariants}
              onMouseEnter={() => setHoverEvent(index)}
              onMouseLeave={() => setHoverEvent(null)}
            >
              <div className="relative">
                {event.title === "Wedding Ceremony" ? (
                  <div className="w-full h-64 relative overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover video-smooth video-scale optimize-transitions"
                    >
                      <source src="/marriage.mp4" type="video/mp4" />
                    </video>
                  </div>
                ) : event.title === "Wedding Reception" ? (
                  <div className="w-full h-64 relative overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover video-smooth video-scale optimize-transitions"
                    >
                      <source src="/Reception.mp4" type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <img src={event.image} alt={`${event.title} venue`} className="w-full h-64 object-cover optimize-image" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 flex items-center justify-center">
                  <motion.h3 
                    className="text-white font-greatvibes text-4xl text-center px-4 font-bold italic"
                    animate={hoverEvent === index ? { 
                      textShadow: [
                        "0 0 7px rgba(255,255,255,0.7)", 
                        "0 0 10px rgba(255,255,255,0.9)", 
                        "0 0 7px rgba(255,255,255,0.7)"
                      ] 
                    } : {}}
                    transition={{ duration: 1.5, repeat: hoverEvent === index ? Infinity : 0 }}
                  >
                    {event.title}
                  </motion.h3>
                </div>
                
                {/* Animated overlay for hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoverEvent === index ? 0.3 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-6 border-t border-white/10 bg-black/70 backdrop-blur-sm text-center">
                <div className="mb-4">
                  <i className="fas fa-calendar-alt text-white mr-3 pulse-icon"></i>
                  <span className="font-montserrat text-gray-300">{event.date}</span>
                </div>
                <div className="mb-4">
                  <i className="fas fa-clock text-white mr-3"></i>
                  <span className="font-montserrat text-gray-300">{event.time}</span>
                </div>
                <div className="mb-6">
                  <i className="fas fa-map-marker-alt text-white mr-3"></i>
                  <span className="font-montserrat text-gray-300">{event.location}</span>
                </div>
                <div className="flex justify-center items-center">
                  <motion.button 
                    onClick={() => openMap(event.coordinates, event.location, event.mapLink)}
                    className="bg-green-600 hover:bg-green-700 text-white font-montserrat py-2 px-6 rounded-lg transition-colors duration-300 border border-green-500/20 shadow-glow-green flex items-center"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(74,222,128,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className="fas fa-map-pin mr-2"></i> Get Directions
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll to Gallery indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 right-8 transform z-10"
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
            href="#gallery"
            className="text-white hover:text-white/80 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('gallery');
            }}
          >
            <i className="fas fa-chevron-down text-2xl"></i>
          </a>
        </motion.div>
      </motion.div>

      {/* Add styles */}
      <style>{`
        .shadow-glow {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
        }
        .shadow-glow-sm {
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
        }
        .shadow-glow-green {
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
        }
        .pulse-icon {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}
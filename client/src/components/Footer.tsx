import { useToast } from '@/hooks/use-toast';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const { toast } = useToast();
  const [activePopup, setActivePopup] = useState(null);
  
  // Create refs for popup positioning
  const phoneButtonRef = useRef(null);
  const whatsappButtonRef = useRef(null);
  const instagramButtonRef = useRef(null);
  const popupRef = useRef(null);

  // Handle click outside to close popups
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        activePopup && 
        popupRef.current && 
        !popupRef.current.contains(event.target) &&
        phoneButtonRef.current && !phoneButtonRef.current.contains(event.target) &&
        whatsappButtonRef.current && !whatsappButtonRef.current.contains(event.target) &&
        instagramButtonRef.current && !instagramButtonRef.current.contains(event.target)
      ) {
        setActivePopup(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePopup]);

  const handleCallPhone = (number, event) => {
    event.stopPropagation();
    // Direct call
    window.location.href = `tel:${number}`;
  };

  const handleCopyPhone = (number, event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(number);
    toast({
      title: "Phone number copied!",
      description: `${number} has been copied to clipboard.`,
      duration: 3000,
    });
  };

  const handleWhatsApp = (number, event) => {
    event.stopPropagation();
    const text = "Hi! I'm reaching out regarding your wedding invitation.";
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagram = (username, event) => {
    event.stopPropagation();
    window.open(`https://www.instagram.com/${username}`, '_blank', 'noopener,noreferrer');
  };

  const togglePopup = (type) => {
    setActivePopup(activePopup === type ? null : type);
  };

  return (
    <footer className="py-10 relative text-white">
      {/* Custom Font Preload */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=Cormorant+Garamond:wght@400;500&family=Poppins:wght@500;700&family=Nunito:wght@400;500&display=swap');
        
        .couple-name {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-style: italic;
          letter-spacing: 1px;
          line-height: 1.5;
          font-size: 2.5rem;
          padding: 0 10px;
          margin: 0 auto;
          max-width: 100%;
          overflow-wrap: break-word;
        }
        
        @media (min-width: 768px) {
          .couple-name {
            font-size: 3.5rem;
          }
        }
        
        .wedding-date {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
        }
      `}</style>
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/retro-2.webp`}
          alt="Wedding Background" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-pink-800 opacity-80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Couple Names and Date */}
        <div className="text-center mb-10 mt-5">
          <motion.h2 
            className="couple-name mb-4"
            style={{ 
              background: "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 25%, #fbc2eb 50%, #a6c1ee 75%, #c2e9fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
            }}
            animate={{
              backgroundPosition: ["0% center", "200% center"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            A.Hariharan & V.Rajarajeswari
          </motion.h2>
          <p className="text-xl font-serif text-white wedding-date">
            Sunday, 8th June 2025
          </p>
        </div>
        
        {/* Wedding Wishes */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <p className="italic text-lg md:text-xl font-serif mb-2">
            "May your journey together be filled with love, laughter, and countless blessings."
          </p>
          <motion.div 
            className="w-24 h-1 bg-white/60 mx-auto my-4"
            animate={{ 
              width: [24, 120, 24],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
        
        {/* Contact Icons Row */}
        <div className="flex justify-center items-center space-x-12 md:space-x-16 mb-10">
          {/* Phone Icon */}
          <div ref={phoneButtonRef} className="text-center">
            <motion.button
              className="bg-white/20 hover:bg-white/30 w-14 h-14 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => togglePopup('phone')}
              aria-label="Show phone numbers"
            >
              <i className="fas fa-phone-alt text-2xl"></i>
            </motion.button>
          </div>
          
          {/* WhatsApp Icon */}
          <div ref={whatsappButtonRef} className="text-center">
            <motion.button
              className="bg-green-500/80 hover:bg-green-600/80 w-14 h-14 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => togglePopup('whatsapp')}
              aria-label="Show WhatsApp numbers"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
            </motion.button>
          </div>
          
          {/* Instagram Icon */}
          <div ref={instagramButtonRef} className="text-center">
            <motion.button
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 w-14 h-14 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => togglePopup('instagram')}
              aria-label="Show Instagram accounts"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </motion.button>
          </div>
        </div>
        
        {/* Popup content - only shown when a button is clicked */}
        {activePopup && (
          <motion.div 
            ref={popupRef}
            className="mx-auto mb-8 p-4 bg-white/20 backdrop-blur-lg rounded-lg max-w-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activePopup === 'phone' && (
              <>
                <h4 className="font-bold text-lg mb-3 text-center">Call Us</h4>
                <div className="space-y-3">
                  {[
                    { number: "6379180447", name: "Family" },
                    { number: "9080165860", name: "Hari"},
                    { number: "7339115079", name: "Raji"},
                    { number: "9025822579", name: "Surya"}
                  ].map((contact) => (
                    <div key={contact.number} className="flex gap-2">
                      <motion.a
                        href={`tel:${contact.number}`}
                        className="flex-1 flex items-center justify-between p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCallPhone(contact.number, e);
                        }}
                      >
                        <span>{contact.number}</span>
                        <span className="text-sm">({contact.name})</span>
                      </motion.a>
                      <motion.button
                        className="p-2 bg-white/30 rounded-lg hover:bg-white/40 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleCopyPhone(contact.number, e)}
                        aria-label="Copy number"
                      >
                        <i className="fas fa-copy"></i>
                      </motion.button>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {activePopup === 'whatsapp' && (
              <>
                <h4 className="font-bold text-lg mb-3 text-center">WhatsApp Us</h4>
                <div className="space-y-3">
                  {[
                    { number: "9443292146", name: "Family" },
                    { number: "9489192146", name: "Hari"},
                    { number: "7339115079", name: "Raji"},
                    { number: "9025822579", name: "Surya" }
                  ].map((contact) => (
                    <motion.a
                      key={contact.number}
                      href={`https://wa.me/${contact.number}?text=${encodeURIComponent("Hi! I'm reaching out regarding your wedding invitation.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full flex items-center justify-between p-2 bg-green-500/50 rounded-lg hover:bg-green-600/50 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <span>{contact.number}</span>
                      <span className="text-sm">({contact.name})</span>
                    </motion.a>
                  ))}
                </div>
              </>
            )}
            
            {activePopup === 'instagram' && (
              <>
                <h4 className="font-bold text-lg mb-3 text-center">Follow Us</h4>
                <div className="space-y-3">
                  {[
                    { username: "johnvijayhari", name: "Hariharan" },
                    { username: "_raji2730_", name: "Rajarajeswari" },
                    { username: "surya.mastie", name: "Surya" },
                  ].map((profile) => (
                    <motion.a
                      key={profile.username}
                      href={`https://www.instagram.com/${profile.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full flex items-center justify-between p-2 bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-orange-500/40 rounded-lg hover:from-purple-600/40 hover:via-pink-600/40 hover:to-orange-600/40 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <span>@{profile.username}</span>
                      <span className="text-sm">({profile.name})</span>
                    </motion.a>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
        
        {/* Copyright */}
        <div className="text-center pb-2">
          <p className="text-sm">
            © 2025
          </p>
        </div>
      </div>
      <img
        className="absolute bottom-0 right-0 w-32 h-32 object-contain"
        src={`${import.meta.env.BASE_URL}images/retro-2.webp`}
        alt="retro"
      />
    </footer>
  );
}
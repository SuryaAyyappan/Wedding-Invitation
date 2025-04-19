import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { scrollToSection } from "@/lib/utils";
import React from 'react';

// Preload images to improve performance
const preloadImages = () => {
  const imageUrls = [
    `${import.meta.env.BASE_URL}images/Image1.jpg`, 
    `${import.meta.env.BASE_URL}images/Image2.jpg`, 
    `${import.meta.env.BASE_URL}images/Image3.jpg`, 
    `${import.meta.env.BASE_URL}images/Image4.jpg`, 
    `${import.meta.env.BASE_URL}images/Image7.jpg`, 
    `${import.meta.env.BASE_URL}images/Image8.jpg`,
    `${import.meta.env.BASE_URL}images/Backdroppp (1).jpg`
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

const images = [
  {
    src: `${import.meta.env.BASE_URL}images/Image1.jpg`,
    alt: "Engagement Moment 1",
    description: "A special moment from our engagement"
  },
  {
    src: `${import.meta.env.BASE_URL}images/Image2.jpg`,
    alt: "Engagement Moment 2",
    description: "A special moment from our engagement"
  },
  {
    src: `${import.meta.env.BASE_URL}images/Image3.jpg`,
    alt: "Engagement Moment 3",
    description: "A special moment from our engagement"
  },
  {
    src: `${import.meta.env.BASE_URL}images/Image4.jpg`,
    alt: "Engagement Moment 4",
    description: "A special moment from our engagement"
  },
  {
    src: `${import.meta.env.BASE_URL}images/Image7.jpg`,
    alt: "Engagement Moment 5",
    description: "A special moment from our engagement"
  },
  {
    src: `${import.meta.env.BASE_URL}images/Image8.jpg`,
    alt: "Engagement Moment 6",
    description: "A special moment from our engagement"
  }
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Handle navigation via URL hash on component mount
  useEffect(() => {
    // Preload images for better performance
    preloadImages();
    
    // Check if navigating directly to gallery section
    if (window.location.hash === '#gallery') {
      // Small delay to ensure component is ready
      setTimeout(() => {
        scrollToSection('gallery');
      }, 100);
    }
    
    // Mark images as loaded after a short delay
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <section 
        id="gallery" 
        className="py-20 relative overflow-hidden will-change-transform content-visibility-auto" 
        ref={ref}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}images/Backdroppp (1).jpg`}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover transform translate3d(0,0,0) backface-visibility-hidden"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
        <motion.div 
            className="text-center mb-8 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
            <motion.h2 
              className="font-serif text-4xl sm:text-5xl md:text-6xl mb-2 font-black tracking-wider uppercase p-1 sm:p-2 relative inline-block max-w-full section-title drop-shadow-glow"
              style={{ 
                fontFamily: "'Hello Youthen', 'Playfair Display', serif",
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Engagement
            </motion.h2>
            
            {/* <motion.div 
              className="w-20 h-1 bg-black mx-auto my-2 shadow-glow"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div> */}
            
            <motion.p 
              className="font-montserrat mx-auto text-lg inline-block mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 20
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6
              }}
            >
              <span className="font-bold text-white relative inline-block px-4 py-1 mb-1">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/50 rounded-lg -z-10"></div>
                February 23, 2025
              </span>
              <br />
              <span className="text-white">"The day we said yes to forever"</span>
            </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
            <motion.div 
              key={index}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer transform-gpu"
              onClick={() => setSelectedImage(image.src)}
              initial={{ opacity: 0, scale: 0.8 }}
                animate={imagesLoaded && isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover gallery-image"
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-[80vw] p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="p-2 bg-white rounded-lg overflow-hidden">
              <img 
                src={selectedImage} 
                alt="Gallery preview" 
                className="w-full max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
    </>
  );
}
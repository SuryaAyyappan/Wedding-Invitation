import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EventDetails from '@/components/EventDetails';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-gradient-to-b from-black via-black to-red-900/5 text-white"
    >
      {/* Background glow effect */}
      <div className="fixed inset-0 bg-red-900/5 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <EventDetails />
        <Gallery />
        <Footer />
      </div>
    </motion.div>
  );
}

import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <EventDetails />
      <Gallery />
      <Footer />
    </main>
  );
} 
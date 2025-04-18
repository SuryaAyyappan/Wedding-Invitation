import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

export default function WishesForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          message,
          email: 'sec21cj029@sairamtap.edu.in',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Thank you!",
          description: "Your wishes have been recorded.",
          duration: 3000,
        });
        setName('');
        setMessage('');
      } else {
        throw new Error('Failed to submit wishes');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your wishes. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold text-white mb-4 text-center">Write Your Wishes</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40"
          />
        </div>
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Wishes"
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40 resize-none"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Wishes'}
        </motion.button>
      </form>
    </motion.div>
  );
} 
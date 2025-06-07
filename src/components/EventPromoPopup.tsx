import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Music, CalendarDays, ArrowRight, Ticket, Clock } from "lucide-react";

// Helper function to detect mobile and iPad 9th generation
const isMobileOrIPad9 = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // iPad 9th gen detection
  const isIPad9 = (() => {
    if (/iPad/.test(userAgent) || (/Macintosh/.test(userAgent) && 'ontouchend' in document)) {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const pixelRatio = window.devicePixelRatio || 1;
      
      // iPad 9th gen dimensions (accounting for orientation)
      return (
        (screenWidth === 810 && screenHeight === 1080) || 
        (screenWidth === 1080 && screenHeight === 810)
      ) && pixelRatio === 2;
    }
    return false;
  })();

  return isMobile || isIPad9;
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

const EventPromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup only on mobile or iPad 9th gen
    if (isMobileOrIPad9()) {
      // Add a slight delay to show the popup after page load
      const timer = setTimeout(() => {
        // Check if the user has already seen the popup
        const hasSeenPopup = localStorage.getItem("seen_event_promo");
        if (!hasSeenPopup) {
          setIsOpen(true);
          // Set a flag in localStorage so it doesn't show again right away
          localStorage.setItem("seen_event_promo", "true");
          
          // Reset the flag after 24 hours
          setTimeout(() => {
            localStorage.removeItem("seen_event_promo");
          }, 24 * 60 * 60 * 1000);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleGoToEvents = () => {
    setIsOpen(false);
    navigate("/events");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[90vw] sm:max-w-md rounded-xl bg-gradient-to-br from-indigo-900/90 to-purple-900/90 border border-indigo-400/30 backdrop-blur-md overflow-hidden p-0">
            <motion.div
              className="relative p-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-14 -left-14 w-36 h-36 bg-indigo-500/20 rounded-full blur-xl" />
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl" />
              
              <DialogHeader className="relative">
                <motion.div 
                  className="flex justify-center my-4"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg"
                    animate="pulse"
                    variants={pulseVariants}
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <DialogTitle className="text-center text-xl font-bold text-white">
                    Don't Miss Our Exclusive Event!
                  </DialogTitle>
                </motion.div>
                
                <motion.div className="mt-3 text-center space-y-1" variants={itemVariants}>
                  <div className="text-indigo-200 font-medium">Prince Group presents</div>
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 pb-1">
                    Vista Music Festival
                  </div>
                </motion.div>
              </DialogHeader>
              
              <motion.div className="py-4 px-2" variants={itemVariants}>
                <div className="bg-white/10 rounded-lg p-4 space-y-3 backdrop-blur-sm">
                  <div className="flex items-center gap-3 text-indigo-100">
                    <Music className="h-5 w-5 text-indigo-300" />
                    <span>Top artists performing live</span>
                  </div>
                  <div className="flex items-center gap-3 text-indigo-100">
                    <CalendarDays className="h-5 w-5 text-indigo-300" />
                    <span>Limited time special offers</span>
                  </div>
                  <div className="flex items-center gap-3 text-indigo-100">
                    <Ticket className="h-5 w-5 text-indigo-300" />
                    <span>Early-bird tickets available now</span>
                  </div>
                  <div className="flex items-center gap-3 text-indigo-100">
                    <Clock className="h-5 w-5 text-indigo-300" />
                    <span>Don't miss this opportunity!</span>
                  </div>
                </div>
              </motion.div>
              
              <DialogFooter className="sm:justify-center pt-2 pb-4">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-full h-12 text-lg"
                    onClick={handleGoToEvents}
                  >
                    Explore Event <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default EventPromoPopup; 
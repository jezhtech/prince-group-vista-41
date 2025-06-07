import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ticket, Calendar, ArrowRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Event messages for typing animation
const EVENT_MESSAGES = [
  "Rhythm Of Carnival",
  "Vijay Antony Concert On 21 December 2025",
  "Helicopter Ride from 22 to 26 December",
  "Shopping arena with more than 300+ Stalls",
  "Theme Park with Multi Cuisine Food stalls"
];

// Target date for countdown: December 21, 2025
const TARGET_DATE = new Date('2025-12-21T00:00:00');

interface EventBannerProps {
  position?: "fixed" | "relative" | "absolute"; // Allow positioning to be customized
  hideOnMobile?: boolean; // Option to hide on mobile devices
  showTicketCount?: boolean; // Option to show/hide the ticket count
  showCountdown?: boolean; // Option to show/hide the countdown timer
  ctaText?: string; // Customizable call-to-action text
  additionalClassName?: string; // Additional CSS classes
}

const EventBanner = ({
  position = "fixed",
  hideOnMobile = false,
  showTicketCount = true,
  showCountdown = true,
  ctaText = "Book Now",
  additionalClassName = ""
}: EventBannerProps) => {
  // Random initial seats between 40,000 and 80,000
  const getRandomSeats = () => Math.floor(Math.random() * 40001) + 40000;
  
  const [seats, setSeats] = useState(getRandomSeats());
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isMobile, setIsMobile] = useState(false);
  const typingSpeed = 40; // faster typing speed
  const pauseDuration = 1500; // pause between messages
  
  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle typing animation
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    const handleTyping = () => {
      const currentMessage = EVENT_MESSAGES[currentMessageIndex];
      
      if (isTyping) {
        // Still typing the current message
        if (displayedText.length < currentMessage.length) {
          timer = setTimeout(() => {
            setDisplayedText(currentMessage.substring(0, displayedText.length + 1));
          }, typingSpeed);
        } else {
          // Finished typing, pause before erasing
          timer = setTimeout(() => {
            setIsTyping(false);
          }, pauseDuration);
        }
      } else {
        // Erasing the message
        if (displayedText.length > 0) {
          timer = setTimeout(() => {
            setDisplayedText(displayedText.substring(0, displayedText.length - 1));
          }, typingSpeed / 2); // Erase faster than typing
        } else {
          // Move to next message
          const nextIndex = (currentMessageIndex + 1) % EVENT_MESSAGES.length;
          setCurrentMessageIndex(nextIndex);
          setIsTyping(true);
        }
      }
    };
    
    handleTyping();
    
    return () => clearTimeout(timer);
  }, [displayedText, isTyping, currentMessageIndex]);
  
  // Handle seat reduction
  useEffect(() => {
    if (showTicketCount) {
      const interval = setInterval(() => {
        // Randomly reduce by 1, 2, or 3 seats
        const reduction = Math.floor(Math.random() * 3) + 1;
        setSeats(prevSeats => Math.max(prevSeats - reduction, 0));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [showTicketCount]);
  
  // Calculate time remaining until target date
  useEffect(() => {
    if (showCountdown) {
      const calculateTimeLeft = () => {
        const difference = TARGET_DATE.getTime() - new Date().getTime();
        
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          });
        }
      };
      
      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);
      
      return () => clearInterval(timer);
    }
  }, [showCountdown]);
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // If banner should be hidden on mobile and we're on mobile, don't render
  if (hideOnMobile && isMobile) return null;
  
  return (
    <div className={`${position} top-0 left-0 right-0 h-[60px] sm:h-[50px] w-full bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-800 text-white z-[1001] border-b-2 border-pink-500 shadow-xl overflow-hidden ${additionalClassName}`}>
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-xl"
          animate={{
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="container mx-auto h-full px-2 sm:px-4 flex items-center justify-between relative z-10">
        {/* Left section - Ticket count */}
        {showTicketCount && (
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <div className="bg-pink-600 p-1.5 rounded-full">
              <Ticket className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-xs">
                Last few tickets remaining!
              </div>
              <motion.div 
                key={seats}
                className="text-[10px] text-pink-200"
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Only <span className="font-bold">{formatNumber(seats)}</span> seats left
              </motion.div>
            </div>
          </div>
        )}
        
        {/* Center section - Typing animation */}
        <div className="flex-1 mx-2 sm:mx-4 overflow-hidden text-center">
          <div className="relative h-6 flex items-center justify-center">
            <motion.div 
              className="inline-block font-semibold text-sm sm:text-base whitespace-nowrap overflow-hidden"
              animate={{ y: isTyping ? [1, 0] : [0, 0] }}
              transition={{ duration: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">{displayedText}</span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-0.5 inline-block w-1 h-5 bg-white"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Right section - Countdown and CTA */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Countdown */}
          {showCountdown && (
            <div className="hidden sm:flex items-center text-[10px] bg-indigo-800/50 px-2 py-1 rounded-full">
              <Clock className="h-3 w-3 mr-1 text-indigo-300" />
              <div className="flex items-center">
                <div className="px-1 flex flex-col items-center">
                  <span className="font-mono font-bold">{timeLeft.days}</span>
                  <span className="text-[8px] opacity-80">days</span>
                </div>
                <span>:</span>
                <div className="px-1 flex flex-col items-center">
                  <span className="font-mono font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-[8px] opacity-80">hrs</span>
                </div>
                <span>:</span>
                <div className="px-1 flex flex-col items-center">
                  <span className="font-mono font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-[8px] opacity-80">min</span>
                </div>
                <span>:</span>
                <div className="px-1 flex flex-col items-center">
                  <span className="font-mono font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <span className="text-[8px] opacity-80">sec</span>
                </div>
              </div>
            </div>
          )}
          
          {/* CTA Button */}
          <Link to="/events">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm" 
                className="h-8 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 rounded-full text-white text-xs"
              >
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut" 
                  }}
                  className="flex items-center"
                >
                  {ctaText} <ArrowRight className="ml-1 h-3 w-3" />
                </motion.span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventBanner; 
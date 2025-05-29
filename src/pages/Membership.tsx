import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Helmet } from "react-helmet-async";
import { 
  Calendar, Clock, Sparkles, Mail, Bell, Check, 
  CreditCard, Users, UserPlus, Star, Lock, Gift, Trophy
} from "lucide-react";

const Membership = () => {
  // Animation controls
  const [showStars, setShowStars] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [countdown, setCountdown] = useState({ days: 30, hours: 0, minutes: 0, seconds: 0 });
  const [agreeToNotify, setAgreeToNotify] = useState(false);
  const [hover, setHover] = useState(false);
  const planFeaturesRef = useRef(null);

  const membershipTiers = [
    {
      name: "Basic",
      price: "₹999",
      icon: <CreditCard className="w-8 h-8" />,
      color: "from-[#4eb4a7]/80 to-[#4eb4a7]"
    },
    {
      name: "Premium",
      price: "₹1,999",
      icon: <Star className="w-8 h-8" />,
      color: "from-[#60afb4]/80 to-[#60afb4]"
    },
    {
      name: "VIP",
      price: "₹4,999",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-[#85cbc3]/80 to-[#85cbc3]"
    }
  ];

  // Set countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        let { days, hours, minutes, seconds } = prevCountdown;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              days--;
              if (days < 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
                clearInterval(timer);
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Show stars animation after a delay
    const starsTimeout = setTimeout(() => setShowStars(true), 500);
    
    return () => clearTimeout(starsTimeout);
  }, []);
  
  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    if (notificationEmail && agreeToNotify) {
      setIsSubscribed(true);
      // In a real app, we would send this email to a backend
      console.log("Subscribing email:", notificationEmail);
    }
  };

  // Features that will be available
  const upcomingFeatures = [
    { icon: <Users className="w-6 h-6" />, title: "Community Access", description: "Join an exclusive network of professionals" },
    { icon: <Calendar className="w-6 h-6" />, title: "Priority Scheduling", description: "Book services with priority access" },
    { icon: <Gift className="w-6 h-6" />, title: "Special Discounts", description: "Enjoy member-only rates and offers" },
    { icon: <Clock className="w-6 h-6" />, title: "Fast Processing", description: "Expedited handling of your documents" },
    { icon: <Lock className="w-6 h-6" />, title: "Secure Storage", description: "Digital vault for your important documents" },
    { icon: <UserPlus className="w-6 h-6" />, title: "Dedicated Support", description: "Personal assistance from our experts" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <Helmet>
        <title>Membership Coming Soon - Prince Group</title>
        <meta name="description" content="Prince Group membership program is coming soon. Subscribe to get notified when we launch." />
      </Helmet>
      <MainNavbar />
      <main className="flex-grow">
        {/* Hero Section with Animated Elements */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/5 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                x: ["30%", "32%", "30%"],
                y: ["-30%", "-28%", "-30%"]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#60afb4]/10 to-[#4eb4a7]/5 rounded-full"
              animate={{ 
                scale: [1, 1.15, 1],
                x: ["-30%", "-25%", "-30%"],
                y: ["30%", "28%", "30%"]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            />
            
            {/* Animated Stars */}
            <AnimatePresence>
              {showStars && (
                <>
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                      className="absolute rounded-full bg-[#4eb4a7]"
                      style={{
                        width: Math.random() * 4 + 1,
                        height: Math.random() * 4 + 1,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        filter: "blur(0.5px)",
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-block mb-6">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] rounded-full p-4">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#4eb4a7]"
                        initial={{ opacity: 0.7, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.8 }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                      Membership
                    </span>
                    <div className="relative inline-flex ml-4">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60afb4] to-[#85cbc3]">
                        Coming Soon
                      </span>
                      <motion.div 
                        className="absolute -top-6 -right-8"
                        animate={{ rotate: [0, 15, 0, -15, 0] }}
                        transition={{ 
                          duration: 5, 
                          repeat: Infinity,
                          repeatType: "loop" 
                        }}
                      >
                        <div className="bg-yellow-300 rounded-full p-1.5 shadow-lg">
                          <Star className="h-5 w-5 text-yellow-600" fill="currentColor" />
                        </div>
                      </motion.div>
                    </div>
                  </h1>
                  
                  <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    We're working on something special! Our exclusive membership program with amazing benefits and privileges will be launching soon.
                  </p>
                </motion.div>
                
                {/* Countdown Timer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-12"
                >
                  <div className="flex justify-center gap-4 md:gap-8">
                    {[
                      { label: "Days", value: countdown.days },
                      { label: "Hours", value: countdown.hours },
                      { label: "Minutes", value: countdown.minutes },
                      { label: "Seconds", value: countdown.seconds }
                    ].map((timeUnit, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 md:w-24 h-16 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-2 border border-[#4eb4a7]/20">
                          <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[#4eb4a7] to-[#60afb4]">
                            {String(timeUnit.value).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{timeUnit.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Notification Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="max-w-xl mx-auto"
                >
                  <AnimatePresence mode="wait">
                    {!isSubscribed ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#4eb4a7]/20">
                          <h3 className="text-xl font-semibold mb-4">Get Notified When We Launch</h3>
                          <form onSubmit={handleNotificationSubmit}>
                            <div className="mb-4">
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                  type="email"
                                  placeholder="Your email address"
                                  className="pl-10 py-6 bg-gray-50 border-[#4eb4a7]/20 rounded-xl focus:border-[#4eb4a7]"
                                  value={notificationEmail}
                                  onChange={(e) => setNotificationEmail(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-start mb-6">
                              <Checkbox 
                                id="agree" 
                                checked={agreeToNotify}
                                onCheckedChange={(checked: CheckedState) => setAgreeToNotify(checked === true)}
                                className="data-[state=checked]:bg-[#4eb4a7] data-[state=checked]:border-[#4eb4a7] mt-1"
                              />
                              <label htmlFor="agree" className="ml-2 text-sm text-gray-600">
                                I agree to receive notifications about the membership launch and understand I can unsubscribe at any time.
                              </label>
                            </div>
                            
                            <Button 
                              type="submit"
                              className="w-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3] text-white py-6 rounded-xl shadow-md"
                              disabled={!notificationEmail || !agreeToNotify}
                            >
                              <div className="flex items-center justify-center gap-2">
                                <Bell className="h-5 w-5" />
                                <span>Notify Me</span>
                              </div>
                            </Button>
                          </form>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white p-8 rounded-2xl shadow-lg border border-[#4eb4a7]/20 text-center"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-[#4eb4a7] to-[#60afb4] rounded-full flex items-center justify-center mx-auto mb-6">
                          <Check className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                        <p className="text-gray-600 mb-6">
                          We'll notify you at <span className="text-[#4eb4a7] font-medium">{notificationEmail}</span> when our membership program launches.
                        </p>
                        <Button 
                          variant="outline" 
                          className="text-[#4eb4a7] border-[#4eb4a7]/30 hover:bg-[#4eb4a7]/10"
                          onClick={() => {
                            setNotificationEmail("");
                            setAgreeToNotify(false);
                            setIsSubscribed(false);
                          }}
                        >
                          Subscribe Another Email
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Curved Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,181.3C672,181,768,139,864,122.7C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>
        
        {/* Membership Tiers Preview */}
        <section className="py-16 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                    Exclusive Membership Tiers
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We're designing three membership tiers to cater to your specific needs. Each tier offers unique benefits and privileges.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {membershipTiers.map((tier, index) => (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative h-full group"
                  >
                    <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-[#4eb4a7]/20 p-6">
                      {/* Top Corner "Coming Soon" Ribbon */}
                      <div className="absolute top-0 right-0">
                        <div className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white text-xs font-semibold py-1 px-4 transform rotate-45 translate-y-[6px] translate-x-[30px] shadow-md">
                          Coming Soon
                        </div>
                      </div>
                      
                      <div className="text-center py-6">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mb-4 text-white">
                          {tier.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                        <div className="flex justify-center items-baseline mb-6">
                          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">{tier.price}</span>
                          <span className="text-gray-500 ml-1">/month</span>
                        </div>
                        
                        <div className="mt-6 text-center">
                          <div className="h-2.5 w-8 bg-gradient-to-r from-[#4eb4a7]/40 to-[#60afb4]/40 rounded-full inline-block mx-1"></div>
                          <div className="h-2.5 w-8 bg-gradient-to-r from-[#4eb4a7]/40 to-[#60afb4]/40 rounded-full inline-block mx-1"></div>
                          <div className="h-2.5 w-8 bg-gradient-to-r from-[#4eb4a7]/40 to-[#60afb4]/40 rounded-full inline-block mx-1"></div>
                        </div>
                        
                        <div className="mt-8">
                          <Button 
                            disabled
                            className="bg-gradient-to-r from-gray-300 to-gray-400 text-white py-6 rounded-xl w-full relative overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#4eb4a7]/0 to-[#60afb4]/0 group-hover:from-[#4eb4a7]/20 group-hover:to-[#60afb4]/20 transition-all duration-300"></div>
                            <span>Coming Soon</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Preview */}
        <section className="py-16 bg-gradient-to-br from-white to-[#f0faf9]" ref={planFeaturesRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                    What to Expect
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our membership program will offer a range of exclusive benefits designed to enhance your experience with Prince Group services.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(78, 180, 167, 0.1), 0 8px 10px -6px rgba(78, 180, 167, 0.1)"
                    }}
                    className="bg-white rounded-2xl p-6 border border-[#4eb4a7]/10 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/20 text-[#4eb4a7]">
                        {feature.icon}
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default Membership;

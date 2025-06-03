import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Heart, ChevronUp, Shield, FileText, CreditCard, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import FooterLogo from './footer-logo';

const MainFooter = () => {
  const year = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative mt-0">
      {/* Innovative Wave Transition */}
      <div className="relative h-28 overflow-hidden">
        {/* Main wave with animation */}
        <motion.div
          initial={{ y: 10, opacity: 0.9 }}
          animate={{ 
            y: [10, 5, 10],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut" 
          }}
          className="absolute w-full h-full bottom-0"
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,192L60,170.7C120,149,240,107,360,122.7C480,139,600,213,720,229.3C840,245,960,203,1080,181.3C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              fill="#4eb4a7"
              fillOpacity="0.95"
            ></path>
          </svg>
        </motion.div>

        {/* Secondary overlapping wave */}
        <motion.div
          initial={{ y: 20, opacity: 0.8 }}
          animate={{ 
            y: [20, 10, 20],
            opacity: [0.8, 0.95, 0.8],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute w-full h-full bottom-0"
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,256L48,266.7C96,277,192,299,288,277.3C384,256,480,192,576,186.7C672,181,768,235,864,234.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="#4eb4a7"
              fillOpacity="0.9"
            ></path>
          </svg>
        </motion.div>

        {/* Decorative particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 6 + 3 + 'px',
                height: Math.random() * 6 + 3 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 70 + 20 + '%',
                opacity: Math.random() * 0.2 + 0.1,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 3 + 2,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Ensure seamless connection with footer */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#4eb4a7]"></div>
      </div>

      {/* Footer Content */}
      <div className="bg-[#4eb4a7] pt-6 pb-8">
        <div className="container mx-auto px-4">
          {/* Upper Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
              <FooterLogo />
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/90 mb-6 max-w-md"
              >
                We provide the most reliable documentation and loan services with 20+ branches throughout Kanyakumari District, ensuring convenient access for all our customers.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2 mb-8"
              >
                <div className="flex -space-x-3">
                  {[
                    "/customer/1740978306596.jpeg",
                    "/customer/1702451425744.jpeg", 
                    "/customer/1685698257032.jpeg",
                    "/customer/1748053508063.jpeg"
                  ].map((image, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Customer ${i+1}`} 
                        className="w-full h-full object-cover transform scale-125"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-2 text-white/90 text-sm">
                  <span className="font-bold text-white">30000+</span> Happy Customers
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex space-x-4 mb-8"
              >
                {[
                  { icon: <Facebook size={18} />, href: "#" },
                  { icon: <Twitter size={18} />, href: "#" },
                  { icon: <Instagram size={18} />, href: "#" }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.href} 
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#4eb4a7] transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
          </div>

            {/* Quick Links */}
          <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-lg font-semibold mb-6 flex items-center gap-2 text-white"
              >
                <div className="w-1.5 h-6 bg-white rounded-full"></div>
              Quick Links
              </motion.h3>
              <motion.ul 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-3"
              >
                {[
                  { name: "Home", path: "/" },
                  { name: "Our Services", path: "/services" },
                  { name: "Branches", path: "/branches" },
                  { name: "Events", path: "/events" },
                  { name: "Membership", path: "/membership" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.path} 
                      className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                </Link>
              </li>
                ))}
              </motion.ul>
          </div>

            {/* Our Services */}
          <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-lg font-semibold mb-6 flex items-center gap-2 text-white"
              >
                <div className="w-1.5 h-6 bg-white rounded-full"></div>
                Our Services
              </motion.h3>
              <motion.ul 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-3"
              >
                {[
                  { name: "Documentation", path: "/services", icon: <FileText size={14} /> },
                  { name: "Loan Services", path: "/services#loans", icon: <CreditCard size={14} /> },
                  { name: "About Us", path: "/about", icon: <Sparkles size={14} /> },
                  { name: "Privacy Policy", path: "/privacy", icon: <Shield size={14} /> },
                  { name: "Terms & Conditions", path: "/terms", icon: <Shield size={14} /> }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.path} 
                      className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.icon}
                      {link.name}
                </Link>
              </li>
                ))}
              </motion.ul>
          </div>

            {/* Contact Info */}
          <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-lg font-semibold mb-6 flex items-center gap-2 text-white"
              >
                <div className="w-1.5 h-6 bg-white rounded-full"></div>
              Contact Us
              </motion.h3>
              <motion.ul 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
              <li className="flex items-start">
                  <div className="mt-1 mr-3 p-2 bg-white/20 rounded-full">
                    <MapPin size={14} className="text-white" />
                  </div>
                  <span className="text-white/80 text-sm">
                  Anbu Complex, Opposite to Bharathi Hospital, Thingal Nagar
                </span>
              </li>
              <li className="flex items-center">
                  <div className="mr-3 p-2 bg-white/20 rounded-full">
                    <Phone size={14} className="text-white" />
                  </div>
                  <span className="text-white/80 text-sm">9150537718, 9385722102</span>
              </li>
              <li className="flex items-center">
                  <div className="mr-3 p-2 bg-white/20 rounded-full">
                    <Mail size={14} className="text-white" />
                  </div>
                <a
                  href="mailto:info@princegroup.com"
                    className="text-white/80 text-sm hover:text-white transition-colors"
                >
                  info@princegroup.com
                </a>
              </li>
              </motion.ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/20 pt-8">
            <div className="text-white/80 text-sm">
            &copy; {year} Prince Group. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-sm">Designed & Developed by</span>
              <a href="https://jezx.in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 text-sm font-medium transition-colors">JezX</a>
              <span className="text-white/80 text-sm">|</span>
              <a href="https://jezhtechnologies.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 text-sm font-medium transition-colors">Jezh Technologies</a>
            </div>
            <div>
              <Button 
                onClick={scrollToTop} 
                size="default" 
                className="rounded-full bg-white text-[#4eb4a7] hover:bg-white/90 hover:text-[#60afb4] border-none shadow-lg fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center"
              >
                <ChevronUp size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;

import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Heart, ChevronUp, Shield, FileText, CreditCard, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from './Logo';

const MainFooter = () => {
  const year = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative overflow-hidden pt-24">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#4eb4a7" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#4eb4a7" fillOpacity="0.4" d="M0,96L48,122.7C96,149,192,203,288,213.3C384,224,480,192,576,186.7C672,181,768,203,864,213.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="relative bg-[#4eb4a7] pt-16 pb-12">
        <div className="container mx-auto px-4">
          {/* Upper Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Logo />
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
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#4eb4a7] bg-white flex items-center justify-center text-[#4eb4a7] font-bold text-xs">
                      P{i}
                    </div>
                  ))}
                </div>
                <div className="ml-2 text-white/90 text-sm">
                  <span className="font-bold text-white">5000+</span> Happy Customers
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
                    Sri Sai Complex, Court Road, Vepamoodu Junction, Nagercoil, Tamil Nadu, India - 629001
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

          {/* Subscribe Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl mb-16 border border-white/20 shadow-xl"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-2 text-white">Join Our Newsletter</h3>
                <p className="text-white/80">Stay updated with the latest services and offers from Prince Group</p>
              </div>
              <div>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-white/30 text-white placeholder:text-white/70 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-white border border-white/30"
                  />
                  <Button className="bg-white hover:bg-white/90 text-[#4eb4a7]">
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

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

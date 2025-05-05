
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Logo from './Logo';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-300 mb-6">
              20 Branches All-Over Kanyakumari District
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-prince-green">
                <Facebook />
              </a>
              <a href="#" className="text-gray-300 hover:text-prince-green">
                <Twitter />
              </a>
              <a href="#" className="text-gray-300 hover:text-prince-green">
                <Instagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-prince-green">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-prince-green">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-prince-green">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/branches" className="text-gray-300 hover:text-prince-green">
                  Branches
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-prince-green">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-300 hover:text-prince-green">
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-prince-green">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-prince-green">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-prince-green mr-3 mt-1" />
                <span className="text-gray-300">
                  Sri Sai Complex, Court Road, Vepamoodu Junction, Nagercoil, Tamil Nadu, India - 629001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-prince-green mr-3" />
                <span className="text-gray-300">9150537718, 9385722102</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-prince-green mr-3" />
                <a
                  href="mailto:info@jeztechnologies.com"
                  className="text-gray-300 hover:text-prince-green"
                >
                  info@jeztechnologies.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {year} Prince Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

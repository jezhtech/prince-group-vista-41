import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// This would normally come from your API based on the referral code in the URL
const getReferralData = (refCode: string) => {
  // This is just a mock for demonstration
  const referrals = {
    "techcorp": {
      name: "TechCorp Inc",
      logo: "https://placehold.co/200x100/3366FF/FFFFFF/png?text=TechCorp",
      color: "#3366FF",
      description: "TechCorp Inc. is proud to partner with Prince Group for this amazing concert."
    },
    "marketing-masters": {
      name: "Marketing Masters",
      logo: "https://placehold.co/200x100/4EB4A7/FFFFFF/png?text=MarketingM",
      color: "#4EB4A7",
      description: "Exclusive offer for Marketing Masters clients and partners."
    },
    "lba": {
      name: "Local Business Association",
      logo: "https://placehold.co/200x100/FF6666/FFFFFF/png?text=LBA",
      color: "#FF6666",
      description: "Special discount for members of the Local Business Association."
    }
  };
  
  return referrals[refCode as keyof typeof referrals] || {
    name: "Prince Group",
    logo: "/logo.png",
    color: "#3366FF",
    description: "Join us for an unforgettable music concert experience!"
  };
};

const ReferralLandingPage = () => {
  const { refCode } = useParams<{ refCode: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ticketType: "regular"
  });
  
  // Get referral partner data
  const partner = getReferralData(refCode || "");
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle ticket type selection
  const handleTicketTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, ticketType: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to your backend
    // and handle the ticket purchase process
    alert("Thank you for your purchase! Your tickets will be emailed to you shortly.");
    navigate("/");
  };
  
  // Set primary color based on partner's branding
  const primaryColor = partner.color;
  
  return (
    <>
      <Helmet>
        <title>Music Concert Tickets | {partner.name} & Prince Group</title>
        <style>{`
          :root {
            --partner-color: ${primaryColor};
          }
          .partner-bg {
            background-color: var(--partner-color);
          }
          .partner-text {
            color: var(--partner-color);
          }
          .partner-border {
            border-color: var(--partner-color);
          }
        `}</style>
      </Helmet>
    
      <div className="min-h-screen bg-gray-50">
        {/* Header with both logos */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="/logo.png" 
                alt="Prince Group Logo" 
                className="h-10 mr-4"
              />
              <div className="h-8 w-px bg-gray-200 mr-4"></div>
              <img 
                src={partner.logo} 
                alt={`${partner.name} Logo`} 
                className="h-10"
              />
            </div>
            <div>
              <Button className="partner-bg">Contact Us</Button>
            </div>
          </div>
        </header>
        
        {/* Hero Section */}
        <div 
          className="bg-cover bg-center py-20 text-white relative"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80")'
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white text-black hover:bg-white">
              Exclusive Partner Offer
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Annual Music Concert 2023
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {partner.description}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="bg-black bg-opacity-50 px-6 py-3 rounded-lg">
                <div className="text-sm">Date</div>
                <div className="font-bold">August 15-16, 2023</div>
              </div>
              <div className="bg-black bg-opacity-50 px-6 py-3 rounded-lg">
                <div className="text-sm">Location</div>
                <div className="font-bold">Nagercoil Convention Center</div>
              </div>
              <div className="bg-black bg-opacity-50 px-6 py-3 rounded-lg">
                <div className="text-sm">Featuring</div>
                <div className="font-bold">Top Artists & Bands</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticket Booking Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Event Details */}
              <div>
                <h2 className="text-3xl font-bold mb-6 partner-text">Event Highlights</h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Featured Artists</h3>
                    <ul className="space-y-3">
                      {["Legendary Rock Band", "Pop Sensation", "Classical Fusion Group", "Local Favorites"].map((artist, index) => (
                        <li key={index} className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2`} style={{ backgroundColor: primaryColor }}></div>
                          {artist}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {["Access to all performances", "Food & beverage options", "Exclusive merchandise", "Meet & greet opportunities"].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2`} style={{ backgroundColor: primaryColor }}></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Partner Benefits</h3>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}15` }}>
                      <p className="text-lg">
                        As a valued partner of {partner.name}, you get <span className="font-bold">15% off</span> on all ticket types!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Booking Form */}
              <div>
                <Card className="border-t-4" style={{ borderTopColor: primaryColor }}>
                  <CardHeader>
                    <CardTitle className="text-2xl">Book Your Tickets Now</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ticketType">Ticket Type</Label>
                        <Select 
                          value={formData.ticketType}
                          onValueChange={handleTicketTypeChange}
                        >
                          <SelectTrigger id="ticketType">
                            <SelectValue placeholder="Select ticket type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="regular">Regular Ticket (₹999)</SelectItem>
                            <SelectItem value="vip">VIP Experience (₹2,999)</SelectItem>
                            <SelectItem value="premium">Premium Package (₹4,999)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 pt-4">
                        <div className="flex items-center justify-between">
                          <span>Ticket Price:</span>
                          <span className="font-medium">
                            {formData.ticketType === 'regular' ? '₹999' : 
                             formData.ticketType === 'vip' ? '₹2,999' : '₹4,999'}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span>Partner Discount (15%):</span>
                          <span className="font-medium text-green-600">
                            -
                            {formData.ticketType === 'regular' ? '₹149.85' : 
                             formData.ticketType === 'vip' ? '₹449.85' : '₹749.85'}
                          </span>
                        </div>
                        
                        <div className="border-t pt-2 mt-2">
                          <div className="flex items-center justify-between font-bold">
                            <span>Total:</span>
                            <span className="partner-text">
                              {formData.ticketType === 'regular' ? '₹849.15' : 
                               formData.ticketType === 'vip' ? '₹2,549.15' : '₹4,249.15'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full text-lg py-6" 
                      style={{ backgroundColor: primaryColor }}
                      onClick={handleSubmit}
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  By booking tickets, you agree to our Terms of Service and Privacy Policy.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold mb-4">About Prince Group</h4>
                <p className="text-gray-400">
                  Prince Group is a leading organization dedicated to providing exceptional services and memorable events.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Contact Information</h4>
                <p className="text-gray-400">
                  123 Main Street<br />
                  Nagercoil, Tamil Nadu<br />
                  India<br />
                  info@princegroup.com
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                  <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                  <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img 
                  src="/logo.png" 
                  alt="Prince Group Logo" 
                  className="h-8 mr-4"
                />
                <div className="h-6 w-px bg-gray-700 mr-4"></div>
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo`} 
                  className="h-8"
                />
              </div>
              <div className="text-gray-400 text-sm">
                © 2023 Prince Group. All rights reserved. In partnership with {partner.name}.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ReferralLandingPage; 
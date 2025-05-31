import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Ticket, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  Edit, 
  DownloadCloud, 
  Clock, 
  CheckCircle, 
  Shield, 
  Star, 
  ChevronRight, 
  Bell,
  LogOut
} from 'lucide-react';

import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { motion } from "framer-motion";

const MemberDashboard = () => {
  // Mock data for the dashboard
  const memberInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Nagercoil, Tamil Nadu 629001",
    membershipId: "PG-2023-1234",
    memberSince: "Jan 2023",
    membershipType: "Premium",
    expiryDate: "Dec 31, 2023",
    profileImage: ""
  };

  // Mock event tickets
  const tickets = [
    { 
      id: "T-1002", 
      event: "Prince Group Mega Music Festival", 
      date: "December 21, 2025", 
      time: "9:00 AM - 10:00 PM",
      location: "Kanyakumari",
      ticketClass: "VVIP",
      price: "₹5,000",
      status: "Valid", 
      qrCode: "https://placehold.co/200x200/e9e9e9/7d7d7d?text=QR+Code"
    },
    { 
      id: "T-1001", 
      event: "Financial Planning Seminar", 
      date: "June 15, 2023", 
      time: "10:00 AM - 12:00 PM",
      location: "Nagercoil Branch",
      ticketClass: "General",
      price: "Free",
      status: "Used", 
      qrCode: "https://placehold.co/200x200/e9e9e9/7d7d7d?text=QR+Code"
    }
  ];

  // State for profile edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...memberInfo });
  
  // Handle profile edit
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const saveProfileChanges = () => {
    // In a real app, you would save to API here
    setIsEditMode(false);
    // Update memberInfo with editedProfile
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <MainNavbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Top Section with Profile Summary */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div 
              variants={itemVariants}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-[#4eb4a7]/10"
            >
              {/* Background gradient banner */}
              <div className="h-32 bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]"></div>
              
              <div className="px-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-6 gap-6">
                  {/* Profile avatar */}
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg bg-[#85cbc3]">
                    <AvatarImage src={memberInfo.profileImage} />
                    <AvatarFallback className="text-3xl text-white">{memberInfo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800">{memberInfo.name}</h1>
                        <p className="text-gray-500 flex items-center gap-1 mt-1">
                          <User className="h-4 w-4" />
                          Member ID: {memberInfo.membershipId}
            </p>
          </div>

                      <div className="flex gap-3">
                        <Badge className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#4eb4a7] hover:to-[#60afb4] py-1.5 px-3">
                          <Star className="h-3.5 w-3.5 mr-1" />
                          {memberInfo.membershipType}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/5"
                          onClick={() => setIsEditMode(true)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit Profile
                  </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Membership status bar */}
                <div className="bg-[#4eb4a7]/5 rounded-xl p-4 border border-[#4eb4a7]/10 flex flex-wrap gap-8 justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7]">
                      <Calendar className="h-5 w-5" />
                  </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">{memberInfo.memberSince}</p>
            </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expires On</p>
                      <p className="font-medium">{memberInfo.expiryDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7]">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-8 w-full justify-start bg-white border border-[#4eb4a7]/10 p-1 rounded-xl shadow-sm">
              <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-[#4eb4a7] data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="tickets" className="rounded-lg data-[state=active]:bg-[#4eb4a7] data-[state=active]:text-white">
                <Ticket className="h-4 w-4 mr-2" />
                My Tickets
              </TabsTrigger>
              <TabsTrigger value="membership" className="rounded-lg data-[state=active]:bg-[#4eb4a7] data-[state=active]:text-white">
                <Star className="h-4 w-4 mr-2" />
                Membership
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab Content */}
            <TabsContent value="profile">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Profile Information Card */}
                <motion.div 
                  variants={itemVariants}
                  className="lg:col-span-2"
                >
                  <Card className="border-[#4eb4a7]/10 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-[#4eb4a7]/5 to-[#60afb4]/5 border-b border-[#4eb4a7]/10">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-gray-800">Profile Information</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">Full Name</p>
                          <p className="flex items-center text-gray-800 font-medium">
                            <User className="h-4 w-4 mr-2 text-[#4eb4a7]" />
                            {memberInfo.name}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">Email Address</p>
                          <p className="flex items-center text-gray-800 font-medium">
                            <Mail className="h-4 w-4 mr-2 text-[#4eb4a7]" />
                            {memberInfo.email}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">Mobile Number</p>
                          <p className="flex items-center text-gray-800 font-medium">
                            <Phone className="h-4 w-4 mr-2 text-[#4eb4a7]" />
                            {memberInfo.phone}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">Member ID</p>
                          <p className="flex items-center text-gray-800 font-medium">
                            <Shield className="h-4 w-4 mr-2 text-[#4eb4a7]" />
                            {memberInfo.membershipId}
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm font-medium text-gray-500 mb-2">Address</p>
                        <p className="flex items-start text-gray-800 font-medium">
                          <MapPin className="h-4 w-4 mr-2 text-[#4eb4a7] mt-1 flex-shrink-0" />
                          <span>{memberInfo.address}</span>
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t border-gray-100 p-4">
                      <Button 
                        className="bg-[#4eb4a7] hover:bg-[#3da296]"
                        onClick={() => setIsEditMode(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                  </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                
                {/* Digital Membership Card */}
                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden border-[#4eb4a7]/10 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img 
                            src="https://placehold.co/80x80/ffffff/4eb4a7?text=PG" 
                            alt="Prince Group Logo" 
                            className="h-10 w-10 mr-3"
                          />
                          <div>
                            <p className="text-xs text-white/80">Prince Group</p>
                            <CardTitle>Membership Card</CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">Member Name</p>
                            <p className="font-bold text-lg">{memberInfo.name}</p>
                          </div>
                          <div className="h-12 w-12 rounded-full bg-[#4eb4a7] flex items-center justify-center text-white text-xl font-bold">
                            {memberInfo.name.charAt(0)}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Member ID</p>
                          <p className="font-medium">{memberInfo.membershipId}</p>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-xs text-gray-500">Membership Type</p>
                              <p className="font-semibold text-[#4eb4a7]">{memberInfo.membershipType}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Valid Until</p>
                              <p className="font-semibold">{memberInfo.expiryDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#4eb4a7]/5 p-4 rounded-lg border border-[#4eb4a7]/10 text-center">
                        <img 
                          src="https://placehold.co/200x200/e9e9e9/4eb4a7?text=QR+Code" 
                          alt="Membership QR Code" 
                          className="h-32 w-32 mx-auto mb-2"
                        />
                        <p className="text-xs text-gray-500">Scan to verify membership</p>
                </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t border-gray-100 p-4">
                      <Button 
                        variant="outline" 
                        className="w-full border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/5"
                      >
                        <DownloadCloud className="h-4 w-4 mr-2" />
                        Download Membership Card
                      </Button>
                    </CardFooter>
              </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            {/* Tickets Tab Content */}
            <TabsContent value="tickets">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-[#4eb4a7]/10 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-[#4eb4a7]/5 to-[#60afb4]/5 border-b border-[#4eb4a7]/10">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-gray-800">My Event Tickets</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {tickets.length > 0 ? (
                        <div className="space-y-6">
                          {tickets.map((ticket, index) => (
                            <div 
                              key={ticket.id}
                              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              <div className={`p-6 border-l-4 ${ticket.status === 'Valid' ? 'border-l-green-500' : 'border-l-gray-300'}`}>
                                <div className="flex flex-col md:flex-row gap-6">
                                  {/* Ticket details */}
                                  <div className="flex-grow space-y-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <Badge className={ticket.status === 'Valid' 
                                          ? 'bg-green-100 hover:bg-green-100 text-green-800 mb-2'
                                          : 'bg-gray-100 hover:bg-gray-100 text-gray-800 mb-2'}
                                        >
                                          {ticket.status}
                                        </Badge>
                                        <h3 className="text-xl font-bold text-gray-800">{ticket.event}</h3>
                                        <p className="text-[#4eb4a7] font-medium">Ticket #{ticket.id}</p>
                                      </div>
                                      
                                      {ticket.status === 'Valid' && (
                                        <Button 
                                          size="sm"
                                          className="bg-[#4eb4a7] hover:bg-[#3da296]"
                                        >
                                          <Download className="h-4 w-4 mr-1" />
                                          Download
                  </Button>
                                      )}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-[#4eb4a7]" />
                                        <div>
                                          <p className="text-gray-500">Date</p>
                                          <p className="font-medium">{ticket.date}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-[#4eb4a7]" />
                                        <div>
                                          <p className="text-gray-500">Time</p>
                                          <p className="font-medium">{ticket.time}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-[#4eb4a7]" />
                                        <div>
                                          <p className="text-gray-500">Location</p>
                                          <p className="font-medium">{ticket.location}</p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 pt-2">
                                      <div>
                                        <p className="text-gray-500 text-sm">Ticket Class</p>
                                        <p className="font-semibold">{ticket.ticketClass}</p>
                                      </div>
                                      
                                      <div>
                                        <p className="text-gray-500 text-sm">Price</p>
                                        <p className="font-semibold">{ticket.price}</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* QR code (only for valid tickets) */}
                                  {ticket.status === 'Valid' && (
                                    <div className="w-32 h-32 flex-shrink-0">
                                      <img
                                        src={ticket.qrCode}
                                        alt="Ticket QR Code"
                                        className="w-full h-full rounded-lg border border-gray-200"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Ticket className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">No tickets found</h3>
                          <p className="text-gray-500 mb-6">You haven't purchased any event tickets yet.</p>
                          <Button asChild className="bg-[#4eb4a7] hover:bg-[#3da296]">
                            <Link to="/events">Browse Events</Link>
                  </Button>
                </div>
                      )}
                    </CardContent>
              </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
            
            {/* Membership Tab Content */}
            <TabsContent value="membership">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden border-[#4eb4a7]/10 shadow-lg">
                    <div className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] py-12 px-6 text-center text-white">
                      <Badge className="bg-white/20 hover:bg-white/30 mb-4">
                        {memberInfo.membershipType} Member
                      </Badge>
                      <h2 className="text-3xl font-bold mb-2">Your Membership is Active</h2>
                      <p className="text-white/80 max-w-md mx-auto">
                        Enjoy all the benefits of your {memberInfo.membershipType} membership until {memberInfo.expiryDate}
                      </p>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-[#4eb4a7]/5 rounded-xl p-4 border border-[#4eb4a7]/10 text-center">
                          <div className="h-12 w-12 bg-[#4eb4a7]/10 rounded-full flex items-center justify-center text-[#4eb4a7] mx-auto mb-3">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <h3 className="font-medium mb-1">Member Since</h3>
                          <p className="text-gray-600">{memberInfo.memberSince}</p>
                        </div>
                        
                        <div className="bg-[#4eb4a7]/5 rounded-xl p-4 border border-[#4eb4a7]/10 text-center">
                          <div className="h-12 w-12 bg-[#4eb4a7]/10 rounded-full flex items-center justify-center text-[#4eb4a7] mx-auto mb-3">
                            <Star className="h-6 w-6" />
                          </div>
                          <h3 className="font-medium mb-1">Membership Tier</h3>
                          <p className="text-gray-600">{memberInfo.membershipType}</p>
                        </div>
                        
                        <div className="bg-[#4eb4a7]/5 rounded-xl p-4 border border-[#4eb4a7]/10 text-center">
                          <div className="h-12 w-12 bg-[#4eb4a7]/10 rounded-full flex items-center justify-center text-[#4eb4a7] mx-auto mb-3">
                            <Clock className="h-6 w-6" />
                          </div>
                          <h3 className="font-medium mb-1">Expires On</h3>
                          <p className="text-gray-600">{memberInfo.expiryDate}</p>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">Membership Benefits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#4eb4a7] mt-0.5" />
                          <div>
                            <p className="font-medium">Priority Document Processing</p>
                            <p className="text-sm text-gray-500">Get your documents processed ahead of regular queue</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#4eb4a7] mt-0.5" />
                          <div>
                            <p className="font-medium">Exclusive Event Access</p>
                            <p className="text-sm text-gray-500">Early access to all Prince Group events</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#4eb4a7] mt-0.5" />
                          <div>
                            <p className="font-medium">Dedicated Relationship Manager</p>
                            <p className="text-sm text-gray-500">Personal assistance for all your service needs</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#4eb4a7] mt-0.5" />
                          <div>
                            <p className="font-medium">Preferential Loan Rates</p>
                            <p className="text-sm text-gray-500">Special interest rates on all loan services</p>
                          </div>
            </div>
          </div>
                    </CardContent>
                    
                    <CardFooter className="bg-gray-50 border-t border-gray-100 p-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Need to upgrade?</p>
                        <p className="font-medium">Contact our membership team</p>
                      </div>
                      <Button className="bg-[#4eb4a7] hover:bg-[#3da296]">
                        Renew Membership
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Profile Edit Dialog */}
      <Dialog open={isEditMode} onOpenChange={setIsEditMode}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Profile Information</DialogTitle>
            <DialogDescription>
              Make changes to your profile information below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editedProfile.name}
                onChange={handleProfileChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editedProfile.email}
                onChange={handleProfileChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={editedProfile.phone}
                onChange={handleProfileChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={editedProfile.address}
                onChange={handleProfileChange}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
            <Button className="bg-[#4eb4a7] hover:bg-[#3da296]" onClick={saveProfileChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <MainFooter />
    </div>
  );
};

export default MemberDashboard;

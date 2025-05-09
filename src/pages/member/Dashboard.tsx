
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Ticket, User, FileText, MessageSquare, Settings } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatisticsCard from '@/components/StatisticsCard';

const MemberDashboard = () => {
  // Mock data for the dashboard
  const memberInfo = {
    name: "John Doe",
    membershipId: "PG-2023-1234",
    memberSince: "Jan 2023",
    membershipType: "Premium",
    expiryDate: "Dec 31, 2023"
  };

  // Mock upcoming events
  const upcomingEvents = [
    { id: 1, title: "Financial Planning Seminar", date: "June 15, 2023", location: "Nagercoil Branch" },
    { id: 2, title: "Loan Application Workshop", date: "June 22, 2023", location: "Marthandam Branch" }
  ];

  // Mock tickets
  const tickets = [
    { id: "T-1001", event: "Annual Members Meet", date: "May 10, 2023", status: "Used" },
    { id: "T-1002", event: "Financial Planning Seminar", date: "June 15, 2023", status: "Valid" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, {memberInfo.name}</h1>
            <p className="text-gray-600">
              Membership ID: {memberInfo.membershipId} | Member Since: {memberInfo.memberSince}
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatisticsCard
              value="2"
              label="Upcoming Events"
              variant="blue"
            />
            <StatisticsCard
              value="1"
              label="Active Tickets"
              variant="green"
            />
            <StatisticsCard
              value="5"
              label="Documents Processed"
              variant="blue"
            />
            <StatisticsCard
              value="Premium"
              label="Membership Tier"
              variant="green"
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Events */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-ui-blue-500" />
                    Upcoming Events
                  </h2>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/member/events">View All</Link>
                  </Button>
                </div>
                
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="p-4 border border-gray-100 rounded-lg hover:border-ui-blue-200 transition-colors">
                        <h3 className="font-medium mb-1">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-3">{event.date}</span>
                          <span>({event.location})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No upcoming events</div>
                )}
              </Card>

              {/* Tickets */}
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Ticket className="mr-2 h-5 w-5 text-ui-blue-500" />
                    My Tickets
                  </h2>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/member/tickets">View All</Link>
                  </Button>
                </div>

                {tickets.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Ticket ID</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Event</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tickets.map(ticket => (
                          <tr key={ticket.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{ticket.id}</td>
                            <td className="px-4 py-3">{ticket.event}</td>
                            <td className="px-4 py-3 text-sm">{ticket.date}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-block px-2 py-1 text-xs rounded ${
                                ticket.status === 'Valid' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {ticket.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No tickets found</div>
                )}
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Membership Card */}
              <Card className="p-6 bg-gradient-to-r from-ui-blue-600 to-ui-blue-400 text-white">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold mb-6">Membership Card</h2>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium">{memberInfo.name}</h3>
                    <p className="text-white/80">ID: {memberInfo.membershipId}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-white/80">Type</p>
                      <p className="font-medium">{memberInfo.membershipType}</p>
                    </div>
                    <div>
                      <p className="text-white/80">Expires</p>
                      <p className="font-medium">{memberInfo.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild variant="outline" className="flex flex-col h-auto py-4">
                    <Link to="/services">
                      <FileText className="h-5 w-5 mb-1" />
                      <span className="text-sm">Services</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex flex-col h-auto py-4">
                    <Link to="/member/events">
                      <Calendar className="h-5 w-5 mb-1" />
                      <span className="text-sm">Events</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex flex-col h-auto py-4">
                    <Link to="/contact">
                      <MessageSquare className="h-5 w-5 mb-1" />
                      <span className="text-sm">Support</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex flex-col h-auto py-4">
                    <Link to="/member/profile">
                      <Settings className="h-5 w-5 mb-1" />
                      <span className="text-sm">Settings</span>
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MemberDashboard;

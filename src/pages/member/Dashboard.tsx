
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Ticket, User, FileText, MessageSquare, Settings, ArrowRight } from 'lucide-react';
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
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
      <MainNavbar />
      <main className="flex-grow pt-24 pb-16 bg-gradient-to-br from-gray-50 to-ui-blue-50/30">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome, {memberInfo.name}</h1>
            <p className="text-gray-600 flex flex-wrap gap-x-4">
              <span className="inline-flex items-center">
                <User className="h-4 w-4 mr-1 text-ui-blue-500" />
                ID: {memberInfo.membershipId}
              </span>
              <span className="inline-flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-ui-blue-500" />
                Member Since: {memberInfo.memberSince}
              </span>
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
              <Card className="p-6 overflow-hidden border-0 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-ui-blue-500" />
                    Upcoming Events
                  </h2>
                  <Button asChild variant="ghost" size="sm" className="text-ui-blue-600 hover:text-ui-blue-700 hover:bg-ui-blue-50">
                    <Link to="/member/events" className="flex items-center">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="p-4 border border-gray-100 rounded-lg bg-white hover:shadow-md transition-all duration-200">
                        <h3 className="font-medium mb-1">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1 text-ui-green-500" />
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
              <Card className="p-6 overflow-hidden border-0 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Ticket className="mr-2 h-5 w-5 text-ui-blue-500" />
                    My Tickets
                  </h2>
                  <Button asChild variant="ghost" size="sm" className="text-ui-blue-600 hover:text-ui-blue-700 hover:bg-ui-blue-50">
                    <Link to="/member/tickets" className="flex items-center">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {tickets.length > 0 ? (
                  <div className="overflow-x-auto bg-white rounded-lg">
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
              <Card className="overflow-hidden border-0 shadow-md">
                <div className="p-6 bg-gradient-to-br from-ui-blue-600 to-ui-blue-400 text-white">
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
                <div className="p-4 bg-white">
                  <Button variant="outline" className="w-full text-ui-blue-600 border-ui-blue-200 hover:bg-ui-blue-50">
                    View Full Card
                  </Button>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 border-0 shadow-md">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild variant="outline" className="flex flex-col h-auto py-4 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                    <Link to="/services">
                      <FileText className="h-5 w-5 mb-1 text-ui-green-500" />
                      <span className="text-sm">Services</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex flex-col h-auto py-4 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                    <Link to="/member/events">
                      <Calendar className="h-5 w-5 mb-1 text-ui-green-500" />
                      <span className="text-sm">Events</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex flex-col h-auto py-4 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                    <Link to="/contact">
                      <MessageSquare className="h-5 w-5 mb-1 text-ui-green-500" />
                      <span className="text-sm">Support</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex flex-col h-auto py-4 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                    <Link to="/member/profile">
                      <Settings className="h-5 w-5 mb-1 text-ui-green-500" />
                      <span className="text-sm">Settings</span>
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
};

export default MemberDashboard;

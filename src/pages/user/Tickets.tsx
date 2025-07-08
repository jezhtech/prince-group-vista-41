
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, Clock, MapPin, Download, QrCode, User, ArrowRight } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

const tickets = [
  {
    id: "TCK-001",
    eventId: 1,
    eventTitle: "Document Registration Workshop",
    date: "Jun 15, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Nagercoil Main Branch",
    ticketType: "Member",
    status: "upcoming"
  },
  {
    id: "TCK-002",
    eventId: 4,
    eventTitle: "Members Networking Event",
    date: "Jul 5, 2023",
    time: "5:00 PM - 7:00 PM",
    location: "Nagercoil Main Branch",
    ticketType: "VIP",
    status: "upcoming"
  },
  {
    id: "TCK-003",
    eventId: 5,
    eventTitle: "Property Documentation Seminar",
    date: "May 12, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Colachel Branch",
    ticketType: "Member",
    status: "past"
  },
];

const MemberTickets = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const filteredTickets = tickets.filter(ticket => ticket.status === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-ui-blue-50/30 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h1 className="text-2xl font-bold mb-1">My Tickets</h1>
              <p className="text-gray-600">Manage your event registrations and tickets</p>
            </div>

            <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="mb-8">
              <TabsList className="bg-white border border-gray-200">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white">Upcoming</TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white">Past</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-6">
              {filteredTickets.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-8 text-center bg-white border-0 shadow-md">
                  <User className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">No tickets found</p>
                  <p className="text-gray-500 mt-1">
                    {activeTab === "upcoming" 
                      ? "You don't have any upcoming events" 
                      : "You don't have any past events"
                    }
                  </p>
                  {activeTab === "upcoming" && (
                    <Button className="mt-4 bg-ui-blue-500 hover:bg-ui-blue-600" asChild>
                      <a href="/events">Browse Events</a>
                    </Button>
                  )}
                </Card>
              ) : (
                filteredTickets.map(ticket => (
                  <Card key={ticket.id} className="overflow-hidden border-0 shadow-md">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 bg-gradient-to-br from-ui-blue-600 to-ui-blue-500 p-6 text-white flex flex-col items-center justify-center">
                        <QrCode className="h-20 w-20 mb-4" />
                        <p className="font-mono text-center">{ticket.id}</p>
                        <span className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.ticketType === 'VIP' 
                            ? 'bg-yellow-400 text-yellow-800'
                            : 'bg-white text-ui-blue-600'
                        }`}>
                          {ticket.ticketType} Ticket
                        </span>
                      </div>

                      <div className="md:w-3/4 p-6 bg-white">
                        <CardHeader className="p-0 pb-4">
                          <CardTitle className="text-xl">{ticket.eventTitle}</CardTitle>
                          <CardDescription className="text-ui-blue-600 font-medium">
                            {ticket.status === "upcoming" ? "Upcoming Event" : "Past Event"}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="p-0 space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <CalendarCheck className="h-5 w-5 text-ui-green-500 mr-3" />
                              <span>{ticket.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-ui-green-500 mr-3" />
                              <span>{ticket.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-5 w-5 text-ui-green-500 mr-3" />
                              <span>{ticket.location}</span>
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="p-0 pt-4 flex flex-wrap gap-2">
                          <Button variant="default" className="bg-ui-blue-500 hover:bg-ui-blue-600">
                            <Download className="mr-2 h-4 w-4" /> Download Ticket
                          </Button>
                          {ticket.status === "upcoming" && (
                            <Button variant="outline" className="text-ui-blue-600 border-ui-blue-200 hover:bg-ui-blue-50">
                              View Event Details <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          )}
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
};

export default MemberTickets;

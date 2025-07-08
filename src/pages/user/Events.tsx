
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, Clock, MapPin, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

const events = [
  {
    id: 1,
    title: "Document Registration Workshop",
    date: "Jun 15, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Nagercoil Main Branch",
    description: "Learn about efficient document registration processes and tips to avoid common pitfalls.",
    status: "upcoming",
    registered: true
  },
  {
    id: 2,
    title: "Financial Planning Seminar",
    date: "Jun 22, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Thuckalay Branch",
    description: "Expert guidance on managing personal finances, investments, and retirement planning.",
    status: "upcoming",
    registered: false
  },
  {
    id: 4,
    title: "Members Networking Event",
    date: "Jul 5, 2023",
    time: "5:00 PM - 7:00 PM",
    location: "Nagercoil Main Branch",
    description: "Connect with other Prince Group members and build valuable professional relationships.",
    status: "upcoming",
    registered: true
  },
  {
    id: 5,
    title: "Property Documentation Seminar",
    date: "May 12, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Colachel Branch",
    description: "Comprehensive overview of property documentation requirements and best practices.",
    status: "past",
    registered: true
  }
];

const MemberEvents = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const filteredEvents = events.filter(event => event.status === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-ui-blue-50/30 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h1 className="text-2xl font-bold mb-1">My Events</h1>
              <p className="text-gray-600">Upcoming and past events</p>
            </div>

            <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="mb-8">
              <TabsList className="bg-white border border-gray-200">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white">Upcoming</TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white">Past</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-6">
              {filteredEvents.length === 0 ? (
                <Card className="flex flex-col items-center justify-center p-8 text-center bg-white border-0 shadow-md">
                  <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">No events found</p>
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
                filteredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden bg-white border-0 shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{event.title}</CardTitle>
                          {event.registered && (
                            <CardDescription className="text-ui-green-500 font-medium mt-1 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" /> Registered
                            </CardDescription>
                          )}
                          {!event.registered && (
                            <CardDescription className="text-gray-500 font-medium mt-1">
                              Not Registered
                            </CardDescription>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{event.description}</p>
                      <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <CalendarCheck className="h-5 w-5 text-ui-blue-500 mr-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-ui-blue-500 mr-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-ui-blue-500 mr-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-100 pt-4">
                      {event.registered ? (
                        <div className="flex space-x-3">
                          <Button variant="default" className="bg-ui-blue-500 hover:bg-ui-blue-600">
                            View Ticket <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                          {event.status === "upcoming" && (
                            <Button variant="outline" className="text-ui-blue-600 border-ui-blue-200 hover:bg-ui-blue-50">
                              Cancel Registration
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button variant="default" className="bg-ui-green-500 hover:bg-ui-green-600">
                          Register Now
                        </Button>
                      )}
                    </CardFooter>
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

export default MemberEvents;

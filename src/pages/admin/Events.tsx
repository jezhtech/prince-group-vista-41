
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, PlusCircle, Search, Edit2, Trash2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const events = [
  {
    id: 1,
    title: "Document Registration Workshop",
    date: "2023-06-15",
    time: "10:00 AM - 12:00 PM",
    location: "Nagercoil Main Branch",
    attendees: 45,
    capacity: 50,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Financial Planning Seminar",
    date: "2023-06-22",
    time: "2:00 PM - 4:00 PM",
    location: "Thuckalay Branch",
    attendees: 28,
    capacity: 40,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Loan Application Workshop",
    date: "2023-06-29",
    time: "11:00 AM - 1:00 PM",
    location: "Marthandam Branch",
    attendees: 32,
    capacity: 35,
    status: "upcoming"
  },
  {
    id: 4,
    title: "Members Networking Event",
    date: "2023-07-05",
    time: "5:00 PM - 7:00 PM",
    location: "Nagercoil Main Branch",
    attendees: 38,
    capacity: 50,
    status: "upcoming"
  },
  {
    id: 5,
    title: "Property Documentation Seminar",
    date: "2023-05-12",
    time: "10:00 AM - 12:00 PM",
    location: "Colachel Branch",
    attendees: 20,
    capacity: 30,
    status: "past"
  },
  {
    id: 6,
    title: "Business Loan Information Session",
    date: "2023-05-05",
    time: "3:00 PM - 5:00 PM",
    location: "Kanyakumari Branch",
    attendees: 15,
    capacity: 25,
    status: "past"
  }
];

const AdminEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && event.status === filter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Event Schedule</h1>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" /> Create New Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium">No events found</p>
                <p className="text-gray-500 mt-1">Try adjusting your search or filter</p>
              </Card>
            ) : (
              filteredEvents.map(event => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="flex items-center mt-2">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {event.date} • 
                          <Clock className="h-4 w-4 mx-1" />
                          {event.time}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="font-medium min-w-24">Location:</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium min-w-24">Registration:</span>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">
                              {event.attendees} / {event.capacity} registered
                            </span>
                            <span className="text-sm">
                              {Math.round((event.attendees / event.capacity) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-prince-green h-2 rounded-full"
                              style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium min-w-24">Status:</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          event.status === "upcoming" 
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {event.status === "upcoming" ? "Upcoming" : "Past"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-2">
                      <Button variant="outline">View Details</Button>
                      <Button>Manage Registrations</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Calendar View</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Calendar view would display events in a month, week, or day format. Implement with a calendar library for a complete solution.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminEvents;

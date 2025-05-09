import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  CalendarCheck, 
  List, 
  Grid, 
  MapPin, 
  Clock, 
  Users,
  Search,
  Filter,
  ChevronDown,
  Check
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Events = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const events = [
    {
      id: 1,
      title: "Document Registration Workshop",
      date: "Jun 15, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Nagercoil Main Branch",
      attendees: 45,
      capacity: 50,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Learn about efficient document registration processes and tips to avoid common pitfalls.",
      category: "documentation"
    },
    {
      id: 2,
      title: "Financial Planning Seminar",
      date: "Jun 22, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Thuckalay Branch",
      attendees: 28,
      capacity: 40,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Expert guidance on managing personal finances, investments, and retirement planning.",
      category: "financial"
    },
    {
      id: 3,
      title: "Loan Application Workshop",
      date: "Jun 29, 2023",
      time: "11:00 AM - 1:00 PM",
      location: "Marthandam Branch",
      attendees: 32,
      capacity: 35,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Step-by-step guidance on preparing a successful loan application with our experts.",
      category: "loans"
    },
    {
      id: 4,
      title: "Real Estate Investment Forum",
      date: "Jul 05, 2023",
      time: "3:00 PM - 6:00 PM",
      location: "Nagercoil Main Branch",
      attendees: 22,
      capacity: 50,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Learn about lucrative real estate investment opportunities in Kanyakumari district.",
      category: "financial"
    },
    {
      id: 5,
      title: "Business Licensing Seminar",
      date: "Jul 12, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Colachel Branch",
      attendees: 15,
      capacity: 25,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Comprehensive guidance on business licensing requirements and application processes.",
      category: "documentation"
    },
    {
      id: 6,
      title: "Home Loan Orientation",
      date: "Jul 18, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Kuzhithurai Branch",
      attendees: 18,
      capacity: 30,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Learn about home loan options, eligibility criteria, and application procedures.",
      category: "loans"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || event.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ui-blue-600 to-ui-blue-400 py-24">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Upcoming Events</h1>
              <p className="text-xl text-white/90">
                Join us for educational workshops, seminars, and networking opportunities.
              </p>
              <Button size="lg" className="mt-8 bg-white text-ui-blue-600 hover:bg-gray-100">
                Register for an Event
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white h-16 w-full">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
            </svg>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <Tabs defaultValue="upcoming" className="w-full max-w-md">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white">Upcoming</TabsTrigger>
                    <TabsTrigger value="past" className="data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white">Past</TabsTrigger>
                    <TabsTrigger value="members" className="data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white">Members Only</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-ui-blue-500 hover:bg-ui-blue-600" : ""}
                  >
                    <Grid className="h-4 w-4 mr-2" /> Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-ui-blue-500 hover:bg-ui-blue-600" : ""}
                  >
                    <List className="h-4 w-4 mr-2" /> List
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                  <Input 
                    type="text" 
                    placeholder="Search events..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      {filter === "all" ? "All Categories" : 
                       filter === "documentation" ? "Documentation" :
                       filter === "loans" ? "Loans" : "Financial Planning"}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilter("all")}>All Categories</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("documentation")}>Documentation</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("loans")}>Loans</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("financial")}>Financial Planning</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mb-4">
                    <CalendarCheck className="h-16 w-16 mx-auto text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                      <div className="h-48 relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-ui-blue-500 text-white py-1 px-3 text-sm font-medium rounded-bl-lg">
                          {event.date}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                            {event.category === "documentation" ? "Documentation" :
                             event.category === "loans" ? "Loans" : "Financial Planning"}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center">
                            <CalendarCheck className="h-5 w-5 text-ui-blue-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-ui-blue-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-ui-blue-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-ui-blue-500 mr-3 flex-shrink-0" />
                            <div className="w-full">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-600">
                                  {event.attendees} / {event.capacity} registered
                                </span>
                                {event.attendees / event.capacity > 0.8 && (
                                  <span className="text-sm text-orange-600 font-medium">
                                    Almost Full!
                                  </span>
                                )}
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    event.attendees / event.capacity > 0.8 ? "bg-orange-500" : "bg-ui-blue-500"
                                  }`}
                                  style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full bg-ui-blue-500 hover:bg-ui-blue-600">
                          Register Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col md:flex-row"
                    >
                      <div className="md:w-1/4 h-48 md:h-auto relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-ui-blue-500 text-white py-1 px-3 text-sm font-medium">
                          {event.date}
                        </div>
                      </div>
                      <div className="p-6 md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <div className="ml-3 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {event.category === "documentation" ? "Documentation" :
                               event.category === "loans" ? "Loans" : "Financial Planning"}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center">
                              <CalendarCheck className="h-5 w-5 text-ui-blue-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-ui-blue-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-5 w-5 text-ui-blue-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{event.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">
                              {event.attendees} / {event.capacity} registered
                              {event.attendees / event.capacity > 0.8 && (
                                <span className="ml-2 text-orange-600 font-medium">
                                  Almost Full!
                                </span>
                              )}
                            </div>
                            <div className="w-36 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  event.attendees / event.capacity > 0.8 ? "bg-orange-500" : "bg-ui-blue-500"
                                }`}
                                style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <Button className="bg-ui-blue-500 hover:bg-ui-blue-600">Register Now</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredEvents.length > 0 && (
                <div className="mt-12 text-center">
                  <Button variant="outline" size="lg">
                    Load More Events
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Host Your Own Event</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-4">
                    Are you interested in hosting an event at one of our branches? We offer our facilities for community-focused workshops, seminars, and networking events.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="bg-ui-blue-100 p-1 rounded-full mr-2 mt-1">
                        <Check className="h-4 w-4 text-ui-blue-600" />
                      </div>
                      <span>Modern facilities with audiovisual equipment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-ui-blue-100 p-1 rounded-full mr-2 mt-1">
                        <Check className="h-4 w-4 text-ui-blue-600" />
                      </div>
                      <span>Centrally located branches across the district</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-ui-blue-100 p-1 rounded-full mr-2 mt-1">
                        <Check className="h-4 w-4 text-ui-blue-600" />
                      </div>
                      <span>Support staff available to assist with setup</span>
                    </li>
                  </ul>
                  <Button asChild className="bg-ui-blue-500 hover:bg-ui-blue-600">
                    <a href="/contact">Contact Us About Hosting</a>
                  </Button>
                </div>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Event Space Image</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;

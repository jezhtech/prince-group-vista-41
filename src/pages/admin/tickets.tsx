import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PlusCircle, Edit, Trash2, Download, QrCode, Eye, Ticket, Calendar, CreditCard, Tag, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ticketTypes = [
  {
    id: 1,
    name: "Early Bird",
    price: 599,
    available: 0,
    sold: 250,
    total: 250,
    color: "bg-prince-green",
    status: "Sold Out",
    startDate: "Jan 15, 2023",
    endDate: "Feb 28, 2023",
    features: ["General admission", "Swag bag", "Access to all sessions"]
  },
  {
    id: 2,
    name: "Regular",
    price: 999,
    available: 125,
    sold: 375,
    total: 500,
    color: "bg-ui-blue-500",
    status: "On Sale",
    startDate: "Mar 1, 2023",
    endDate: "Jun 10, 2023",
    features: ["General admission", "Swag bag", "Access to all sessions", "Lunch included"]
  },
  {
    id: 3,
    name: "VIP",
    price: 2999,
    available: 42,
    sold: 108,
    total: 150,
    color: "bg-purple-500",
    status: "On Sale",
    startDate: "Jan 15, 2023",
    endDate: "Jun 10, 2023",
    features: ["VIP seating", "Exclusive swag bag", "Access to all sessions", "Lunch & dinner included", "Private networking event", "Speaker meet & greet"]
  },
  {
    id: 4,
    name: "Workshop",
    price: 1499,
    available: 50,
    sold: 50,
    total: 100,
    color: "bg-orange-500",
    status: "On Sale",
    startDate: "Mar 15, 2023",
    endDate: "Jun 10, 2023",
    features: ["Workshop access", "Practical sessions", "Workshop materials", "Certificate of completion"]
  }
];

const recentTickets = [
  { id: "TK-3845", name: "Rajesh Kumar", email: "rajesh.kumar@example.com", type: "VIP", date: "May 5, 2023", amount: "₹2,999", status: "Confirmed" },
  { id: "TK-3844", name: "Priya Sharma", email: "priya.sharma@example.com", type: "Regular", date: "May 4, 2023", amount: "₹999", status: "Confirmed" },
  { id: "TK-3843", name: "Suresh Patel", email: "suresh.patel@example.com", type: "Early Bird", date: "May 3, 2023", amount: "₹599", status: "Confirmed" },
  { id: "TK-3842", name: "Anita Singh", email: "anita.singh@example.com", type: "Workshop", date: "May 2, 2023", amount: "₹1,499", status: "Pending" },
  { id: "TK-3841", name: "Vikram Mehta", email: "vikram.mehta@example.com", type: "Regular", date: "May 1, 2023", amount: "₹999", status: "Confirmed" },
];

const TicketDesignPreview = () => (
  <div className="h-64 border border-dashed border-ui-gray-300 rounded-lg flex items-center justify-center p-4 relative overflow-hidden bg-gray-50">
    <div className="absolute top-0 left-0 right-0 h-12 bg-ui-blue-500 flex items-center px-4">
      <div className="text-white font-bold">Annual Developers Conference 2023</div>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-ui-blue-500 flex items-center justify-between px-4">
      <div className="text-white text-sm">June 15-16, 2023</div>
      <div className="text-white text-sm">Nagercoil Convention Center</div>
    </div>
    
    <div className="flex gap-4 items-center">
      <div className="h-24 w-24 bg-white p-2 rounded-lg border border-ui-gray-200 flex items-center justify-center">
        <QrCode className="h-16 w-16 text-ui-gray-400" />
      </div>
      <div>
        <div className="text-xs text-ui-gray-500">TICKET TYPE</div>
        <div className="text-lg font-bold mb-1">VIP PASS</div>
        <div className="text-xs text-ui-gray-500">ATTENDEE</div>
        <div className="text-sm">John Smith</div>
      </div>
    </div>
    
    <div className="absolute top-4 right-4 bg-prince-green text-white text-xs font-bold px-2 py-1 rounded">
      #TK-0001
    </div>
  </div>
);

const TicketTypeForm = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Ticket Name</Label>
        <Input id="name" placeholder="e.g. Early Bird, VIP, etc." defaultValue="Regular Ticket" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price (₹)</Label>
        <Input id="price" type="number" defaultValue="999" />
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input id="startDate" type="date" defaultValue="2023-03-01" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <Input id="endDate" type="date" defaultValue="2023-06-10" />
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity Available</Label>
        <Input id="quantity" type="number" defaultValue="500" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <Select defaultValue="blue">
          <SelectTrigger>
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="features">Features (one per line)</Label>
      <textarea 
        id="features" 
        className="w-full min-h-24 p-2 border border-ui-gray-200 rounded-md"
        defaultValue="General admission
Swag bag
Access to all sessions
Lunch included"
      ></textarea>
    </div>
    
    <div className="flex items-center space-x-2">
      <Switch id="active" defaultChecked />
      <Label htmlFor="active">Ticket is currently on sale</Label>
    </div>
  </div>
);

const AdminTickets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Ticket Management</h1>
          <p className="text-ui-gray-500 flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-2" /> 
            Annual Developers Conference 2023
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" /> Create Ticket Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Ticket Type</DialogTitle>
              <DialogDescription>
                Add a new ticket type for your event. Configure pricing, availability, and features.
              </DialogDescription>
            </DialogHeader>
            <TicketTypeForm />
            <DialogFooter className="mt-6">
              <Button variant="outline">Cancel</Button>
              <Button>Save Ticket Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="types" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="types">Ticket Types</TabsTrigger>
          <TabsTrigger value="sales">Ticket Sales</TabsTrigger>
          <TabsTrigger value="design">Ticket Design</TabsTrigger>
        </TabsList>
        
        <TabsContent value="types" className="animate-fade-in">
          <div className="grid grid-cols-1 gap-6">
            {ticketTypes.map(ticket => (
              <Card key={ticket.id} className="overflow-hidden">
                <div className={`h-1.5 w-full ${ticket.color}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{ticket.name}</CardTitle>
                      <CardDescription>₹{ticket.price.toLocaleString()} • {ticket.startDate} to {ticket.endDate}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Edit Ticket Type</DialogTitle>
                            <DialogDescription>
                              Modify this ticket type for your event.
                            </DialogDescription>
                          </DialogHeader>
                          <TicketTypeForm />
                          <DialogFooter className="mt-6">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-ui-gray-500 mb-1">Status</div>
                        <Badge 
                          className={ticket.status === "Sold Out" ? "bg-red-100 text-red-800 hover:bg-red-100" : "bg-green-100 text-green-800 hover:bg-green-100"}
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-ui-gray-500 mb-1">Sales</div>
                        <div className="flex items-center">
                          <div className="font-medium">{ticket.sold} / {ticket.total}</div>
                          <div className="text-sm text-ui-gray-500 ml-2">
                            ({Math.round((ticket.sold / ticket.total) * 100)}% sold)
                          </div>
                        </div>
                        <div className="w-full bg-ui-gray-100 h-2 rounded-full mt-1">
                          <div 
                            className={`h-2 rounded-full ${ticket.color}`} 
                            style={{ width: `${(ticket.sold / ticket.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <div className="text-sm font-medium text-ui-gray-500 mb-1">Features</div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {ticket.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <div className={`w-1.5 h-1.5 rounded-full ${ticket.color} mr-2`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="text-sm text-ui-gray-500">
                    <span className="font-medium">{ticket.sold}</span> tickets sold • 
                    <span className="font-medium ml-1">₹{(ticket.price * ticket.sold).toLocaleString()}</span> revenue
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" /> View Attendees
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="animate-fade-in space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Recent Ticket Sales</CardTitle>
                  <CardDescription>Browse and manage ticket registrations</CardDescription>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ui-gray-400" />
                    <Input
                      placeholder="Search tickets..."
                      className="pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ui-gray-200">
                      <th className="text-left p-4 font-medium text-ui-gray-500">Ticket ID</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Name</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Ticket Type</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Purchase Date</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Amount</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Status</th>
                      <th className="text-right p-4 font-medium text-ui-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-ui-gray-100 hover:bg-ui-gray-50">
                        <td className="p-4 font-medium">{ticket.id}</td>
                        <td className="p-4">
                          <div>{ticket.name}</div>
                          <div className="text-sm text-ui-gray-500">{ticket.email}</div>
                        </td>
                        <td className="p-4">
                          <Badge className={
                            ticket.type === 'VIP' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' :
                            ticket.type === 'Early Bird' ? 'bg-prince-light text-prince-green hover:bg-prince-light' :
                            ticket.type === 'Workshop' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' :
                            'bg-blue-100 text-blue-800 hover:bg-blue-100'
                          }>
                            {ticket.type}
                          </Badge>
                        </td>
                        <td className="p-4 text-ui-gray-500">{ticket.date}</td>
                        <td className="p-4 font-medium">{ticket.amount}</td>
                        <td className="p-4">
                          <Badge className={
                            ticket.status === 'Confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                            'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          }>
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Ticket className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="justify-between py-4">
              <div className="text-sm text-ui-gray-500">
                Showing 5 of 783 tickets
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ticket Sales Summary</CardTitle>
              <CardDescription>Overview of all ticket sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-ui-blue-100 flex items-center justify-center mr-2">
                      <Ticket className="h-4 w-4 text-ui-blue-600" />
                    </div>
                    <div className="text-sm text-ui-gray-500">Total Tickets</div>
                  </div>
                  <div className="text-2xl font-bold">783</div>
                  <div className="text-sm text-green-500">+12% from last week</div>
                </div>
                
                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <CreditCard className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-sm text-ui-gray-500">Revenue</div>
                  </div>
                  <div className="text-2xl font-bold">₹6,60,000</div>
                  <div className="text-sm text-green-500">+15% from last week</div>
                </div>
                
                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                      <Tag className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-sm text-ui-gray-500">Avg. Ticket Price</div>
                  </div>
                  <div className="text-2xl font-bold">₹843</div>
                  <div className="text-sm text-green-500">+3% from last week</div>
                </div>
                
                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                      <Users className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="text-sm text-ui-gray-500">Available</div>
                  </div>
                  <div className="text-2xl font-bold">217</div>
                  <div className="text-sm text-ui-gray-500">of 1,000 capacity</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="design" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Design</CardTitle>
                <CardDescription>Customize how your tickets look</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" defaultValue="Annual Developers Conference 2023" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-ui-blue-500 rounded-md mr-2"></div>
                      <Input id="primaryColor" defaultValue="#3366FF" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-prince-green rounded-md mr-2"></div>
                      <Input id="secondaryColor" defaultValue="#4EB4A7" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input id="venue" defaultValue="Nagercoil Convention Center" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" defaultValue="2023-06-15" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" defaultValue="2023-06-16" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Event Logo</Label>
                  <div className="flex items-center">
                    <div className="h-12 w-12 border border-ui-gray-200 rounded-md flex items-center justify-center mr-2">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#3366FF"/>
                      </svg>
                    </div>
                    <Button variant="outline">Change Logo</Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="showQrCode" defaultChecked />
                  <Label htmlFor="showQrCode">Include QR code on ticket</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="showTicketID" defaultChecked />
                  <Label htmlFor="showTicketID">Show ticket ID</Label>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline">Reset to Default</Button>
                <Button>Save Design</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>How your ticket will look</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketDesignPreview />
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" /> Download Template
                </Button>
                <Button>
                  <Eye className="h-4 w-4 mr-2" /> Test Email
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTickets; 
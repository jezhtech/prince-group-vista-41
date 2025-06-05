import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Users, 
  Ticket, 
  CreditCard, 
  TrendingUp, 
  UserPlus, 
  BarChart3, 
  Calendar, 
  ArrowRight,
  Download,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with event info and quick stats */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
    <div>
            <h1 className="text-2xl font-bold text-ui-gray-900">Annual Developers Conference 2023</h1>
            <p className="text-ui-gray-500 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2" /> 
              June 15-16, 2023 • Nagercoil Convention Center
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Active Event
            </span>
            <Button variant="outline" size="sm" className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh Data
            </Button>
          </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-ui-blue-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ui-gray-500 flex items-center">
                <Ticket className="h-4 w-4 mr-2 text-ui-blue-500" /> Total Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-bold text-ui-gray-900">783</div>
              <p className="text-xs flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">+12% from last week</span>
              </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-ui-gray-900">1,000</div>
                  <div className="text-xs text-ui-gray-500">Capacity</div>
                </div>
              </div>
              <Progress className="h-2 mt-3" value={78.3} />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-prince-light to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ui-gray-500 flex items-center">
                <UserPlus className="h-4 w-4 mr-2 text-prince-green" /> Membership Signups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-bold text-ui-gray-900">245</div>
                  <p className="text-xs flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">+8% from last week</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-ui-gray-900">31.3%</div>
                  <div className="text-xs text-ui-gray-500">Conversion</div>
                </div>
      </div>
              <Progress className="h-2 mt-3 bg-green-100" value={31.3} />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ui-gray-500 flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-orange-500" /> Ticket Revenue
              </CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex justify-between items-end">
                  <div>
                  <div className="text-3xl font-bold text-ui-gray-900">₹4,15,000</div>
                  <p className="text-xs flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">+15% from target</span>
                  </p>
                  </div>
                  <div className="text-right">
                  <div className="text-sm font-medium text-ui-gray-900">₹5,30</div>
                  <div className="text-xs text-ui-gray-500">Avg. Ticket</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ui-gray-500 flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-500" /> Membership Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-bold text-ui-gray-900">₹2,45,000</div>
                  <p className="text-xs flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">+5% from target</span>
                    </p>
                  </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-ui-gray-900">₹1,000</div>
                  <div className="text-xs text-ui-gray-500">Avg. Signup</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Ticket breakdown and analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Ticket Sales Breakdown</CardTitle>
              <CardDescription>Distribution by ticket type and sales over time</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-80 w-full">
              <div className="flex justify-center items-center h-full">
                <BarChart3 className="h-16 w-16 text-ui-gray-300" />
                <div className="ml-4">
                  <p className="text-ui-gray-500">Bar chart visualization would go here</p>
                  <p className="text-ui-gray-400 text-sm">Showing ticket sales trends over time</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-auto">
          <CardHeader>
            <CardTitle>Ticket Types</CardTitle>
            <CardDescription>Current sales by ticket category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { name: "Early Bird", count: 250, total: 250, percent: 100, color: "bg-prince-green" },
                { name: "Regular", count: 375, total: 500, percent: 75, color: "bg-ui-blue-500" },
                { name: "VIP", count: 108, total: 150, percent: 72, color: "bg-purple-500" },
                { name: "Workshop", count: 50, total: 100, percent: 50, color: "bg-orange-500" },
              ].map((type, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-sm text-ui-gray-500">
                        {type.count} / {type.total} sold
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{type.percent}%</div>
                      <div className={`text-sm ${type.percent === 100 ? 'text-prince-green' : 'text-ui-gray-500'}`}>
                        {type.percent === 100 ? 'Sold out' : 'Available'}
                      </div>
                  </div>
                  </div>
                  <Progress 
                    className={`h-2 ${type.percent === 100 ? 'bg-prince-green/20' : 'bg-ui-gray-100'}`} 
                    value={type.percent} 
                    />
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full mt-6 text-ui-blue-600">
              Manage Ticket Types <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent registrations and membership */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="mb-6 bg-ui-gray-100">
          <TabsTrigger value="recent">Recent Registrations</TabsTrigger>
          <TabsTrigger value="members">New Members</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Breakdown</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4 animate-fade-in">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ui-gray-200">
                      <th className="text-left p-4 font-medium text-ui-gray-500">Name</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Ticket Type</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Purchase Date</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Amount</th>
                      <th className="text-right p-4 font-medium text-ui-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Rajesh Kumar", email: "rajesh.kumar@example.com", type: "VIP", date: "May 5, 2023", amount: "₹2,999", status: "Confirmed" },
                      { name: "Priya Sharma", email: "priya.sharma@example.com", type: "Regular", date: "May 4, 2023", amount: "₹999", status: "Confirmed" },
                      { name: "Suresh Patel", email: "suresh.patel@example.com", type: "Early Bird", date: "May 3, 2023", amount: "₹599", status: "Confirmed" },
                      { name: "Anita Singh", email: "anita.singh@example.com", type: "Workshop", date: "May 2, 2023", amount: "₹1,499", status: "Pending" },
                      { name: "Vikram Mehta", email: "vikram.mehta@example.com", type: "Regular", date: "May 1, 2023", amount: "₹999", status: "Confirmed" },
                    ].map((registration, index) => (
                      <tr key={index} className="border-b border-ui-gray-100 hover:bg-ui-gray-50">
                        <td className="p-4">
                          <div className="font-medium">{registration.name}</div>
                          <div className="text-sm text-ui-gray-500">{registration.email}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            registration.type === 'VIP' ? 'bg-purple-100 text-purple-800' :
                            registration.type === 'Early Bird' ? 'bg-prince-light text-prince-green' :
                            registration.type === 'Workshop' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {registration.type}
                          </span>
                        </td>
                        <td className="p-4 text-ui-gray-500">{registration.date}</td>
                        <td className="p-4 font-medium">{registration.amount}</td>
                        <td className="p-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            registration.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {registration.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button variant="outline">View All Registrations</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="members" className="animate-fade-in">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ui-gray-200">
                      <th className="text-left p-4 font-medium text-ui-gray-500">Member</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Membership Type</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Joined Date</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Fee</th>
                      <th className="text-right p-4 font-medium text-ui-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Rajesh Kumar", email: "rajesh.kumar@example.com", type: "Premium", date: "May 5, 2023", amount: "₹1,999", status: "Active" },
                      { name: "Priya Sharma", email: "priya.sharma@example.com", type: "Basic", date: "May 4, 2023", amount: "₹999", status: "Active" },
                      { name: "Suresh Patel", email: "suresh.patel@example.com", type: "VIP", date: "May 3, 2023", amount: "₹2,999", status: "Active" },
                      { name: "Anita Singh", email: "anita.singh@example.com", type: "Basic", date: "May 2, 2023", amount: "₹999", status: "Pending" },
                    ].map((member, index) => (
                      <tr key={index} className="border-b border-ui-gray-100 hover:bg-ui-gray-50">
                        <td className="p-4">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-ui-gray-500">{member.email}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.type === 'VIP' ? 'bg-purple-100 text-purple-800' :
                            member.type === 'Premium' ? 'bg-prince-light text-prince-green' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {member.type}
                          </span>
                        </td>
                        <td className="p-4 text-ui-gray-500">{member.date}</td>
                        <td className="p-4 font-medium">{member.amount}</td>
                        <td className="p-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
          <CardHeader>
                <CardTitle>Revenue by Source</CardTitle>
                <CardDescription>Breakdown of event income</CardDescription>
          </CardHeader>
          <CardContent>
                <div className="h-64 flex justify-center items-center">
                  <div className="text-center">
                    <div className="text-ui-gray-400 mb-2">Pie chart visualization would go here</div>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-ui-blue-500 rounded-full mr-2"></div>
                        <span>Tickets (63%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-prince-green rounded-full mr-2"></div>
                        <span>Membership (37%)</span>
                      </div>
                  </div>
                  </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>All income from the event</CardDescription>
          </CardHeader>
          <CardContent>
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="text-4xl font-bold mb-2">₹6,60,000</div>
                  <div className="text-ui-gray-500 mb-6">Total event revenue</div>
                  
                  <div className="w-full space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ticket Revenue</span>
                        <span className="font-medium">₹4,15,000</span>
                      </div>
                      <Progress value={63} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Membership Revenue</span>
                        <span className="font-medium">₹2,45,000</span>
                      </div>
                      <Progress value={37} className="h-2 bg-prince-light" />
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-6">
                    <Download className="h-4 w-4 mr-2" /> Export Report
                  </Button>
            </div>
          </CardContent>
        </Card>
      </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

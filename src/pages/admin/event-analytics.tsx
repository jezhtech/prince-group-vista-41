import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Calendar,
  ChevronDown,
  Download,
  BarChart3,
  LineChart,
  PieChart,
  Users,
  MapPin,
  Clock,
  Filter,
  FileSpreadsheet
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EventAnalytics = () => {
  const [timeRange, setTimeRange] = useState("7days");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Event Analytics</h1>
          <p className="text-ui-gray-500 flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-2" /> 
            Annual Developers Conference 2023
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Registrations",
            value: "783",
            change: "+12%",
            trend: "up",
            target: "1,000",
            percent: 78,
            color: "bg-ui-blue-500"
          },
          {
            title: "Conversion Rate",
            value: "32.5%",
            change: "+2.1%",
            trend: "up",
            target: "Target: 30%",
            percent: 108,
            color: "bg-prince-green"
          },
          {
            title: "Average Order Value",
            value: "₹1,250",
            change: "+₹150",
            trend: "up",
            target: "Target: ₹1,000",
            percent: 125,
            color: "bg-purple-500"
          },
          {
            title: "Ticket Sales",
            value: "₹6,60,000",
            change: "+15%",
            trend: "up",
            target: "Target: ₹5,00,000",
            percent: 132,
            color: "bg-orange-500"
          }
        ].map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ui-gray-500">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-green-500 mt-1">
                  {metric.change} from previous period
                </p>
                
                <div className="mt-4 flex items-center justify-between text-xs text-ui-gray-500">
                  <span>{metric.target}</span>
                  <span>{metric.percent}%</span>
                </div>
                <Progress 
                  className="h-1.5 mt-1"
                  value={Math.min(metric.percent, 100)} 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main Analytics Tabs */}
      <Tabs defaultValue="registration" className="w-full">
        <TabsList className="mb-6 bg-ui-gray-100">
          <TabsTrigger value="registration">Registration Trends</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registration" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Registration Trends</CardTitle>
                    <CardDescription>Daily registrations over time</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-80 w-full">
                  <div className="flex justify-center items-center h-full">
                    <LineChart className="h-16 w-16 text-ui-gray-300" />
                    <div className="ml-4">
                      <p className="text-ui-gray-500">Line chart visualization would go here</p>
                      <p className="text-ui-gray-400 text-sm">Showing registration trends over time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Registration Breakdown</CardTitle>
                <CardDescription>By ticket type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex justify-center items-center mb-4">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 mx-auto text-ui-gray-300 mb-4" />
                    <div className="text-ui-gray-400 mb-2">Pie chart visualization would go here</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Early Bird", count: 250, color: "bg-prince-green", percent: 32 },
                    { name: "Regular", count: 375, color: "bg-ui-blue-500", percent: 48 },
                    { name: "VIP", count: 108, color: "bg-purple-500", percent: 14 },
                    { name: "Workshop", count: 50, color: "bg-orange-500", percent: 6 }
                  ].map((type, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${type.color}`}></div>
                        <span>{type.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-ui-gray-700">{type.count}</span>
                        <span className="text-ui-gray-400 ml-1">({type.percent}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Registration Milestones</CardTitle>
                    <CardDescription>Key metrics and achievements</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-ui-gray-500 text-sm">Peak Registration Day</div>
                    <div className="font-bold text-lg">May 15, 2023</div>
                    <div className="text-ui-gray-500 text-sm">78 registrations</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-ui-gray-500 text-sm">Days to Sellout</div>
                    <div className="font-bold text-lg">Early Bird: 3 days</div>
                    <div className="text-ui-gray-500 text-sm">VIP: 45% remaining</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-ui-gray-500 text-sm">Time to Convert</div>
                    <div className="font-bold text-lg">1.5 days (avg.)</div>
                    <div className="text-ui-gray-500 text-sm">From first visit to registration</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="demographics" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendee Demographics</CardTitle>
                <CardDescription>Breakdown of registrants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-ui-gray-500 mb-4">Age Groups</h3>
                    <div className="space-y-3">
                      {[
                        { name: "18-24", percent: 15 },
                        { name: "25-34", percent: 42 },
                        { name: "35-44", percent: 28 },
                        { name: "45-54", percent: 10 },
                        { name: "55+", percent: 5 }
                      ].map((group, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{group.name}</span>
                            <span>{group.percent}%</span>
                          </div>
                          <Progress value={group.percent} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-ui-gray-500 mb-4">Gender Distribution</h3>
                    <div className="h-40 flex justify-center items-center">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 mx-auto text-ui-gray-300 mb-2" />
                        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-ui-blue-500 rounded-full mr-2"></div>
                            <span>Male (65%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-prince-green rounded-full mr-2"></div>
                            <span>Female (35%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-ui-gray-500 mb-4">Professional Background</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { role: "Developer", count: 385, percent: 49 },
                      { role: "Designer", count: 124, percent: 16 },
                      { role: "Manager", count: 96, percent: 12 },
                      { role: "Student", count: 98, percent: 13 },
                      { role: "Founder", count: 42, percent: 5 },
                      { role: "Other", count: 38, percent: 5 }
                    ].map((role, index) => (
                      <div key={index} className="bg-ui-gray-50 rounded-lg p-3">
                        <div className="font-medium">{role.role}</div>
                        <div className="text-sm text-ui-gray-500">{role.count} attendees</div>
                        <div className="text-xs text-ui-gray-400">{role.percent}% of total</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Where attendees are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex justify-center items-center mb-6">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 mx-auto text-ui-gray-300 mb-4" />
                    <div className="text-ui-gray-400">Map visualization would go here</div>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-ui-gray-500 mb-3">Top Locations</h3>
                <div className="space-y-3">
                  {[
                    { city: "Nagercoil", count: 245, percent: 31 },
                    { city: "Chennai", count: 156, percent: 20 },
                    { city: "Bangalore", count: 98, percent: 13 },
                    { city: "Kanyakumari", count: 87, percent: 11 },
                    { city: "Trivandrum", count: 65, percent: 8 }
                  ].map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-ui-gray-700">{index + 1}.</div>
                        <div className="ml-2">{location.city}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-ui-gray-700">{location.count}</span>
                        <span className="text-ui-gray-400 ml-1">({location.percent}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Registration Source</CardTitle>
                <CardDescription>How attendees found the event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <div className="flex justify-center items-center h-full">
                    <BarChart3 className="h-16 w-16 text-ui-gray-300" />
                    <div className="ml-4">
                      <p className="text-ui-gray-500">Bar chart visualization would go here</p>
                      <p className="text-ui-gray-400 text-sm">Showing traffic source data</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Referral Channels</CardTitle>
                <CardDescription>Traffic breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {[
                    { name: "Direct", count: 284, percent: 36, color: "bg-prince-green" },
                    { name: "Social Media", count: 195, percent: 25, color: "bg-ui-blue-500" },
                    { name: "Email", count: 156, percent: 20, color: "bg-purple-500" },
                    { name: "Search", count: 98, percent: 13, color: "bg-orange-500" },
                    { name: "Referral", count: 50, percent: 6, color: "bg-red-500" }
                  ].map((channel, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{channel.name}</div>
                        <div className="text-right">
                          <div className="font-medium">{channel.percent}%</div>
                          <div className="text-sm text-ui-gray-500">{channel.count} registrations</div>
                        </div>
                      </div>
                      <Progress 
                        className={`h-2 bg-ui-gray-100`}
                        value={channel.percent} 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Campaign Performance</CardTitle>
                <CardDescription>Effectiveness of marketing efforts</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-ui-gray-200">
                        <th className="text-left p-4 font-medium text-ui-gray-500">Campaign</th>
                        <th className="text-left p-4 font-medium text-ui-gray-500">Platform</th>
                        <th className="text-left p-4 font-medium text-ui-gray-500">Clicks</th>
                        <th className="text-left p-4 font-medium text-ui-gray-500">Registrations</th>
                        <th className="text-left p-4 font-medium text-ui-gray-500">Conversion</th>
                        <th className="text-left p-4 font-medium text-ui-gray-500">Cost per Reg.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Early Bird Promo", platform: "Email", clicks: 1245, regs: 156, conv: "12.5%", cost: "₹32" },
                        { name: "Developer Conference", platform: "Facebook", clicks: 856, regs: 98, conv: "11.4%", cost: "₹45" },
                        { name: "Tech Meetup", platform: "LinkedIn", clicks: 758, regs: 87, conv: "11.5%", cost: "₹38" },
                        { name: "Annual Conference", platform: "Instagram", clicks: 542, regs: 45, conv: "8.3%", cost: "₹56" },
                        { name: "Workshop Promo", platform: "Google", clicks: 425, regs: 36, conv: "8.5%", cost: "₹42" }
                      ].map((campaign, index) => (
                        <tr key={index} className="border-b border-ui-gray-100 hover:bg-ui-gray-50">
                          <td className="p-4 font-medium">{campaign.name}</td>
                          <td className="p-4 text-ui-gray-500">{campaign.platform}</td>
                          <td className="p-4">{campaign.clicks}</td>
                          <td className="p-4">{campaign.regs}</td>
                          <td className="p-4">{campaign.conv}</td>
                          <td className="p-4">{campaign.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Revenue Over Time</CardTitle>
                    <CardDescription>Daily revenue from all sources</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-80 w-full">
                  <div className="flex justify-center items-center h-full">
                    <LineChart className="h-16 w-16 text-ui-gray-300" />
                    <div className="ml-4">
                      <p className="text-ui-gray-500">Line chart visualization would go here</p>
                      <p className="text-ui-gray-400 text-sm">Showing revenue trends over time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>By ticket type and membership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex justify-center items-center mb-4">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 mx-auto text-ui-gray-300 mb-4" />
                    <div className="text-ui-gray-400 mb-2">Pie chart visualization would go here</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Early Bird Tickets", amount: "₹1,50,000", color: "bg-prince-green", percent: 23 },
                    { name: "Regular Tickets", amount: "₹3,75,000", color: "bg-ui-blue-500", percent: 57 },
                    { name: "VIP Tickets", amount: "₹3,24,000", color: "bg-purple-500", percent: 49 },
                    { name: "Workshop Tickets", amount: "₹75,000", color: "bg-orange-500", percent: 11 },
                    { name: "Membership Fees", amount: "₹2,45,000", color: "bg-red-500", percent: 37 }
                  ].map((type, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${type.color}`}></div>
                        <span>{type.name}</span>
                      </div>
                      <div className="text-right font-medium">
                        {type.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
                <CardDescription>Key financial indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-ui-gray-50 rounded-lg p-5 text-center">
                    <div className="text-sm text-ui-gray-500 mb-1">Total Revenue</div>
                    <div className="text-3xl font-bold mb-1">₹6,60,000</div>
                    <div className="text-sm text-green-500">+32% vs Target</div>
                  </div>
                  
                  <div className="bg-ui-gray-50 rounded-lg p-5 text-center">
                    <div className="text-sm text-ui-gray-500 mb-1">Average Ticket Price</div>
                    <div className="text-3xl font-bold mb-1">₹1,250</div>
                    <div className="text-sm text-green-500">+25% vs Target</div>
                  </div>
                  
                  <div className="bg-ui-gray-50 rounded-lg p-5 text-center">
                    <div className="text-sm text-ui-gray-500 mb-1">Revenue per Attendee</div>
                    <div className="text-3xl font-bold mb-1">₹1,685</div>
                    <div className="text-sm text-green-500">+12% vs Target</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-ui-gray-500 mb-3">Revenue Timeline</h3>
                  <div className="flex items-center relative">
                    <div className="absolute left-0 right-0 h-0.5 bg-ui-gray-200"></div>
                    
                    {[
                      { date: "Jan 15", label: "Event Announced", revenue: "₹0" },
                      { date: "Feb 1", label: "Early Bird Opens", revenue: "₹1,50,000" },
                      { date: "Mar 15", label: "Regular Sales", revenue: "₹3,75,000" },
                      { date: "May 1", label: "Final Push", revenue: "₹6,60,000" },
                      { date: "Jun 15", label: "Event Day", revenue: "₹6,60,000" }
                    ].map((milestone, index) => (
                      <div key={index} className="flex-1 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-prince-green rounded-full"></div>
                        <div className="mt-6 text-center">
                          <div className="text-xs text-ui-gray-500">{milestone.date}</div>
                          <div className="text-sm font-medium">{milestone.label}</div>
                          <div className="text-xs">{milestone.revenue}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventAnalytics; 
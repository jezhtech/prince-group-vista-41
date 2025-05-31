import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar,
  Download,
  LineChart,
  BarChart3,
  CreditCard,
  ReceiptText,
  ArrowUp,
  ArrowDown,
  Filter,
  FileSpreadsheet,
  ChevronRight,
  PlusCircle
} from "lucide-react";

const AdminRevenue = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [reportType, setReportType] = useState("detailed");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Revenue Management</h1>
          <p className="text-ui-gray-500 flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-2" /> 
            Annual Developers Conference 2023
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Revenue",
            value: "₹6,60,000",
            change: "+15%",
            trend: "up",
            icon: <CreditCard className="h-5 w-5 text-white" />,
            color: "bg-ui-blue-500",
          },
          {
            title: "Ticket Revenue",
            value: "₹4,15,000",
            change: "+12%",
            trend: "up",
            icon: <ReceiptText className="h-5 w-5 text-white" />,
            color: "bg-prince-green",
          },
          {
            title: "Membership Revenue",
            value: "₹2,45,000",
            change: "+8%",
            trend: "up",
            icon: <ReceiptText className="h-5 w-5 text-white" />,
            color: "bg-purple-500",
          },
          {
            title: "Avg. Transaction",
            value: "₹1,250",
            change: "+3%",
            trend: "up",
            icon: <CreditCard className="h-5 w-5 text-white" />,
            color: "bg-orange-500",
          },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-ui-gray-500">
                {item.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${item.color}`}>{item.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs flex items-center mt-1">
                {item.trend === "up" ? (
                  <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                )}
                <span
                  className={
                    item.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {item.change} from previous period
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Revenue Breakdown</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Daily revenue from all sources</CardDescription>
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
                      <p className="text-ui-gray-400 text-sm">Showing revenue trends over time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
                <CardDescription>Breakdown by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex justify-center items-center mb-4">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto text-ui-gray-300 mb-4" />
                    <div className="text-ui-gray-400 mb-2">Pie chart visualization would go here</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: "Early Bird Tickets", amount: "₹1,50,000", percent: 23 },
                    { name: "Regular Tickets", amount: "₹3,75,000", percent: 57 },
                    { name: "VIP Tickets", amount: "₹1,35,000", percent: 20 },
                    { name: "Premium Membership", amount: "₹1,70,000", percent: 26 },
                    { name: "Basic Membership", amount: "₹75,000", percent: 11 },
                  ].map((source, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">{source.name}</div>
                        <div className="font-medium">{source.amount}</div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-ui-gray-500">
                        <div>{source.percent}% of total</div>
                      </div>
                      <Progress value={source.percent} className="h-1.5" />
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
                  <div className="bg-ui-gray-50 rounded-lg p-5 space-y-2">
                    <div className="text-sm text-ui-gray-500">Revenue Per Attendee</div>
                    <div className="text-2xl font-bold">₹843</div>
                    <div className="text-sm text-green-500">+5% from target</div>
                    <div className="text-sm text-ui-gray-500">Target: ₹800</div>
                  </div>
                  
                  <div className="bg-ui-gray-50 rounded-lg p-5 space-y-2">
                    <div className="text-sm text-ui-gray-500">Conversion Rate</div>
                    <div className="text-2xl font-bold">32.5%</div>
                    <div className="text-sm text-green-500">+7.5% from target</div>
                    <div className="text-sm text-ui-gray-500">Target: 25%</div>
                  </div>
                  
                  <div className="bg-ui-gray-50 rounded-lg p-5 space-y-2">
                    <div className="text-sm text-ui-gray-500">Membership Attachment</div>
                    <div className="text-2xl font-bold">31.3%</div>
                    <div className="text-sm text-green-500">+6.3% from target</div>
                    <div className="text-sm text-ui-gray-500">Target: 25%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="breakdown" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Revenue</CardTitle>
                <CardDescription>Revenue from ticket sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm text-ui-gray-500">Total Ticket Revenue</div>
                      <div className="text-3xl font-bold">₹4,15,000</div>
                    </div>
                    <div className="text-sm text-ui-gray-500">
                      <span className="text-green-500 font-medium">+12%</span> from target
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-sm font-medium">By Ticket Type</div>
                    <table className="w-full text-sm">
                      <thead className="text-ui-gray-500 border-b">
                        <tr>
                          <th className="text-left py-2">Ticket Type</th>
                          <th className="text-right py-2">Sold</th>
                          <th className="text-right py-2">Price</th>
                          <th className="text-right py-2">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ui-gray-100">
                        <tr>
                          <td className="py-2">Early Bird</td>
                          <td className="text-right py-2">250</td>
                          <td className="text-right py-2">₹599</td>
                          <td className="text-right py-2 font-medium">₹1,49,750</td>
                        </tr>
                        <tr>
                          <td className="py-2">Regular</td>
                          <td className="text-right py-2">375</td>
                          <td className="text-right py-2">₹999</td>
                          <td className="text-right py-2 font-medium">₹3,74,625</td>
                        </tr>
                        <tr>
                          <td className="py-2">VIP</td>
                          <td className="text-right py-2">108</td>
                          <td className="text-right py-2">₹2,999</td>
                          <td className="text-right py-2 font-medium">₹3,23,892</td>
                        </tr>
                        <tr>
                          <td className="py-2">Workshop</td>
                          <td className="text-right py-2">50</td>
                          <td className="text-right py-2">₹1,499</td>
                          <td className="text-right py-2 font-medium">₹74,950</td>
                        </tr>
                      </tbody>
                      <tfoot className="border-t text-ui-gray-700 font-medium">
                        <tr>
                          <td className="py-2">Total</td>
                          <td className="text-right py-2">783</td>
                          <td className="text-right py-2">—</td>
                          <td className="text-right py-2 font-medium">₹9,23,217</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Membership Revenue</CardTitle>
                <CardDescription>Revenue from membership signups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm text-ui-gray-500">Total Membership Revenue</div>
                      <div className="text-3xl font-bold">₹2,45,000</div>
                    </div>
                    <div className="text-sm text-ui-gray-500">
                      <span className="text-green-500 font-medium">+8%</span> from target
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-sm font-medium">By Membership Type</div>
                    <table className="w-full text-sm">
                      <thead className="text-ui-gray-500 border-b">
                        <tr>
                          <th className="text-left py-2">Membership Type</th>
                          <th className="text-right py-2">Signups</th>
                          <th className="text-right py-2">Price</th>
                          <th className="text-right py-2">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ui-gray-100">
                        <tr>
                          <td className="py-2">Basic</td>
                          <td className="text-right py-2">120</td>
                          <td className="text-right py-2">₹999</td>
                          <td className="text-right py-2 font-medium">₹1,19,880</td>
                        </tr>
                        <tr>
                          <td className="py-2">Premium</td>
                          <td className="text-right py-2">85</td>
                          <td className="text-right py-2">₹1,999</td>
                          <td className="text-right py-2 font-medium">₹1,69,915</td>
                        </tr>
                        <tr>
                          <td className="py-2">VIP</td>
                          <td className="text-right py-2">40</td>
                          <td className="text-right py-2">₹2,999</td>
                          <td className="text-right py-2 font-medium">₹1,19,960</td>
                        </tr>
                      </tbody>
                      <tfoot className="border-t text-ui-gray-700 font-medium">
                        <tr>
                          <td className="py-2">Total</td>
                          <td className="text-right py-2">245</td>
                          <td className="text-right py-2">—</td>
                          <td className="text-right py-2 font-medium">₹4,09,755</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest financial activity</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ui-gray-200">
                      <th className="text-left p-4 font-medium text-ui-gray-500">Transaction ID</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Description</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Date</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Amount</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Payment Method</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "TXN-5842", description: "VIP Ticket - Rajesh Kumar", date: "May 5, 2023", amount: "₹2,999", method: "Credit Card", status: "Completed" },
                      { id: "TXN-5841", description: "Premium Membership - Priya Sharma", date: "May 4, 2023", amount: "₹1,999", method: "PayTM", status: "Completed" },
                      { id: "TXN-5840", description: "Regular Ticket - Suresh Patel", date: "May 3, 2023", amount: "₹999", method: "UPI", status: "Completed" },
                      { id: "TXN-5839", description: "Workshop Ticket - Anita Singh", date: "May 2, 2023", amount: "₹1,499", method: "Credit Card", status: "Pending" },
                      { id: "TXN-5838", description: "Basic Membership - Vikram Mehta", date: "May 1, 2023", amount: "₹999", method: "Net Banking", status: "Completed" },
                      { id: "TXN-5837", description: "Regular Ticket - Kiran Rao", date: "Apr 30, 2023", amount: "₹999", method: "UPI", status: "Completed" },
                      { id: "TXN-5836", description: "VIP Ticket - Neha Gupta", date: "Apr 29, 2023", amount: "₹2,999", method: "Credit Card", status: "Refunded" },
                      { id: "TXN-5835", description: "Early Bird Ticket - Amit Shah", date: "Apr 28, 2023", amount: "₹599", method: "Debit Card", status: "Completed" },
                    ].map((transaction, index) => (
                      <tr key={index} className="border-b border-ui-gray-100 hover:bg-ui-gray-50">
                        <td className="p-4 font-medium">{transaction.id}</td>
                        <td className="p-4">{transaction.description}</td>
                        <td className="p-4 text-ui-gray-500">{transaction.date}</td>
                        <td className="p-4 font-medium">{transaction.amount}</td>
                        <td className="p-4 text-ui-gray-500">{transaction.method}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <div className="p-4 border-t border-ui-gray-100 flex justify-between items-center">
              <div className="text-sm text-ui-gray-500">
                Showing 8 of 245 transactions
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="animate-fade-in">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Generate and download reports</CardDescription>
                  </div>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary Report</SelectItem>
                      <SelectItem value="detailed">Detailed Report</SelectItem>
                      <SelectItem value="tax">Tax Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { 
                      title: "Revenue Summary Report", 
                      description: "Complete overview of all revenue streams", 
                      formats: ["PDF", "Excel", "CSV"],
                      updated: "May 5, 2023"
                    },
                    { 
                      title: "Ticket Sales Report", 
                      description: "Detailed breakdown of all ticket sales", 
                      formats: ["PDF", "Excel", "CSV"],
                      updated: "May 5, 2023"
                    },
                    { 
                      title: "Membership Revenue Report", 
                      description: "Analysis of membership sign-ups and revenue", 
                      formats: ["PDF", "Excel", "CSV"],
                      updated: "May 5, 2023"
                    },
                    { 
                      title: "Transaction History", 
                      description: "Complete log of all financial transactions", 
                      formats: ["PDF", "Excel", "CSV"],
                      updated: "May 5, 2023"
                    },
                    { 
                      title: "Tax Summary Report", 
                      description: "Tax breakdown for accounting purposes", 
                      formats: ["PDF", "Excel"],
                      updated: "May 5, 2023"
                    },
                  ].map((report, index) => (
                    <div key={index} className="p-4 hover:bg-ui-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-ui-gray-500">{report.description}</div>
                          <div className="text-xs text-ui-gray-400 mt-1">Last updated: {report.updated}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex space-x-2 mr-4">
                            {report.formats.map((format, i) => (
                              <span key={i} className="text-xs bg-ui-gray-100 px-2 py-1 rounded">
                                {format}
                              </span>
                            ))}
                          </div>
                          <Button variant="outline" size="sm">
                            <FileSpreadsheet className="h-4 w-4 mr-2" /> Generate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Reports that are sent automatically</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { 
                      title: "Weekly Revenue Summary", 
                      description: "Sent every Monday at 9:00 AM", 
                      recipients: ["finance@example.com", "admin@example.com"],
                      next: "May 8, 2023"
                    },
                    { 
                      title: "Monthly Financial Report", 
                      description: "Sent on the 1st of each month", 
                      recipients: ["finance@example.com", "director@example.com"],
                      next: "Jun 1, 2023"
                    },
                  ].map((report, index) => (
                    <div key={index} className="p-4 hover:bg-ui-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-ui-gray-500">{report.description}</div>
                          <div className="text-xs text-ui-gray-400 mt-1">
                            Recipients: {report.recipients.join(", ")}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm text-ui-gray-500 mr-4">
                            Next: <span className="font-medium">{report.next}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t border-ui-gray-100">
                <Button variant="outline" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Schedule New Report
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRevenue; 
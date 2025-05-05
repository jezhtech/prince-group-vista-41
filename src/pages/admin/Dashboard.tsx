
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, CreditCard, Ticket, TrendingUp, ArrowDownRight } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: "Total Users",
            value: "3,456",
            change: "+12%",
            trend: "up",
            icon: <Users className="h-5 w-5 text-white" />,
            color: "bg-blue-500",
          },
          {
            title: "Upcoming Events",
            value: "12",
            change: "+4",
            trend: "up",
            icon: <Calendar className="h-5 w-5 text-white" />,
            color: "bg-green-500",
          },
          {
            title: "Total Revenue",
            value: "₹1,45,500",
            change: "+8%",
            trend: "up",
            icon: <CreditCard className="h-5 w-5 text-white" />,
            color: "bg-prince-green",
          },
          {
            title: "Tickets Issued",
            value: "846",
            change: "-2%",
            trend: "down",
            icon: <Ticket className="h-5 w-5 text-white" />,
            color: "bg-orange-500",
          },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {item.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${item.color}`}>{item.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs flex items-center mt-1">
                {item.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                )}
                <span
                  className={
                    item.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {item.change} from last month
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Members</CardTitle>
            <CardDescription>
              New members who joined in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Rajesh Kumar",
                  email: "rajesh.kumar@example.com",
                  date: "May 5, 2023",
                  plan: "Premium",
                },
                {
                  name: "Priya Sharma",
                  email: "priya.sharma@example.com",
                  date: "May 4, 2023",
                  plan: "Basic",
                },
                {
                  name: "Suresh Patel",
                  email: "suresh.patel@example.com",
                  date: "May 3, 2023",
                  plan: "VIP",
                },
                {
                  name: "Anita Singh",
                  email: "anita.singh@example.com",
                  date: "May 2, 2023",
                  plan: "Basic",
                },
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{member.date}</p>
                    <p className={`text-xs font-medium ${
                      member.plan === 'VIP' ? 'text-purple-600' : 
                      member.plan === 'Premium' ? 'text-prince-green' : 
                      'text-blue-600'
                    }`}>
                      {member.plan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Events scheduled for the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Document Registration Workshop",
                  date: "Jun 15, 2023",
                  time: "10:00 AM - 12:00 PM",
                  attendees: 45,
                  capacity: 50,
                },
                {
                  title: "Financial Planning Seminar",
                  date: "Jun 22, 2023",
                  time: "2:00 PM - 4:00 PM",
                  attendees: 28,
                  capacity: 40,
                },
                {
                  title: "Loan Application Workshop",
                  date: "Jun 29, 2023",
                  time: "11:00 AM - 1:00 PM",
                  attendees: 32,
                  capacity: 35,
                },
                {
                  title: "Members Networking Event",
                  date: "Jul 5, 2023",
                  time: "5:00 PM - 7:00 PM",
                  attendees: 38,
                  capacity: 50,
                },
              ].map((event, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{event.title}</p>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{event.time}</span>
                    <span className="text-gray-500">
                      {event.attendees}/{event.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-prince-green h-1.5 rounded-full"
                      style={{
                        width: `${(event.attendees / event.capacity) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest financial transactions across all branches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "TXN-001",
                  description: "Membership Renewal - Rajesh Kumar",
                  amount: "₹1,999",
                  status: "Completed",
                  date: "May 5, 2023",
                },
                {
                  id: "TXN-002",
                  description: "Documentation Service - Priya Sharma",
                  amount: "₹1,200",
                  status: "Completed",
                  date: "May 4, 2023",
                },
                {
                  id: "TXN-003",
                  description: "Loan Processing Fee - Suresh Patel",
                  amount: "₹2,000",
                  status: "Pending",
                  date: "May 3, 2023",
                },
                {
                  id: "TXN-004",
                  description: "Event Registration - Anita Singh",
                  amount: "₹500",
                  status: "Completed",
                  date: "May 2, 2023",
                },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.id} | {transaction.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <p
                      className={`text-xs font-medium ${
                        transaction.status === "Completed"
                          ? "text-green-600"
                          : "text-orange-500"
                      }`}
                    >
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branch Performance</CardTitle>
            <CardDescription>Top performing branches this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Nagercoil Headquarters",
                  revenue: "₹45,500",
                  growth: "+12%",
                },
                {
                  name: "Thuckalay Branch",
                  revenue: "₹32,750",
                  growth: "+8%",
                },
                {
                  name: "Marthandam Branch",
                  revenue: "₹28,900",
                  growth: "+5%",
                },
                {
                  name: "Colachel Branch",
                  revenue: "₹24,650",
                  growth: "+3%",
                },
                {
                  name: "Kanyakumari Branch",
                  revenue: "₹22,800",
                  growth: "+2%",
                },
              ].map((branch, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="font-medium">{branch.name}</p>
                  <div className="text-right">
                    <p className="font-medium">{branch.revenue}</p>
                    <p className="text-xs text-green-600">{branch.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

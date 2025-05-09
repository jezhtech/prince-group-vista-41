
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2,
  UserPlus,
  Users,
  CalendarCheck,
  CreditCard,
  ArrowUpCircle,
  CheckCircle,
  XCircle,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatisticsCard from "@/components/StatisticsCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const membershipTiers = [
  {
    id: 1,
    name: "Basic",
    annualFee: 999,
    monthlyFee: 99,
    color: "bg-ui-blue-500",
    features: [
      "Access to all branches",
      "Document processing assistance",
      "Basic loan options",
      "10% discount on documentation services"
    ],
    membersCount: 1245
  },
  {
    id: 2,
    name: "Premium",
    annualFee: 1999,
    monthlyFee: 199,
    color: "bg-ui-green-500",
    features: [
      "All Basic features",
      "Priority processing",
      "Extended loan options",
      "25% discount on documentation services",
      "Free event access"
    ],
    membersCount: 856
  },
  {
    id: 3,
    name: "VIP",
    annualFee: 4999,
    monthlyFee: 499,
    color: "bg-purple-600",
    features: [
      "All Premium features",
      "Dedicated account manager",
      "VIP lounge access",
      "50% discount on documentation services",
      "Exclusive financial advisory",
      "Premium event access"
    ],
    membersCount: 328
  }
];

const membershipRequests = [
  {
    id: "REQ-001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    requestedTier: "Premium",
    date: "2023-05-15",
    status: "pending"
  },
  {
    id: "REQ-002",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    requestedTier: "Basic",
    date: "2023-05-14",
    status: "approved"
  },
  {
    id: "REQ-003",
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    requestedTier: "VIP",
    date: "2023-05-13",
    status: "pending"
  },
  {
    id: "REQ-004",
    name: "Anita Singh",
    email: "anita.singh@example.com",
    requestedTier: "Premium",
    date: "2023-05-12",
    status: "rejected"
  }
];

const recentUpgrades = [
  {
    name: "Suresh Patel",
    from: "Basic",
    to: "Premium",
    date: "2023-05-10"
  },
  {
    name: "Meena Reddy",
    from: "Premium",
    to: "VIP",
    date: "2023-05-08"
  },
  {
    name: "Karthik Iyer",
    from: "Basic",
    to: "Premium",
    date: "2023-05-05"
  }
];

const AdminMembership = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const totalMembers = membershipTiers.reduce((sum, tier) => sum + tier.membersCount, 0);
  
  const filteredRequests = membershipRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Membership Management</h1>
        <Button className="bg-ui-blue-600 hover:bg-ui-blue-700">
          <Settings className="mr-2 h-4 w-4" /> Manage Tiers
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatisticsCard
          value={totalMembers.toString()}
          label="Total Members"
          variant="blue"
        />
        <StatisticsCard
          value={membershipTiers[0].membersCount.toString()}
          label="Basic Members"
          variant="blue"
        />
        <StatisticsCard
          value={membershipTiers[1].membersCount.toString()}
          label="Premium Members"
          variant="green"
        />
        <StatisticsCard
          value={membershipTiers[2].membersCount.toString()}
          label="VIP Members"
          variant="blue"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {membershipTiers.map((tier, index) => (
          <Card key={index} className="overflow-hidden">
            <div className={`h-2 ${tier.color}`}></div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{tier.name}</span>
                <div className="text-sm font-normal text-gray-500">
                  {tier.membersCount} members
                </div>
              </CardTitle>
              <CardDescription>
                <div className="flex items-baseline space-x-1 mt-2">
                  <span className="text-2xl font-bold">₹{tier.annualFee}</span>
                  <span className="text-gray-500">/year</span>
                </div>
                <div className="text-sm text-gray-500">or ₹{tier.monthlyFee}/month</div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button size="sm" className={tier.color}>
                <UserPlus className="h-4 w-4 mr-1" /> Add Member
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Membership Requests</CardTitle>
                <CardDescription>Recent membership applications and tier change requests</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search requests..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              {filteredRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{request.name}</h4>
                    <p className="text-sm text-gray-500">{request.email}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500 mr-2">{request.date}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.requestedTier === 'VIP' 
                        ? 'bg-purple-100 text-purple-800'
                        : request.requestedTier === 'Premium'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {request.requestedTier}
                    </div>
                    {request.status === 'pending' && (
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline" className="h-8 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Upgrades</CardTitle>
            <CardDescription>Members who recently changed their tier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUpgrades.map((upgrade, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-ui-blue-100 rounded-full p-2 flex-shrink-0">
                    <ArrowUpCircle className="h-5 w-5 text-ui-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{upgrade.name}</p>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500">{upgrade.from}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-1">
                        <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-ui-green-600 font-medium">{upgrade.to}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{upgrade.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button className="w-full" variant="outline">
              View All Upgrades
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="membership" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="membership">Membership Cards</TabsTrigger>
          <TabsTrigger value="benefits">Membership Benefits</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="membership" className="mt-0">
          <Card>
            <CardContent className="py-6">
              <div className="text-center">
                <CreditCard className="h-16 w-16 mx-auto text-ui-blue-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Membership Cards Management</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This section would allow administrators to manage membership card designs, issue new cards, and track card status for members.
                </p>
                <Button className="mt-4">
                  Go to Card Designer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="benefits" className="mt-0">
          <Card>
            <CardContent className="py-6">
              <div className="text-center">
                <Users className="h-16 w-16 mx-auto text-ui-blue-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Membership Benefits Management</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This section would allow administrators to manage and customize membership benefits for each tier.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <Card>
            <CardContent className="py-6">
              <div className="text-center">
                <CalendarCheck className="h-16 w-16 mx-auto text-ui-blue-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Membership Analytics</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This section would provide detailed analytics on membership growth, retention, and conversion rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMembership;

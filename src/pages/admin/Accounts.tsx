
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Users, MoreVertical, Download, ChevronDown } from "lucide-react";

const Accounts = () => {
  return (
    <div className="h-full p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounts Management</h1>
          <p className="text-muted-foreground">
            Manage all membership and event accounts in one place
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Membership Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹42,58,950</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Event Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹2,45,000</div>
              <p className="text-xs text-muted-foreground">
                +7% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="membership" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="membership">Membership Accounts</TabsTrigger>
              <TabsTrigger value="events">Event Accounts</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronDown className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button size="sm">Add New</Button>
            </div>
          </div>
          <TabsContent value="membership" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Membership Accounts</CardTitle>
                <CardDescription>
                  Manage monthly, annual, and lifetime membership accounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Member Name</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Payment</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "MEM-2023-0042",
                        name: "Raj Kumar",
                        plan: "Premium",
                        status: "Active",
                        date: "10 May 2023",
                        amount: "₹1,999",
                      },
                      {
                        id: "MEM-2023-0065",
                        name: "Priya Singh",
                        plan: "VIP",
                        status: "Active",
                        date: "15 May 2023",
                        amount: "₹4,999",
                      },
                      {
                        id: "MEM-2023-0078",
                        name: "Arun Prakash",
                        plan: "Basic",
                        status: "Expired",
                        date: "02 Apr 2023",
                        amount: "₹999",
                      },
                      {
                        id: "MEM-2023-0096",
                        name: "Meena Devi",
                        plan: "Premium",
                        status: "Active",
                        date: "20 May 2023",
                        amount: "₹1,999",
                      },
                      {
                        id: "MEM-2023-0114",
                        name: "Suresh Kumar",
                        plan: "Basic",
                        status: "Active",
                        date: "22 May 2023",
                        amount: "₹999",
                      },
                    ].map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">{account.id}</TableCell>
                        <TableCell>{account.name}</TableCell>
                        <TableCell>{account.plan}</TableCell>
                        <TableCell>
                          <Badge
                            variant={account.status === "Active" ? "default" : "destructive"}
                          >
                            {account.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{account.date}</TableCell>
                        <TableCell>{account.amount}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Edit account</DropdownMenuItem>
                              <DropdownMenuItem>Renew membership</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Suspend membership
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 123 accounts
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="events" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Accounts</CardTitle>
                <CardDescription>
                  Manage revenue and registrations for all events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event ID</TableHead>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Registrations</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "EVT-2023-001",
                        name: "Annual Members Meet",
                        registrations: 156,
                        revenue: "₹78,000",
                        status: "Completed",
                      },
                      {
                        id: "EVT-2023-002",
                        name: "Documentation Workshop",
                        registrations: 42,
                        revenue: "₹84,000",
                        status: "Active",
                      },
                      {
                        id: "EVT-2023-003",
                        name: "Loan Processing Seminar",
                        registrations: 38,
                        revenue: "₹57,000",
                        status: "Active",
                      },
                      {
                        id: "EVT-2023-004",
                        name: "Business Documentation Training",
                        registrations: 25,
                        revenue: "₹26,000",
                        status: "Upcoming",
                      },
                    ].map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.id}</TableCell>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{event.registrations}</TableCell>
                        <TableCell>{event.revenue}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              event.status === "Completed"
                                ? "secondary"
                                : event.status === "Active"
                                ? "default"
                                : "outline"
                            }
                          >
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Download report</DropdownMenuItem>
                              <DropdownMenuItem>View registrations</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Close registrations
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 4 of 12 events
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Accounts;

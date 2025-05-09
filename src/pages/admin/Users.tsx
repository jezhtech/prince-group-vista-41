
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  PlusCircle, 
  Search, 
  Filter, 
  UserPlus,
  User, 
  Users, 
  UserCheck,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    role: "Member",
    status: "active",
    membershipType: "Premium",
    joinDate: "2023-03-15"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 87654 32109",
    role: "Member",
    status: "active",
    membershipType: "Basic",
    joinDate: "2023-04-22"
  },
  {
    id: 3,
    name: "Suresh Patel",
    email: "suresh.patel@example.com",
    phone: "+91 76543 21098",
    role: "Admin",
    status: "active",
    membershipType: "N/A",
    joinDate: "2022-11-05"
  },
  {
    id: 4,
    name: "Anita Singh",
    email: "anita.singh@example.com",
    phone: "+91 65432 10987",
    role: "Member",
    status: "inactive",
    membershipType: "VIP",
    joinDate: "2023-01-18"
  },
  {
    id: 5,
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "+91 54321 09876",
    role: "Staff",
    status: "active",
    membershipType: "N/A",
    joinDate: "2022-09-30"
  }
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button className="bg-ui-blue-600 hover:bg-ui-blue-700">
          <UserPlus className="h-4 w-4 mr-2" /> Add New User
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="staff">Staff & Admin</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Email</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Phone</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Role</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          No users found matching your criteria
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-ui-blue-100 flex items-center justify-center mr-3">
                                <span className="text-xs font-medium text-ui-blue-600">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-gray-500">
                                  {user.membershipType !== "N/A" ? user.membershipType : ""}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{user.email}</td>
                          <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'Admin' 
                                ? 'bg-purple-100 text-purple-800'
                                : user.role === 'Staff'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <User className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                  <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">Deactivate</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="members" className="mt-0">
          <Card>
            <CardContent className="py-6">
              <div className="text-center">
                <Users className="h-16 w-16 mx-auto text-ui-blue-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Members Tab</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This tab would show only member users filtered from the all users list.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff" className="mt-0">
          <Card>
            <CardContent className="py-6">
              <div className="text-center">
                <UserCheck className="h-16 w-16 mx-auto text-ui-blue-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Staff & Admin Tab</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This tab would show staff and admin users filtered from the all users list.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-0">
          <Card>
            <CardContent className="py-6">
              <div className="text-center">
                <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Inactive Users Tab</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This tab would show inactive users filtered from the all users list.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUsers;

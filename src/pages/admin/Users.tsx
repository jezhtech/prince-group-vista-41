import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  Search,
  Filter,
  UserPlus,
  User,
  Users,
  UserCheck,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User as UserType } from "@/types";
import { getAllUsers } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const AdminUsers = () => {
  const { userToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "all" ||
      user.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        if (!userToken) {
          return;
        }
        const users = await getAllUsers(userToken);

        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
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
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                        Name
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                        Email
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                        Phone
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                        Aadhar
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                        Role
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ui-blue-600 mx-auto"></div>
                        </td>
                      </tr>
                    )}
                    {!loading && filteredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-8 text-center text-gray-500"
                        >
                          No users founds
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-ui-blue-100 flex items-center justify-center mr-3">
                                <span className="text-xs font-medium text-ui-blue-600">
                                  {user.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{user.fullName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {user.email}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {user.mobile}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {user.aadhaar}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : user.role === "user"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <User className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Reset Password
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">
                                    Deactivate
                                  </DropdownMenuItem>
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
                  This tab would show only member users filtered from the all
                  users list.
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
                  This tab would show staff and admin users filtered from the
                  all users list.
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
                  This tab would show inactive users filtered from the all users
                  list.
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

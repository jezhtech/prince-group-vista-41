import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Calendar,
  Link,
  Globe,
  Loader2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  getAllReferrals,
  createReferral,
  updateReferral,
  deleteReferral,
  getReferralById,
} from "@/services/referral";
import {
  Referral as ReferralType,
  CreateReferralRequest,
  UpdateReferralRequest,
} from "@/types/referral";
import { useAuth } from "@/hooks/useAuth";

// Example referral data
const exampleReferrals = [
  {
    id: "REF-001",
    name: "TechCorp Inc",
    createdDate: "May 10, 2023",
    url: "prince-group.com/events/concert/ref/techcorp",
    status: "Active",
    visits: 245,
    conversions: 38,
    conversionRate: 15.5,
    logo: "https://placehold.co/200x100/3366FF/FFFFFF/png?text=TechCorp",
    color: "#3366FF",
  },
  {
    id: "REF-002",
    name: "Marketing Masters",
    createdDate: "May 15, 2023",
    url: "prince-group.com/events/concert/ref/marketing-masters",
    status: "Active",
    visits: 189,
    conversions: 27,
    conversionRate: 14.3,
    logo: "https://placehold.co/200x100/4EB4A7/FFFFFF/png?text=MarketingM",
    color: "#4EB4A7",
  },
  {
    id: "REF-003",
    name: "Local Business Association",
    createdDate: "May 20, 2023",
    url: "prince-group.com/events/concert/ref/lba",
    status: "Inactive",
    visits: 78,
    conversions: 5,
    conversionRate: 6.4,
    logo: "https://placehold.co/200x100/FF6666/FFFFFF/png?text=LBA",
    color: "#FF6666",
  },
];

const ReferralForm = ({
  onClose,
  formData,
  setFormData,
  onSubmit,
}: {
  onClose: () => void;
  formData: CreateReferralRequest;
  setFormData: (data: CreateReferralRequest) => void;
  onSubmit: () => void;
}) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="referralId">Referral ID</Label>
        <Input
          id="referralId"
          placeholder="e.g. techcorp-001"
          value={formData.referralId}
          onChange={(e) =>
            setFormData({ ...formData, referralId: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="e.g. TechCorp Inc"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="socialMedia">Social Media</Label>
        <Input
          id="socialMedia"
          placeholder="e.g. @techcorp or https://twitter.com/techcorp"
          value={formData.socialMedia}
          onChange={(e) =>
            setFormData({ ...formData, socialMedia: e.target.value })
          }
          required
        />
      </div>

      <DialogFooter className="pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Referral</Button>
      </DialogFooter>
    </form>
  );
};

const AdminReferrals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [referrals, setReferrals] = useState<ReferralType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReferral, setEditingReferral] = useState<ReferralType | null>(
    null
  );
  const [formData, setFormData] = useState<CreateReferralRequest>({
    referralId: "",
    name: "",
    socialMedia: "",
  });

  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Fetch referrals on component mount
  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      const token = await currentUser?.getIdToken();
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in to access this page.",
          variant: "destructive",
        });
        return;
      }

      const fetchedReferrals = await getAllReferrals(token);
      setReferrals(fetchedReferrals);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch referrals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReferral = async () => {
    try {
      const token = await currentUser?.getIdToken();
      if (!token) return;

      await createReferral(token, formData);
      toast({
        title: "Success",
        description: "Referral created successfully!",
      });
      setDialogOpen(false);
      setFormData({
        referralId: "",
        name: "",
        socialMedia: "",
      });
      fetchReferrals();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create referral. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateReferral = async () => {
    if (!editingReferral) return;

    try {
      const token = await currentUser?.getIdToken();
      if (!token) return;

      const updateData: UpdateReferralRequest = {
        id: editingReferral.id,
        ...formData,
      };

      await updateReferral(token, updateData);
      toast({
        title: "Success",
        description: "Referral updated successfully!",
      });
      setDialogOpen(false);
      setEditingReferral(null);
      setFormData({
        referralId: "",
        name: "",
        socialMedia: "",
      });
      fetchReferrals();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update referral. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteReferral = async (referralId: number) => {
    if (!confirm("Are you sure you want to delete this referral?")) return;

    try {
      const token = await currentUser?.getIdToken();
      if (!token) return;

      await deleteReferral(token, referralId);
      toast({
        title: "Success",
        description: "Referral deleted successfully!",
      });
      fetchReferrals();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete referral. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (referral: ReferralType) => {
    setEditingReferral(referral);
    setFormData({
      referralId: referral.referralId,
      name: referral.name,
      socialMedia: referral.socialMedia,
    });
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingReferral(null);
    setFormData({
      referralId: "",
      name: "",
      socialMedia: "",
    });
    setDialogOpen(true);
  };

  const handleCopyURL = (referralId: string) => {
    const url = `prince-group.com/events/concert/ref/${referralId}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied to clipboard",
      description: url,
      duration: 3000,
    });
  };

  const filteredReferrals = referrals.filter(
    (referral) =>
      referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referralId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading referrals...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Referral Management</h1>
          <p className="text-ui-gray-500 flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-2" />
            Annual Developers Conference 2023
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add New Referral
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingReferral ? "Edit Referral" : "Create New Referral"}
              </DialogTitle>
              <DialogDescription>
                {editingReferral
                  ? "Modify this referral partnership."
                  : "Add a new partner referral and generate a custom landing page for ticket sales."}
              </DialogDescription>
            </DialogHeader>
            <ReferralForm
              onClose={() => setDialogOpen(false)}
              formData={formData}
              setFormData={setFormData}
              onSubmit={
                editingReferral ? handleUpdateReferral : handleCreateReferral
              }
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Referrals</TabsTrigger>
          <TabsTrigger value="all">All Referrals</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Active Referral Partners</CardTitle>
                  <CardDescription>
                    Manage your active referral partnerships
                  </CardDescription>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ui-gray-400" />
                  <Input
                    placeholder="Search referrals..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredReferrals.length === 0 ? (
                <div className="p-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Link className="h-16 w-16 text-ui-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      {searchTerm ? "No referrals found" : "No referrals yet"}
                    </h3>
                    <p className="text-ui-gray-500 max-w-md mb-4">
                      {searchTerm 
                        ? "Try adjusting your search criteria."
                        : "Get started by creating your first referral partnership to boost ticket sales."
                      }
                    </p>
                    {!searchTerm && (
                      <Button onClick={openCreateDialog}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Create First Referral
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-ui-gray-200">
                        <th className="text-left p-4 font-medium text-ui-gray-500">
                          Referral ID
                        </th>
                        <th className="text-left p-4 font-medium text-ui-gray-500">
                          Company
                        </th>
                        <th className="text-left p-4 font-medium text-ui-gray-500">
                          Created
                        </th>
                        <th className="text-left p-4 font-medium text-ui-gray-500">
                          Referral URL
                        </th>
                        <th className="text-left p-4 font-medium text-ui-gray-500">
                          Status
                        </th>
                        <th className="text-right p-4 font-medium text-ui-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReferrals.map((referral) => (
                      <tr
                        key={referral.id}
                        className="border-b border-ui-gray-100 hover:bg-ui-gray-50"
                      >
                        <td className="p-4 font-medium">
                          {referral.referralId}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-ui-blue-100 rounded border border-gray-200 flex items-center justify-center mr-3">
                              <Globe className="h-5 w-5 text-ui-blue-600" />
                            </div>
                            <span>{referral.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-ui-gray-500">
                          {new Date(referral.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <span className="text-ui-gray-500 text-sm truncate max-w-[200px]">
                              prince-group.com/events/concert/ref/
                              {referral.referralId}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-1 h-6 w-6"
                              onClick={() => handleCopyURL(referral.referralId)}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Active
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openEditDialog(referral)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600"
                              onClick={() => handleDeleteReferral(referral.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="animate-fade-in">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center text-center p-8">
                <Link className="h-16 w-16 text-ui-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">All Referrals View</h3>
                <p className="text-ui-gray-500 max-w-md mb-4">
                  This tab would display all referrals including inactive and
                  expired partnerships.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Referral Performance</CardTitle>
              <CardDescription>
                Analytics for your referral partnerships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="text-sm text-ui-gray-500 mb-1">
                    Total Visits
                  </div>
                  <div className="text-2xl font-bold">512</div>
                  <div className="text-sm text-green-500">
                    +22% from last month
                  </div>
                </div>

                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="text-sm text-ui-gray-500 mb-1">
                    Conversions
                  </div>
                  <div className="text-2xl font-bold">70</div>
                  <div className="text-sm text-green-500">
                    +15% from last month
                  </div>
                </div>

                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="text-sm text-ui-gray-500 mb-1">
                    Conversion Rate
                  </div>
                  <div className="text-2xl font-bold">13.7%</div>
                  <div className="text-sm text-red-500">
                    -2.3% from last month
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Performance by Partner</h3>

                {filteredReferrals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-8">
                    <Globe className="h-16 w-16 text-ui-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No performance data yet</h3>
                    <p className="text-ui-gray-500 max-w-md mb-4">
                      Performance analytics will appear here once you have active referral partnerships.
                    </p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-ui-gray-200">
                        <th className="text-left py-2 font-medium text-ui-gray-500">
                          Partner
                        </th>
                        <th className="text-right py-2 font-medium text-ui-gray-500">
                          Visits
                        </th>
                        <th className="text-right py-2 font-medium text-ui-gray-500">
                          Conversions
                        </th>
                        <th className="text-right py-2 font-medium text-ui-gray-500">
                          Rate
                        </th>
                        <th className="text-right py-2 font-medium text-ui-gray-500">
                          Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                                            {filteredReferrals.map((referral) => (
                        <tr
                          key={referral.id}
                          className="border-b border-ui-gray-100"
                        >
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-ui-blue-100 rounded border border-gray-200 flex items-center justify-center mr-2">
                                <Globe className="h-4 w-4 text-ui-blue-600" />
                              </div>
                              <span>{referral.name}</span>
                            </div>
                          </td>
                          <td className="text-right py-3">-</td>
                          <td className="text-right py-3">-</td>
                          <td className="text-right py-3">-</td>
                          <td className="text-right py-3 font-medium">-</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReferrals;

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PlusCircle, Edit, Trash2, Copy, ExternalLink, Calendar, Link, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

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
    color: "#3366FF"
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
    color: "#4EB4A7"
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
    color: "#FF6666"
  }
];

const ReferralForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would save the data to your backend
    toast({
      title: "Referral created successfully",
      description: "The landing page has been generated and is now live.",
    });
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company-name">Company Name</Label>
        <Input id="company-name" placeholder="e.g. TechCorp Inc" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company-logo">Company Logo URL</Label>
        <Input id="company-logo" placeholder="https://example.com/logo.png" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company-website">Company Website</Label>
        <Input id="company-website" placeholder="https://example.com" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company-color">Brand Color (Hex)</Label>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#3366FF]"></div>
          <Input id="company-color" placeholder="#3366FF" defaultValue="#3366FF" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Brief description of the partnership"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="custom-slug">Custom URL Slug (Optional)</Label>
        <div className="flex items-center">
          <span className="bg-gray-100 px-3 py-2 text-gray-500 border border-r-0 border-gray-200 rounded-l-md text-sm">
            prince-group.com/events/concert/ref/
          </span>
          <Input id="custom-slug" className="rounded-l-none" placeholder="company-name" />
        </div>
        <p className="text-sm text-gray-500">Leave empty to generate automatically</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="active" defaultChecked />
        <Label htmlFor="active">Activate referral immediately</Label>
      </div>
      
      <DialogFooter className="pt-4">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Create Referral & Generate Landing Page</Button>
      </DialogFooter>
    </form>
  );
};

const AdminReferrals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleCopyURL = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied to clipboard",
      description: url,
      duration: 3000,
    });
  };

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
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" /> Add New Referral
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Referral</DialogTitle>
              <DialogDescription>
                Add a new partner referral and generate a custom landing page for ticket sales.
              </DialogDescription>
            </DialogHeader>
            <ReferralForm onClose={() => setDialogOpen(false)} />
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
                  <CardDescription>Manage your active referral partnerships</CardDescription>
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ui-gray-200">
                      <th className="text-left p-4 font-medium text-ui-gray-500">Referral ID</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Company</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Created</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Referral URL</th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">Status</th>
                      <th className="text-right p-4 font-medium text-ui-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exampleReferrals.map((referral) => (
                      <tr key={referral.id} className="border-b border-ui-gray-100 hover:bg-ui-gray-50">
                        <td className="p-4 font-medium">{referral.id}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <img 
                              src={referral.logo} 
                              alt={`${referral.name} logo`} 
                              className="w-10 h-10 object-contain mr-3 rounded border border-gray-200" 
                            />
                            <span>{referral.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-ui-gray-500">{referral.createdDate}</td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <span className="text-ui-gray-500 text-sm truncate max-w-[200px]">
                              {referral.url}
                            </span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="ml-1 h-6 w-6"
                              onClick={() => handleCopyURL(referral.url)}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={
                            referral.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                            'bg-red-100 text-red-800 hover:bg-red-100'
                          }>
                            {referral.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                  This tab would display all referrals including inactive and expired partnerships.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Referral Performance</CardTitle>
              <CardDescription>Analytics for your referral partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="text-sm text-ui-gray-500 mb-1">Total Visits</div>
                  <div className="text-2xl font-bold">512</div>
                  <div className="text-sm text-green-500">+22% from last month</div>
                </div>
                
                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="text-sm text-ui-gray-500 mb-1">Conversions</div>
                  <div className="text-2xl font-bold">70</div>
                  <div className="text-sm text-green-500">+15% from last month</div>
                </div>
                
                <div className="bg-ui-gray-50 rounded-lg p-4">
                  <div className="text-sm text-ui-gray-500 mb-1">Conversion Rate</div>
                  <div className="text-2xl font-bold">13.7%</div>
                  <div className="text-sm text-red-500">-2.3% from last month</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Performance by Partner</h3>
                
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ui-gray-200">
                      <th className="text-left py-2 font-medium text-ui-gray-500">Partner</th>
                      <th className="text-right py-2 font-medium text-ui-gray-500">Visits</th>
                      <th className="text-right py-2 font-medium text-ui-gray-500">Conversions</th>
                      <th className="text-right py-2 font-medium text-ui-gray-500">Rate</th>
                      <th className="text-right py-2 font-medium text-ui-gray-500">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exampleReferrals.map((referral) => (
                      <tr key={referral.id} className="border-b border-ui-gray-100">
                        <td className="py-3">
                          <div className="flex items-center">
                            <img 
                              src={referral.logo} 
                              alt={`${referral.name} logo`} 
                              className="w-8 h-8 object-contain mr-2 rounded border border-gray-200" 
                            />
                            <span>{referral.name}</span>
                          </div>
                        </td>
                        <td className="text-right py-3">{referral.visits}</td>
                        <td className="text-right py-3">{referral.conversions}</td>
                        <td className="text-right py-3">{referral.conversionRate}%</td>
                        <td className="text-right py-3 font-medium">
                          ₹{(referral.conversions * 999).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReferrals; 
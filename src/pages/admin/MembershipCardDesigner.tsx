
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
  Palette, 
  Image as ImageIcon, 
  Type, 
  CreditCard,
  Layers,
  Save,
  Download,
  Copy,
  Eye,
  Plus,
  Settings,
  Undo,
  Redo,
  CheckSquare,
  Chip,
  User,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cardTemplates = [
  {
    id: 1,
    name: "Basic Membership",
    image: "https://via.placeholder.com/300x190/4285F4/FFFFFF?text=Basic+Membership",
    category: "basic"
  },
  {
    id: 2,
    name: "Premium Membership",
    image: "https://via.placeholder.com/300x190/34A853/FFFFFF?text=Premium+Membership",
    category: "premium"
  },
  {
    id: 3,
    name: "VIP Membership",
    image: "https://via.placeholder.com/300x190/8e44ad/FFFFFF?text=VIP+Membership",
    category: "vip"
  },
  {
    id: 4,
    name: "Corporate Membership",
    image: "https://via.placeholder.com/300x190/EA4335/FFFFFF?text=Corporate+Membership",
    category: "corporate"
  }
];

const AdminMembershipCardDesigner = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [activeTemplate, setActiveTemplate] = useState<number | null>(null);
  const [cardView, setCardView] = useState("front");
  
  const gradientOptions = [
    { name: "Blue", value: "bg-gradient-to-r from-ui-blue-500 to-ui-blue-700" },
    { name: "Green", value: "bg-gradient-to-r from-ui-green-500 to-ui-green-700" },
    { name: "Purple", value: "bg-gradient-to-r from-purple-500 to-purple-700" },
    { name: "Red", value: "bg-gradient-to-r from-red-500 to-red-700" },
    { name: "Orange", value: "bg-gradient-to-r from-orange-500 to-orange-700" },
    { name: "Cyan", value: "bg-gradient-to-r from-cyan-500 to-cyan-700" }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Membership Card Designer</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Undo className="h-4 w-4 mr-2" /> Undo
          </Button>
          <Button variant="outline">
            <Redo className="h-4 w-4 mr-2" /> Redo
          </Button>
          <Button className="bg-ui-blue-600 hover:bg-ui-blue-700">
            <Save className="h-4 w-4 mr-2" /> Save Design
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar - Design controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Design Tools</CardTitle>
              <CardDescription>Customize your membership card design</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="colors">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="colors">
                    <Palette className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="typography">
                    <Type className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="elements">
                    <Layers className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="images">
                    <ImageIcon className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="colors" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Card Style</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button className="p-3 border rounded-md hover:border-ui-blue-500 focus:border-ui-blue-500 focus:outline-none">
                        <div className="h-12 bg-gradient-to-r from-ui-blue-500 to-ui-blue-700 rounded"></div>
                        <p className="mt-1 text-xs text-center">Gradient</p>
                      </button>
                      <button className="p-3 border rounded-md hover:border-ui-blue-500 focus:border-ui-blue-500 focus:outline-none">
                        <div className="h-12 bg-ui-blue-600 rounded"></div>
                        <p className="mt-1 text-xs text-center">Solid</p>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Gradients</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {gradientOptions.map((gradient, index) => (
                        <button key={index} className="p-1 border rounded hover:border-ui-blue-500 focus:border-ui-blue-500 focus:outline-none">
                          <div className={`h-6 rounded ${gradient.value}`}></div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Text Color</label>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      <button className="h-8 w-8 rounded-full bg-white border border-gray-300"></button>
                      <button className="h-8 w-8 rounded-full bg-black"></button>
                      <button className="h-8 w-8 rounded-full bg-gray-500"></button>
                      <button className="h-8 w-8 rounded-full bg-gray-800"></button>
                      <button className="h-8 w-8 rounded-full bg-yellow-400"></button>
                      <button className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="typography" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Font Family</label>
                    <Select defaultValue="inter">
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="playfair">Playfair Display</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Name Style</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button className="p-2 border rounded-md text-center hover:border-ui-blue-500 focus:border-ui-blue-500 focus:outline-none">
                        <span className="font-bold uppercase text-sm">RAJESH KUMAR</span>
                        <p className="text-xs mt-1">UPPERCASE</p>
                      </button>
                      <button className="p-2 border rounded-md text-center hover:border-ui-blue-500 focus:border-ui-blue-500 focus:outline-none">
                        <span className="font-medium text-sm">Rajesh Kumar</span>
                        <p className="text-xs mt-1">Title Case</p>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Member ID Style</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button className="p-2 border rounded-md text-center hover:border-ui-blue-500 focus:border-ui-blue-500 focus:outline-none">
                        <span className="font-mono text-sm">PG-10012345</span>
                        <p className="text-xs mt-1">With Prefix</p>
                      </button>
                      <button className="p-2 border rounded-md text-center hover:border-ui-blue-500 focus:border-ui-blue-500 focus:outline-none">
                        <span className="font-mono text-sm">10012345</span>
                        <p className="text-xs mt-1">Numbers Only</p>
                      </button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="elements" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Card Elements</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="showName" defaultChecked className="mr-2" />
                        <label htmlFor="showName" className="text-sm">Member Name</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="showId" defaultChecked className="mr-2" />
                        <label htmlFor="showId" className="text-sm">Member ID</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="showValidity" defaultChecked className="mr-2" />
                        <label htmlFor="showValidity" className="text-sm">Valid Until</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="showQR" defaultChecked className="mr-2" />
                        <label htmlFor="showQR" className="text-sm">QR Code</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="showChip" defaultChecked className="mr-2" />
                        <label htmlFor="showChip" className="text-sm">Card Chip</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Card Features</label>
                    <Select defaultValue="standard">
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select card features" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="magnetic">Magnetic Strip</SelectItem>
                        <SelectItem value="chip">Smart Chip</SelectItem>
                        <SelectItem value="nfc">NFC Enabled</SelectItem>
                        <SelectItem value="all">All Features</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                
                <TabsContent value="images" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Logo</label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <ImageIcon className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Drag and drop or click to upload</p>
                      <Button variant="outline" size="sm" className="mt-2">Upload Logo</Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Background Pattern</label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      <button className="p-1 border rounded-md bg-gray-50"></button>
                      <button className="p-1 border rounded-md bg-gray-50 bg-opacity-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:10px_10px]"></button>
                      <button className="p-1 border rounded-md bg-gray-50 bg-[linear-gradient(135deg,#f3f4f6_25%,transparent_25%,transparent_50%,#f3f4f6_50%,#f3f4f6_75%,transparent_75%,transparent)] bg-[size:20px_20px]"></button>
                      <button className="p-1 border rounded-md bg-gray-50 bg-[linear-gradient(to_right,#f3f4f6,#f3f4f6_10px,transparent_10px,transparent_20px)] bg-[size:20px_20px]"></button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Member Photo</label>
                    <div className="flex items-center mt-2 space-x-2">
                      <input type="checkbox" id="showPhoto" className="mr-1" />
                      <label htmlFor="showPhoto" className="text-sm">Include member photo</label>
                    </div>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <User className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Sample member photo</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" /> Preview
              </Button>
              <Button className="bg-ui-blue-600 hover:bg-ui-blue-700">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Center - Card preview */}
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Card Preview</CardTitle>
                  <CardDescription>See how your membership card looks like</CardDescription>
                </div>
                <Tabs defaultValue="front" onValueChange={(value) => setCardView(value)}>
                  <TabsList>
                    <TabsTrigger value="front">Front</TabsTrigger>
                    <TabsTrigger value="back">Back</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                {activeTemplate === null ? (
                  <div className="w-full max-w-md aspect-[1.6/1] rounded-xl bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-10">
                      <CreditCard className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-400">Select a template or create from scratch</h3>
                      <p className="text-sm text-gray-400 mt-2">Your card design will appear here</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-md relative">
                    {cardView === "front" ? (
                      <div className="aspect-[1.6/1] rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-ui-blue-500 to-ui-blue-700 text-white p-6 relative">
                        <div className="absolute top-5 left-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                              <Chip className="h-5 w-5 text-white" />
                            </div>
                          </div>
                          <div className="mt-8">
                            <h3 className="font-bold text-lg uppercase">PRINCE GROUP</h3>
                            <p className="text-sm text-white/80">
                              {cardTemplates.find(t => t.id === activeTemplate)?.name}
                            </p>
                          </div>
                        </div>
                        <div className="absolute bottom-5 left-6 right-6">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs text-white/70">Member Name</p>
                              <h3 className="font-medium text-lg">Rajesh Kumar</h3>
                              <p className="text-xs mt-1 text-white/70">Valid Until</p>
                              <p className="text-sm">05/2026</p>
                            </div>
                            <div className="h-16 w-16 bg-white rounded-lg flex items-center justify-center">
                              <CheckSquare className="h-8 w-8 text-ui-blue-600" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
                      </div>
                    ) : (
                      <div className="aspect-[1.6/1] rounded-xl overflow-hidden shadow-lg bg-white p-6 relative border">
                        <div className="absolute top-0 left-0 h-16 w-full bg-ui-blue-600"></div>
                        <div className="relative mt-12 text-center">
                          <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="h-12 w-12 text-gray-400" />
                          </div>
                          <h3 className="font-bold">RAJESH KUMAR</h3>
                          <p className="text-sm text-gray-500">Member ID: PG-10012345</p>
                          <div className="mt-4 space-y-1 text-sm">
                            <p>In case this card is found, please return to:</p>
                            <p className="font-medium">Prince Group Headquarters</p>
                            <p>123 Main Street, Nagercoil, Kanyakumari District</p>
                            <p>Phone: +91 98765 43210</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Start with a pre-designed template or create from scratch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className={`border rounded-lg p-2 hover:border-ui-blue-500 cursor-pointer transition-all ${
                  activeTemplate === null ? 'border-ui-blue-500 bg-ui-blue-50' : ''
                }`} onClick={() => setActiveTemplate(null)}>
                  <div className="aspect-[1.6/1] bg-gray-100 rounded flex items-center justify-center">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-center text-sm mt-2">Create New</p>
                </div>
                
                {cardTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className={`border rounded-lg p-2 hover:border-ui-blue-500 cursor-pointer transition-all ${
                      activeTemplate === template.id ? 'border-ui-blue-500 bg-ui-blue-50' : ''
                    }`}
                    onClick={() => setActiveTemplate(template.id)}
                  >
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="aspect-[1.6/1] object-cover rounded"
                    />
                    <p className="text-center text-sm mt-2">{template.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminMembershipCardDesigner;

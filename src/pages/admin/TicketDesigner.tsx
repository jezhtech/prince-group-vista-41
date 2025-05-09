
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
  Image, 
  Type, 
  QrCode,
  Layers,
  Save,
  Download,
  Copy,
  Eye,
  Ticket,
  Plus,
  Settings,
  Undo,
  Redo,
  Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ticketTemplates = [
  {
    id: 1,
    name: "Standard Event Ticket",
    image: "https://via.placeholder.com/300x150/4285F4/FFFFFF?text=Standard+Event+Ticket",
    category: "event"
  },
  {
    id: 2,
    name: "VIP Event Ticket",
    image: "https://via.placeholder.com/300x150/EA4335/FFFFFF?text=VIP+Event+Ticket",
    category: "event"
  },
  {
    id: 3,
    name: "Workshop Pass",
    image: "https://via.placeholder.com/300x150/34A853/FFFFFF?text=Workshop+Pass",
    category: "workshop"
  },
  {
    id: 4,
    name: "Conference Badge",
    image: "https://via.placeholder.com/300x150/FBBC05/000000?text=Conference+Badge",
    category: "conference"
  }
];

const AdminTicketDesigner = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [activeTemplate, setActiveTemplate] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState("#4285F4");
  
  const colorOptions = [
    { name: "Blue", value: "#4285F4" },
    { name: "Red", value: "#EA4335" },
    { name: "Green", value: "#34A853" },
    { name: "Yellow", value: "#FBBC05" },
    { name: "Purple", value: "#8e44ad" },
    { name: "Cyan", value: "#00bcd4" }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Ticket Designer</h1>
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
              <CardDescription>Customize your ticket design</CardDescription>
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
                  <TabsTrigger value="images">
                    <Image className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="elements">
                    <Layers className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="colors" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Background Color</label>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          className={`h-8 w-8 rounded-full border-2 ${
                            selectedColor === color.value ? 'border-black' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setSelectedColor(color.value)}
                        />
                      ))}
                      <button className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Text Color</label>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      <button className="h-8 w-8 rounded-full bg-black" />
                      <button className="h-8 w-8 rounded-full bg-white border border-gray-300" />
                      <button className="h-8 w-8 rounded-full bg-gray-700" />
                      <button className="h-8 w-8 rounded-full bg-ui-blue-600" />
                      <button className="h-8 w-8 rounded-full bg-ui-green-600" />
                      <button className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Accent Color</label>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      {colorOptions.map((color) => (
                        <button
                          key={`accent-${color.value}`}
                          className="h-8 w-8 rounded-full"
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
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
                    <label className="text-sm font-medium">Heading Size</label>
                    <div className="flex items-center mt-2">
                      <Input type="range" min="16" max="48" defaultValue="24" className="w-full" />
                      <span className="ml-2 text-sm w-8">24px</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Body Size</label>
                    <div className="flex items-center mt-2">
                      <Input type="range" min="12" max="24" defaultValue="16" className="w-full" />
                      <span className="ml-2 text-sm w-8">16px</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="images" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Logo</label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Image className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Drag and drop or click to upload</p>
                      <Button variant="outline" size="sm" className="mt-2">Upload Logo</Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Background Image</label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Image className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Drag and drop or click to upload</p>
                      <Button variant="outline" size="sm" className="mt-2">Upload Background</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="elements" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">QR Code</label>
                    <div className="flex items-center mt-2 space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <QrCode className="h-4 w-4 mr-2" /> Add QR Code
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" /> Settings
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Ticket Elements</label>
                    <div className="space-y-2 mt-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" /> Event Name
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" /> Event Date & Time
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" /> Venue
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" /> Seat Information
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" /> Ticket Holder
                      </Button>
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
        
        {/* Center - Design preview */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Ticket Preview</CardTitle>
              <CardDescription>See how your ticket design looks like</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-50 border rounded-lg aspect-[2/1] flex items-center justify-center">
                {activeTemplate === null ? (
                  <div className="text-center p-10">
                    <Ticket className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-400">Select a template or create from scratch</h3>
                    <p className="text-sm text-gray-400 mt-2">Your ticket design will appear here</p>
                  </div>
                ) : (
                  <img 
                    src={ticketTemplates.find(t => t.id === activeTemplate)?.image}
                    alt="Ticket preview"
                    className="max-w-full max-h-full rounded shadow-lg"
                  />
                )}
              </div>
              
              <div className="flex justify-center mt-6 space-x-3">
                <Button variant="outline">
                  <Layout className="h-4 w-4 mr-2" /> Mobile Preview
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" /> Duplicate
                </Button>
                <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
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
                    <div className="aspect-[2/1] bg-gray-100 rounded flex items-center justify-center">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-center text-sm mt-2">Create New</p>
                  </div>
                
                  {ticketTemplates.map((template) => (
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
                        className="aspect-[2/1] object-cover rounded"
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
    </div>
  );
};

export default AdminTicketDesigner;

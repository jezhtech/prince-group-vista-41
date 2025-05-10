
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StatisticsCard from "@/components/StatisticsCard";

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  
  const branches = [
    {
      id: 1,
      name: "Nagercoil Headquarters",
      address: "Sri Sai Complex, Court Road, Vepamoodu Junction, Nagercoil",
      phone: "9150537718",
      email: "nagercoil@princegroup.com",
      region: "central",
      isMainBranch: true,
      services: ["Documentation", "Loans", "Consultation"]
    },
    {
      id: 2,
      name: "Thuckalay Branch",
      address: "123 Main Street, Thuckalay",
      phone: "9385722102",
      email: "thuckalay@princegroup.com",
      region: "north",
      services: ["Documentation", "Loans"]
    },
    {
      id: 3,
      name: "Marthandam Branch",
      address: "45 Gandhi Road, Marthandam",
      phone: "9876543210",
      email: "marthandam@princegroup.com",
      region: "north",
      services: ["Documentation", "Loans"]
    },
    {
      id: 4,
      name: "Colachel Branch",
      address: "78 Beach Road, Colachel",
      phone: "8765432109",
      email: "colachel@princegroup.com",
      region: "south",
      services: ["Documentation"]
    },
    {
      id: 5,
      name: "Arumanai Branch",
      address: "56 Market Street, Arumanai",
      phone: "7654321098",
      email: "arumanai@princegroup.com",
      region: "central",
      services: ["Documentation", "Loans"]
    },
    {
      id: 6,
      name: "Kulasekharam Branch",
      address: "23 Temple Road, Kulasekharam",
      phone: "6543210987",
      email: "kulasekharam@princegroup.com",
      region: "north",
      services: ["Documentation", "Loans"]
    },
    {
      id: 7,
      name: "Kuzhithurai Branch",
      address: "89 Market Street, Kuzhithurai",
      phone: "5432109876",
      email: "kuzhithurai@princegroup.com",
      region: "south",
      services: ["Documentation", "Loans"]
    },
    {
      id: 8,
      name: "Thengapattanam Branch",
      address: "12 Beach Road, Thengapattanam",
      phone: "4321098765",
      email: "thengapattanam@princegroup.com",
      region: "south",
      services: ["Documentation"]
    }
  ];

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        branch.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || branch.region === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ui-blue-700 to-ui-blue-500 py-24">
          <div className="absolute inset-x-0 bottom-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white h-16 w-full">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Branches</h1>
              <p className="text-xl text-white/90">
                20 branches across Kanyakumari District to serve you better.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-16 relative z-10">
              <StatisticsCard value="20+" label="Branch Locations" variant="blue" />
              <StatisticsCard value="50,000+" label="Customers Served" variant="green" />
              <StatisticsCard value="15+" label="Years of Service" variant="blue" />
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Search */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                      <Input
                        type="text"
                        placeholder="Search branches by name or location"
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Region Filter */}
                  <div>
                    <select
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ui-blue-400"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                      <option value="all">All Regions</option>
                      <option value="north">North Region</option>
                      <option value="central">Central Region</option>
                      <option value="south">South Region</option>
                    </select>
                  </div>
                </div>

                {/* Branches List */}
                <div className="space-y-6">
                  {filteredBranches.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">No branches found matching your criteria.</p>
                    </div>
                  ) : (
                    filteredBranches.map(branch => (
                      <div 
                        key={branch.id} 
                        className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                          branch.isMainBranch ? 'border-ui-blue-400' : 'border-gray-100'
                        } transition-all hover:shadow-lg`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4">
                          <div className="md:col-span-3 p-6">
                            <div className="flex items-start">
                              <div className={`p-3 rounded-md ${branch.isMainBranch ? 'bg-ui-blue-100' : 'bg-gray-100'} mr-4`}>
                                <MapPin className={`h-6 w-6 ${branch.isMainBranch ? 'text-ui-blue-500' : 'text-ui-blue-400'}`} />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-xl font-semibold">{branch.name}</h3>
                                  {branch.isMainBranch && (
                                    <span className="ml-2 bg-ui-blue-100 text-ui-blue-500 text-xs px-2 py-1 rounded-full font-medium">
                                      Headquarters
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 mt-1">{branch.address}</p>
                                
                                <div className="mt-4 space-y-2">
                                  <a href={`tel:${branch.phone}`} className="flex items-center text-gray-600 hover:text-ui-blue-500">
                                    <Phone className="h-4 w-4 mr-2" />
                                    <span>{branch.phone}</span>
                                  </a>
                                  <a href={`mailto:${branch.email}`} className="flex items-center text-gray-600 hover:text-ui-blue-500">
                                    <Mail className="h-4 w-4 mr-2" />
                                    <span>{branch.email}</span>
                                  </a>
                                </div>
                                
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {branch.services.map(service => (
                                    <span key={service} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 flex items-center justify-center p-6">
                            <Button className="w-full flex items-center justify-center bg-ui-blue-500 hover:bg-ui-blue-600" asChild>
                              <a 
                                href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Get Directions <ArrowRight className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Working Hours */}
              <div className="mt-12 bg-white rounded-xl shadow-md p-8">
                <h3 className="text-2xl font-bold mb-6">Working Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="font-medium">Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="font-medium">Saturday</span>
                      <span>9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="font-medium">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  
                  <div className="bg-ui-blue-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-2">Need Assistance?</h4>
                    <p className="text-gray-600 mb-4">
                      Our customer support team is available during working hours to help with any queries.
                    </p>
                    <Button className="w-full md:w-auto bg-ui-blue-500 hover:bg-ui-blue-600">Contact Us</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-ui-blue-600">Our Coverage Area</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                With branches strategically located across Kanyakumari District, we ensure our services are accessible to all.
              </p>
            </div>
            
            <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
              <p className="text-gray-600">Interactive Map Will Be Displayed Here</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Branches;

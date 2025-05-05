
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, CheckCircle, Calendar, CircleDollarSign, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-prince-green py-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
              <p className="text-xl text-white/90">
                Comprehensive solutions tailored to meet your documentation and financial needs.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        {/* Services Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="documentation" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="documentation">Documentation Services</TabsTrigger>
                <TabsTrigger value="loans">Loan Services</TabsTrigger>
              </TabsList>

              <TabsContent value="documentation" className="mt-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-bold mb-6">Documentation Services</h2>
                  <p className="text-gray-600 mb-8">
                    We offer a wide range of documentation services to help you navigate through complex paperwork and legal requirements. Our experienced team ensures accuracy, compliance, and timely completion of all documentation processes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {[
                      {
                        icon: <FileText className="h-8 w-8 text-prince-green" />,
                        title: "Property Registration",
                        description: "Complete property registration services including document verification, preparation, and submission.",
                      },
                      {
                        icon: <CheckCircle className="h-8 w-8 text-prince-green" />,
                        title: "Legal Documentation",
                        description: "Preparation and processing of various legal documents with proper authentication and verification.",
                      },
                      {
                        icon: <Calendar className="h-8 w-8 text-prince-green" />,
                        title: "License Applications",
                        description: "Assistance with various license applications and renewals for businesses and individuals.",
                      },
                      {
                        icon: <Shield className="h-8 w-8 text-prince-green" />,
                        title: "Notary Services",
                        description: "Professional notary services for document authentication and certification.",
                      },
                    ].map((service, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 mt-1 flex-shrink-0">{service.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-3">Why Choose Our Documentation Services?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-prince-green mr-2" />
                        <span>Experienced professionals handling your documentation needs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-prince-green mr-2" />
                        <span>Strict adherence to legal requirements and deadlines</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-prince-green mr-2" />
                        <span>Transparent pricing with no hidden charges</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-prince-green mr-2" />
                        <span>Regular updates on your application status</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <Button size="lg">
                      Schedule a Consultation
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="loans" className="mt-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-bold mb-6">Loan Services</h2>
                  <p className="text-gray-600 mb-8">
                    Our loan services are designed to provide flexible financial solutions with competitive rates, simple application processes, and quick approvals. We work with trusted financial institutions to secure the best terms for our clients.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {[
                      {
                        icon: <CircleDollarSign className="h-8 w-8 text-prince-green" />,
                        title: "Personal Loans",
                        description: "Quick personal loans with minimal documentation and competitive interest rates.",
                      },
                      {
                        icon: <CreditCard className="h-8 w-8 text-prince-green" />,
                        title: "Business Loans",
                        description: "Specialized business financing solutions to support growth and operations.",
                      },
                      {
                        icon: <Shield className="h-8 w-8 text-prince-green" />,
                        title: "Secured Loans",
                        description: "Lower interest rates with collateral-backed loan options for bigger financial needs.",
                      },
                      {
                        icon: <Calendar className="h-8 w-8 text-prince-green" />,
                        title: "Custom Financing",
                        description: "Tailored financing solutions designed around your specific requirements.",
                      },
                    ].map((service, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 mt-1 flex-shrink-0">{service.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button size="lg">
                      Apply for a Loan
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;

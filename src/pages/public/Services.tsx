
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
        <section className="relative bg-gradient-to-br from-ui-blue-600 to-ui-blue-500 py-24">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
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
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-lg">
                  <TabsTrigger value="documentation" className="rounded-md data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white">Documentation Services</TabsTrigger>
                  <TabsTrigger value="loans" className="rounded-md data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white">Loan Services</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="documentation" className="mt-8">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">Documentation Services</h2>
                  <p className="text-gray-600 mb-8">
                    We offer a wide range of documentation services to help you navigate through complex paperwork and legal requirements. Our experienced team ensures accuracy, compliance, and timely completion of all documentation processes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {[
                      {
                        icon: <FileText className="h-8 w-8 text-ui-blue-500" />,
                        title: "Property Registration",
                        description: "Complete property registration services including document verification, preparation, and submission.",
                      },
                      {
                        icon: <CheckCircle className="h-8 w-8 text-ui-blue-500" />,
                        title: "Legal Documentation",
                        description: "Preparation and processing of various legal documents with proper authentication and verification.",
                      },
                      {
                        icon: <Calendar className="h-8 w-8 text-ui-blue-500" />,
                        title: "License Applications",
                        description: "Assistance with various license applications and renewals for businesses and individuals.",
                      },
                      {
                        icon: <Shield className="h-8 w-8 text-ui-blue-500" />,
                        title: "Notary Services",
                        description: "Professional notary services for document authentication and certification.",
                      },
                    ].map((service, index) => (
                      <div key={index} className="flex p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="mr-4 mt-1 flex-shrink-0 p-2 bg-ui-blue-50 rounded-full">{service.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-ui-blue-50 p-6 rounded-lg mb-6 border border-ui-blue-100">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Why Choose Our Documentation Services?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                        <span>Experienced professionals handling your documentation needs</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                        <span>Strict adherence to legal requirements and deadlines</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                        <span>Transparent pricing with no hidden charges</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                        <span>Regular updates on your application status</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <Button size="lg" className="bg-ui-blue-500 hover:bg-ui-blue-600 text-white">
                      Schedule a Consultation
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="loans" className="mt-8">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">Loan Services</h2>
                  <p className="text-gray-600 mb-8">
                    Our loan services are designed to provide flexible financial solutions with competitive rates, simple application processes, and quick approvals. We work with trusted financial institutions to secure the best terms for our clients.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {[
                      {
                        icon: <CircleDollarSign className="h-8 w-8 text-ui-green-500" />,
                        title: "Personal Loans",
                        description: "Quick personal loans with minimal documentation and competitive interest rates.",
                      },
                      {
                        icon: <CreditCard className="h-8 w-8 text-ui-green-500" />,
                        title: "Business Loans",
                        description: "Specialized business financing solutions to support growth and operations.",
                      },
                      {
                        icon: <Shield className="h-8 w-8 text-ui-green-500" />,
                        title: "Secured Loans",
                        description: "Lower interest rates with collateral-backed loan options for bigger financial needs.",
                      },
                      {
                        icon: <Calendar className="h-8 w-8 text-ui-green-500" />,
                        title: "Custom Financing",
                        description: "Tailored financing solutions designed around your specific requirements.",
                      },
                    ].map((service, index) => (
                      <div key={index} className="flex p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="mr-4 mt-1 flex-shrink-0 p-2 bg-ui-green-50 rounded-full">{service.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-ui-green-50 p-6 rounded-lg mb-6 border border-ui-green-100">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Why Choose Our Loan Services?</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                        <span>Competitive interest rates tailored to your profile</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                        <span>Quick approval process with minimal documentation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                        <span>Flexible repayment terms to suit your financial situation</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                        <span>Dedicated relationship manager for personalized service</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <Button size="lg" className="bg-ui-green-500 hover:bg-ui-green-600 text-white">
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

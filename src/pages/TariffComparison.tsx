
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, X, Info, ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

const TariffComparison = () => {
  const [serviceType, setServiceType] = useState<"documentation" | "loans">("documentation");

  const documentationFeatures = [
    { id: "processing", name: "Processing Time", tooltip: "Average time required to complete the documentation process" },
    { id: "pickup", name: "Document Pickup", tooltip: "Service to collect documents from your location" },
    { id: "delivery", name: "Document Delivery", tooltip: "Service to deliver processed documents to your location" },
    { id: "verification", name: "Verification Support", tooltip: "Assistance with document verification process" },
    { id: "online", name: "Online Access", tooltip: "Access to documents and status updates through our online portal" },
    { id: "support", name: "Priority Support", tooltip: "Dedicated customer support with priority handling" },
    { id: "consultation", name: "Expert Consultation", tooltip: "Access to expert advice on documentation requirements" }
  ];

  const loanFeatures = [
    { id: "interest", name: "Interest Rate", tooltip: "Annual interest rate range applicable to the loan" },
    { id: "processing", name: "Processing Fee", tooltip: "One-time fee charged for processing the loan application" },
    { id: "term", name: "Maximum Term", tooltip: "Maximum duration for which the loan can be taken" },
    { id: "amount", name: "Maximum Amount", tooltip: "Maximum loan amount that can be approved" },
    { id: "prepayment", name: "Prepayment Charge", tooltip: "Fee applicable for repaying the loan before the agreed term" },
    { id: "approval", name: "Approval Time", tooltip: "Average time taken to approve the loan application" },
    { id: "requirements", name: "Documentation", tooltip: "Level of documentation required for loan approval" }
  ];

  const documentationPlans = [
    {
      name: "Standard",
      price: "₹1,500",
      features: {
        processing: "5-7 days",
        pickup: <X className="h-5 w-5 text-red-500 mx-auto" />,
        delivery: <X className="h-5 w-5 text-red-500 mx-auto" />,
        verification: "Basic",
        online: <X className="h-5 w-5 text-red-500 mx-auto" />,
        support: "Regular Hours",
        consultation: <X className="h-5 w-5 text-red-500 mx-auto" />
      }
    },
    {
      name: "Premium",
      price: "₹2,500",
      features: {
        processing: "3-5 days",
        pickup: <Check className="h-5 w-5 text-prince-green mx-auto" />,
        delivery: <Check className="h-5 w-5 text-prince-green mx-auto" />,
        verification: "Enhanced",
        online: <Check className="h-5 w-5 text-prince-green mx-auto" />,
        support: "Extended Hours",
        consultation: <X className="h-5 w-5 text-red-500 mx-auto" />
      },
      isRecommended: true
    },
    {
      name: "VIP",
      price: "₹4,000",
      features: {
        processing: "1-2 days",
        pickup: <Check className="h-5 w-5 text-prince-green mx-auto" />,
        delivery: <Check className="h-5 w-5 text-prince-green mx-auto" />,
        verification: "Premium",
        online: <Check className="h-5 w-5 text-prince-green mx-auto" />,
        support: "24/7",
        consultation: <Check className="h-5 w-5 text-prince-green mx-auto" />
      }
    }
  ];

  const loanPlans = [
    {
      name: "Personal Loan",
      price: "From 12% p.a.",
      features: {
        interest: "12% - 18%",
        processing: "2% of loan amount",
        term: "5 years",
        amount: "Up to ₹10 lakhs",
        prepayment: "2% after 6 months",
        approval: "3-5 days",
        requirements: "Moderate"
      }
    },
    {
      name: "Business Loan",
      price: "From 14% p.a.",
      features: {
        interest: "14% - 20%",
        processing: "1.5% of loan amount",
        term: "7 years",
        amount: "Up to ₹50 lakhs",
        prepayment: "3% after 1 year",
        approval: "5-7 days",
        requirements: "Extensive",
      },
      isRecommended: true
    },
    {
      name: "Secured Loan",
      price: "From 9% p.a.",
      features: {
        interest: "9% - 12%",
        processing: "1% of loan amount",
        term: "15 years",
        amount: "Up to ₹2 crores",
        prepayment: "1% after 2 years",
        approval: "7-10 days",
        requirements: "Very Extensive"
      }
    }
  ];

  const features = serviceType === "documentation" ? documentationFeatures : loanFeatures;
  const plans = serviceType === "documentation" ? documentationPlans : loanPlans;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <TooltipProvider>
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-ui-blue-600 to-ui-blue-500 py-24">
            <div className="absolute inset-x-0 bottom-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white h-16 w-full">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
              </svg>
            </div>
          
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Tariff Comparison</h1>
                <p className="text-xl text-white/90">
                  Compare our service plans to find the perfect fit for your needs.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <Card className="bg-white p-8 rounded-xl shadow-md border-0 mb-8">
                  <Tabs 
                    defaultValue="documentation" 
                    value={serviceType} 
                    onValueChange={(value) => setServiceType(value as "documentation" | "loans")}
                    className="mb-8"
                  >
                    <div className="flex justify-center mb-8">
                      <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-gray-100 rounded-lg">
                        <TabsTrigger 
                          value="documentation"
                          className="rounded-md data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white"
                        >
                          Documentation Services
                        </TabsTrigger>
                        <TabsTrigger 
                          value="loans"
                          className="rounded-md data-[state=active]:bg-ui-blue-500 data-[state=active]:text-white"
                        >
                          Loan Services
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="overflow-x-auto">
                      <div className="min-w-[900px]">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-1">
                            <div className="h-40 flex items-end pb-6 pl-6">
                              <h3 className="text-xl font-bold text-gray-700">Features</h3>
                            </div>
                            {features.map((feature, idx) => (
                              <div 
                                key={feature.id} 
                                className={`py-6 pl-6 pr-2 flex items-center ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} h-16`}
                              >
                                <div className="flex items-center">
                                  <span className="font-medium text-gray-700">{feature.name}</span>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="ml-1 cursor-help">
                                        <Info className="h-4 w-4 text-gray-400" />
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs">
                                      <p>{feature.tooltip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </div>
                            ))}
                            <div className="py-6 pl-6 h-20"></div>
                          </div>

                          {plans.map((plan, planIdx) => (
                            <div key={planIdx} className="col-span-1">
                              <div 
                                className={`h-40 rounded-t-xl pt-6 px-6 text-center relative ${
                                  plan.isRecommended ? 'bg-ui-blue-500 text-white' : 'bg-gray-100'
                                }`}
                              >
                                {plan.isRecommended && (
                                  <div className="absolute top-0 left-0 right-0 transform -translate-y-1/2 flex justify-center">
                                    <span className="bg-prince-accent text-white text-xs uppercase font-bold tracking-wider py-1 px-4 rounded-full">
                                      Recommended
                                    </span>
                                  </div>
                                )}
                                <h3 className={`text-2xl font-bold ${plan.isRecommended ? 'text-white' : 'text-gray-800'}`}>
                                  {plan.name}
                                </h3>
                                <div className={`text-3xl font-bold mt-2 ${plan.isRecommended ? 'text-white' : 'text-ui-blue-600'}`}>
                                  {plan.price}
                                </div>
                              </div>

                              {features.map((feature, featureIdx) => (
                                <div 
                                  key={feature.id}
                                  className={`py-6 px-6 text-center ${featureIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} h-16 ${
                                    plan.isRecommended ? 'border-l border-r border-ui-blue-100' : ''
                                  }`}
                                >
                                  {plan.features[feature.id]}
                                </div>
                              ))}

                              <div className={`py-6 px-6 text-center h-20 ${
                                plan.isRecommended ? 'bg-ui-blue-50' : 'bg-gray-50'
                              } rounded-b-xl`}
                              >
                                <Button 
                                  className={`w-full ${
                                    plan.isRecommended ? 'bg-ui-blue-500 hover:bg-ui-blue-600' : ''
                                  }`}
                                >
                                  Choose Plan
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tabs>
                </Card>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Info className="h-5 w-5 text-ui-blue-500 mr-2" />
                    Important Notes
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>All prices are subject to applicable taxes.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Services may vary based on specific requirements and location.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Additional charges may apply for complex documentation or loan conditions.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>Members receive additional discounts on all services. <a href="/membership" className="text-ui-blue-600 underline">Learn more about membership</a>.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-gray-600 mb-6 text-lg">Not sure which plan is right for you?</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg">
                      <a href="/contact">Schedule a Consultation</a>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <a href="/contact">Contact Our Team</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </TooltipProvider>
      <Footer />
    </div>
  );
};

export default TariffComparison;

interface Link {
  to: string;
  children: React.ReactNode;
}

const Link: React.FC<Link> = ({ to, children }) => (
  <a href={to}>{children}</a>
);

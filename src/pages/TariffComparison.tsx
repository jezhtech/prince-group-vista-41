
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, X, Info } from "lucide-react";

const TariffComparison = () => {
  const [serviceType, setServiceType] = useState<"documentation" | "loans">("documentation");

  const documentationFeatures = [
    { id: "processing", name: "Processing Time" },
    { id: "pickup", name: "Document Pickup" },
    { id: "delivery", name: "Document Delivery" },
    { id: "verification", name: "Verification Support" },
    { id: "online", name: "Online Access" },
    { id: "support", name: "Priority Support" },
    { id: "consultation", name: "Expert Consultation" }
  ];

  const loanFeatures = [
    { id: "interest", name: "Interest Rate" },
    { id: "processing", name: "Processing Fee" },
    { id: "term", name: "Maximum Term" },
    { id: "amount", name: "Maximum Amount" },
    { id: "prepayment", name: "Prepayment Charge" },
    { id: "approval", name: "Approval Time" },
    { id: "requirements", name: "Documentation" }
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
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-prince-green py-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Tariff Comparison</h1>
              <p className="text-xl text-white/90">
                Compare our service plans to find the perfect fit for your needs.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="documentation" value={serviceType} onValueChange={(value) => setServiceType(value as "documentation" | "loans")} className="mb-8">
                <div className="flex justify-center">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="documentation">Documentation Services</TabsTrigger>
                    <TabsTrigger value="loans">Loan Services</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 bg-gray-50 text-left text-gray-600 font-semibold w-1/4">Features</th>
                      {plans.map((plan, index) => (
                        <th key={index} className={`px-6 py-4 text-center relative ${plan.isRecommended ? 'bg-prince-green/10' : 'bg-gray-50'}`}>
                          {plan.isRecommended && (
                            <div className="absolute top-0 inset-x-0 -translate-y-full bg-prince-green text-white text-xs font-bold py-1 px-2">
                              RECOMMENDED
                            </div>
                          )}
                          <div className="text-xl font-bold">{plan.name}</div>
                          <div className="text-prince-green font-bold text-lg">{plan.price}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-medium flex items-center">
                          {feature.name}
                          <Info className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
                        </td>
                        {plans.map((plan, planIndex) => (
                          <td key={planIndex} className={`px-6 py-4 text-center ${plan.isRecommended ? 'bg-prince-green/5' : ''}`}>
                            {plan.features[feature.id]}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td className="px-6 py-4"></td>
                      {plans.map((plan, index) => (
                        <td key={index} className="px-6 py-6 text-center">
                          <Button className={`w-full ${plan.isRecommended ? 'bg-prince-green hover:bg-prince-accent' : ''}`}>
                            Choose Plan
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-12 bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Notes:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>All prices are subject to applicable taxes.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>Services may vary based on specific requirements and location.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>Additional charges may apply for complex documentation or loan conditions.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>Members receive additional discounts on all services. <a href="/membership" className="text-prince-green underline">Learn more about membership</a>.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Not sure which plan is right for you?</p>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Schedule a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
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

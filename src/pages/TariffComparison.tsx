
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

const TariffComparison = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-prince-green py-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Tariff Comparison</h1>
              <p className="text-xl text-white/90">
                Compare our service fees and find the best option for your needs.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Transparent Service Fees</h2>
              <p className="text-lg text-gray-600">
                We believe in complete transparency with our pricing. Compare our different service categories and see how our membership can save you money.
              </p>
            </div>

            <Tabs defaultValue="documentation" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="loans">Loan Services</TabsTrigger>
                <TabsTrigger value="other">Other Services</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documentation" className="mt-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="py-4 px-6 text-left font-semibold">Service</th>
                        <th className="py-4 px-6 text-center font-semibold">Regular Fee</th>
                        <th className="py-4 px-6 text-center font-semibold">Basic Member</th>
                        <th className="py-4 px-6 text-center font-semibold">Premium Member</th>
                        <th className="py-4 px-6 text-center font-semibold">VIP Member</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          service: "Property Registration",
                          regularFee: "₹2,500",
                          basicMember: "₹2,250",
                          premiumMember: "₹2,000",
                          vipMember: "₹1,750",
                        },
                        {
                          service: "Legal Documentation",
                          regularFee: "₹1,500",
                          basicMember: "₹1,350",
                          premiumMember: "₹1,200",
                          vipMember: "₹1,000",
                        },
                        {
                          service: "ID Verification",
                          regularFee: "₹800",
                          basicMember: "₹700",
                          premiumMember: "₹600",
                          vipMember: "₹500",
                        },
                        {
                          service: "Document Certification",
                          regularFee: "₹600",
                          basicMember: "₹500",
                          premiumMember: "₹400",
                          vipMember: "₹300",
                        },
                        {
                          service: "Notary Services",
                          regularFee: "₹800",
                          basicMember: "₹700",
                          premiumMember: "₹600",
                          vipMember: "₹500",
                        },
                        {
                          service: "License Application",
                          regularFee: "₹1,800",
                          basicMember: "₹1,650",
                          premiumMember: "₹1,500",
                          vipMember: "₹1,300",
                        },
                      ].map((row, index) => (
                        <tr key={index} className={`border-b border-gray-100 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                          <td className="py-4 px-6 font-medium">{row.service}</td>
                          <td className="py-4 px-6 text-center">{row.regularFee}</td>
                          <td className="py-4 px-6 text-center text-prince-green font-medium">
                            {row.basicMember}
                          </td>
                          <td className="py-4 px-6 text-center text-prince-green font-medium">
                            {row.premiumMember}
                          </td>
                          <td className="py-4 px-6 text-center text-prince-green font-medium">
                            {row.vipMember}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * Additional charges may apply based on complexity and regulatory requirements.
                </p>
              </TabsContent>

              <TabsContent value="loans" className="mt-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="py-4 px-6 text-left font-semibold">Loan Type</th>
                        <th className="py-4 px-6 text-center font-semibold">Regular Processing Fee</th>
                        <th className="py-4 px-6 text-center font-semibold">Basic Member</th>
                        <th className="py-4 px-6 text-center font-semibold">Premium Member</th>
                        <th className="py-4 px-6 text-center font-semibold">VIP Member</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          service: "Personal Loan",
                          regularFee: "₹2,000",
                          basicMember: "₹1,800",
                          premiumMember: "₹1,500",
                          vipMember: "₹1,200",
                        },
                        {
                          service: "Business Loan",
                          regularFee: "₹3,500",
                          basicMember: "₹3,200",
                          premiumMember: "₹2,800",
                          vipMember: "₹2,500",
                        },
                        {
                          service: "Home Loan",
                          regularFee: "₹5,000",
                          basicMember: "₹4,500",
                          premiumMember: "₹4,000",
                          vipMember: "₹3,500",
                        },
                        {
                          service: "Vehicle Loan",
                          regularFee: "₹2,500",
                          basicMember: "₹2,200",
                          premiumMember: "₹1,900",
                          vipMember: "₹1,500",
                        },
                        {
                          service: "Education Loan",
                          regularFee: "₹2,000",
                          basicMember: "₹1,800",
                          premiumMember: "₹1,500",
                          vipMember: "₹1,200",
                        },
                      ].map((row, index) => (
                        <tr key={index} className={`border-b border-gray-100 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                          <td className="py-4 px-6 font-medium">{row.service}</td>
                          <td className="py-4 px-6 text-center">{row.regularFee}</td>
                          <td className="py-4 px-6 text-center text-prince-green font-medium">
                            {row.basicMember}
                          </td>
                          <td className="py-4 px-6 text-center text-prince-green font-medium">
                            {row.premiumMember}
                          </td>
                          <td className="py-4 px-6 text-center text-prince-green font-medium">
                            {row.vipMember}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * Interest rates and terms vary based on loan amount, duration, and applicant's profile.
                </p>
              </TabsContent>

              <TabsContent value="other" className="mt-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="py-4 px-6 text-left font-semibold">Service</th>
                        <th className="py-4 px-6 text-center font-semibold">Regular Fee</th>
                        <th className="py-4 px-6 text-center font-semibold">Basic Member</th>
                        <th className="py-4 px-6 text-center font-semibold">Premium Member</th>
                        <th className="py-4 px-6 text-center font-semibold">VIP Member</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          service: "Event Registration",
                          regularFee: "₹500",
                          basicMember: "₹400",
                          premiumMember: "₹300",
                          vipMember: "Free",
                        },
                        {
                          service: "Financial Consultation",
                          regularFee: "₹1,500",
                          basicMember: "₹1,000",
                          premiumMember: "₹500",
                          vipMember: "Free",
                        },
                        {
                          service: "Document Storage (per year)",
                          regularFee: "₹1,200",
                          basicMember: "₹800",
                          premiumMember: "₹400",
                          vipMember: "Free",
                        },
                        {
                          service: "Express Processing",
                          regularFee: "₹2,000",
                          basicMember: "₹1,500",
                          premiumMember: "₹1,000",
                          vipMember: "₹500",
                        },
                      ].map((row, index) => (
                        <tr key={index} className={`border-b border-gray-100 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                          <td className="py-4 px-6 font-medium">{row.service}</td>
                          <td className="py-4 px-6 text-center">{row.regularFee}</td>
                          <td className="py-4 px-6 text-center text-prince-green font-medium">
                            {row.basicMember}
                          </td>
                          <td className="py-4 px-6 text-center text-prince-green font-medium">
                            {row.premiumMember}
                          </td>
                          <td className="py-4 px-6 text-center text-prince-green font-medium">
                            {row.vipMember}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Membership Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Membership Savings</h2>
              <p className="text-lg text-gray-600">
                See how our membership plans help you save on service fees and access exclusive benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Basic Membership",
                  price: "₹999/year",
                  savings: "10-15% on fees",
                  benefits: [
                    "Discounted service fees",
                    "Basic member support",
                    "Online document access",
                    "Monthly newsletter",
                    "Member-only events access"
                  ],
                },
                {
                  title: "Premium Membership",
                  price: "₹1,999/year",
                  savings: "20-30% on fees",
                  featured: true,
                  benefits: [
                    "All Basic benefits",
                    "Priority processing",
                    "Quarterly consultation",
                    "Exclusive member events",
                    "Discounted service fees",
                    "Priority member support"
                  ],
                },
                {
                  title: "VIP Membership",
                  price: "₹4,999/year",
                  savings: "30-50% on fees",
                  benefits: [
                    "All Premium benefits",
                    "Express processing",
                    "Dedicated account manager",
                    "Free attendance at events",
                    "Complimentary services",
                    "Monthly consultation",
                    "Custom membership card"
                  ],
                },
              ].map((plan, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg p-8 transform transition-transform duration-300 hover:-translate-y-1 relative ${
                    plan.featured 
                      ? "bg-prince-green text-white shadow-xl border-0" 
                      : "bg-white shadow-md border border-gray-100"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-prince-green px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <div className={`text-3xl font-bold mb-1 ${plan.featured ? "text-white" : "text-prince-green"}`}>
                      {plan.price}
                    </div>
                    <p className={plan.featured ? "text-white/80" : "text-gray-600"}>Avg. {plan.savings}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <Check 
                          className={`h-5 w-5 mr-3 flex-shrink-0 ${
                            plan.featured ? "text-white" : "text-prince-green"
                          }`} 
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <Button 
                      className={plan.featured 
                        ? "bg-white text-prince-green hover:bg-gray-100" 
                        : "bg-prince-green text-white hover:bg-prince-accent"
                      }
                      size="lg"
                    >
                      Choose Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default TariffComparison;


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleDollarSign, CreditCard, CheckCircle, Star, HelpCircle, List } from "lucide-react";
import StatisticsCard from "@/components/StatisticsCard";

const LoanServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ui-green-600 to-ui-green-500 py-24">
          <div className="absolute inset-0 bg-pattern opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Loan Services</h1>
              <p className="text-xl text-white/90">
                Flexible financial solutions to meet your needs
              </p>
              <Button size="lg" className="mt-8 bg-white text-ui-green-600 hover:bg-gray-100">
                Apply Now
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading-green">Our Loan Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer a variety of loan options with competitive rates and flexible terms to help you achieve your goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Personal Loans",
                  description: "Quick personal loans with minimal documentation and competitive interest rates for your immediate financial needs.",
                  icon: <CircleDollarSign className="h-8 w-8 text-ui-green-500" />
                },
                {
                  title: "Business Loans",
                  description: "Specialized business financing solutions to support growth, operations, and expansion of your enterprise.",
                  icon: <CreditCard className="h-8 w-8 text-ui-green-500" />
                },
                {
                  title: "Education Loans",
                  description: "Affordable education financing options to help students pursue higher education and career advancement.",
                  icon: <CircleDollarSign className="h-8 w-8 text-ui-green-500" />
                },
                {
                  title: "Home Loans",
                  description: "Long-term home financing solutions with attractive interest rates to help you purchase your dream home.",
                  icon: <CreditCard className="h-8 w-8 text-ui-green-500" />
                },
                {
                  title: "Vehicle Loans",
                  description: "Quick and convenient auto financing options for purchasing new or used vehicles with competitive terms.",
                  icon: <CircleDollarSign className="h-8 w-8 text-ui-green-500" />
                },
                {
                  title: "Gold Loans",
                  description: "Immediate financing against your gold assets with high valuation and flexible repayment options.",
                  icon: <CreditCard className="h-8 w-8 text-ui-green-500" />
                }
              ].map((service, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-ui-green-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Button variant="outline" className="w-full border-ui-green-200 text-ui-green-600 hover:bg-ui-green-50">
                    Learn More
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatisticsCard value="₹200Cr+" label="Loans Disbursed" variant="green" />
              <StatisticsCard value="15,000+" label="Happy Customers" variant="blue" />
              <StatisticsCard value="10+" label="Years of Service" variant="green" />
              <StatisticsCard value="98%" label="Approval Rate" variant="blue" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading-green">Why Choose Our Loan Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our loan services stand out with competitive rates, quick processing, and exceptional support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Competitive Rates",
                  description: "We offer some of the most competitive interest rates in the market, helping you save money."
                },
                {
                  title: "Quick Processing",
                  description: "Our streamlined process ensures quick loan approval and disbursement when you need it most."
                },
                {
                  title: "Minimal Documentation",
                  description: "We've simplified our documentation requirements to make the loan application process easier."
                },
                {
                  title: "Flexible Terms",
                  description: "Choose from a variety of repayment options that best suit your financial situation."
                },
                {
                  title: "No Hidden Charges",
                  description: "We believe in transparency with clear disclosure of all applicable fees and charges."
                },
                {
                  title: "Dedicated Support",
                  description: "Our loan specialists provide personalized guidance throughout your loan journey."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-ui-green-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="bg-ui-green-50 p-2 rounded-full mr-4">
                      <List className="h-5 w-5 text-ui-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 pl-14">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading-green">Loan Comparison</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Compare our loan options to find the right fit for your needs
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-ui-green-50">
                  <tr>
                    <th className="py-4 px-6 text-left">Loan Type</th>
                    <th className="py-4 px-6 text-center">Interest Rate</th>
                    <th className="py-4 px-6 text-center">Processing Fee</th>
                    <th className="py-4 px-6 text-center">Maximum Tenure</th>
                    <th className="py-4 px-6 text-center">Maximum Amount</th>
                    <th className="py-4 px-6 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Personal Loan",
                      rate: "12% - 18%",
                      fee: "2%",
                      tenure: "5 Years",
                      amount: "₹10 Lakhs"
                    },
                    {
                      type: "Business Loan",
                      rate: "14% - 20%",
                      fee: "1.5%",
                      tenure: "7 Years",
                      amount: "₹50 Lakhs"
                    },
                    {
                      type: "Home Loan",
                      rate: "8% - 10%",
                      fee: "0.5%",
                      tenure: "30 Years",
                      amount: "₹5 Crores"
                    },
                    {
                      type: "Vehicle Loan",
                      rate: "10% - 14%",
                      fee: "1%",
                      tenure: "7 Years",
                      amount: "₹25 Lakhs"
                    },
                    {
                      type: "Gold Loan",
                      rate: "9% - 12%",
                      fee: "1%",
                      tenure: "3 Years",
                      amount: "₹50 Lakhs"
                    }
                  ].map((loan, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-4 px-6 border-b border-gray-200">
                        <div className="font-semibold">{loan.type}</div>
                      </td>
                      <td className="py-4 px-6 text-center border-b border-gray-200">{loan.rate}</td>
                      <td className="py-4 px-6 text-center border-b border-gray-200">{loan.fee}</td>
                      <td className="py-4 px-6 text-center border-b border-gray-200">{loan.tenure}</td>
                      <td className="py-4 px-6 text-center border-b border-gray-200">{loan.amount}</td>
                      <td className="py-4 px-6 text-center border-b border-gray-200">
                        <Button size="sm" className="bg-ui-green-500 hover:bg-ui-green-600">Apply</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading-green">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our loan services
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "What documents do I need to apply for a loan?",
                    answer: "Generally, you'll need identity proof (Aadhaar, PAN), address proof, income proof (salary slips or bank statements), and employment details. Specific requirements may vary based on the loan type and amount."
                  },
                  {
                    question: "How long does the loan approval process take?",
                    answer: "Most loans are approved within 2-3 business days after submitting all required documents. Personal loans and gold loans can be approved even faster, sometimes within 24 hours."
                  },
                  {
                    question: "What factors affect my loan eligibility?",
                    answer: "Your loan eligibility depends on factors like income, credit score, existing debt obligations, employment stability, age, and the type of loan you're applying for."
                  },
                  {
                    question: "Can I repay my loan before the tenure ends?",
                    answer: "Yes, you can make prepayments or foreclose your loan. Some loans may have a nominal prepayment charge, while others offer this facility without any additional cost after a certain period."
                  },
                  {
                    question: "Is there a penalty for late payment?",
                    answer: "Yes, late payments incur a penalty fee and can negatively impact your credit score. The penalty amount varies based on the loan type and amount. We recommend setting up auto-payments to avoid missing due dates."
                  }
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center">
                        <HelpCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-9">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading-green">Customer Testimonials</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear what our clients have to say about our loan services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Vishal Mehta",
                  position: "Small Business Owner",
                  testimonial: "The business loan from Prince Group helped me expand my operations when I needed it most. The process was straightforward and the team was very supportive.",
                  rating: 5
                },
                {
                  name: "Anita Desai",
                  position: "IT Professional",
                  testimonial: "I got a personal loan for my wedding expenses, and I was impressed by how quickly it was approved. The interest rate was competitive and the EMI fits perfectly in my budget.",
                  rating: 5
                },
                {
                  name: "Kumar Rajan",
                  position: "Doctor",
                  testimonial: "The home loan process was smooth and transparent. The loan officer explained all terms clearly and helped me choose the best option for my situation.",
                  rating: 4
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 border-0 shadow-md">
                  <div className="flex items-center mb-4">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">{`"${testimonial.testimonial}"`}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-ui-green-600 to-ui-green-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Apply for a Loan?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today or visit any of our branches to discuss your financial needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-ui-green-600 hover:bg-gray-100">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LoanServices;

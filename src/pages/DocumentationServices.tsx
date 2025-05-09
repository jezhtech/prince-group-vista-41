
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, CheckCircle, Star, HelpCircle, List } from "lucide-react";
import StatisticsCard from "@/components/StatisticsCard";

const DocumentationServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ui-blue-600 to-ui-blue-500 py-24">
          <div className="absolute inset-0 bg-pattern opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Documentation Services</h1>
              <p className="text-xl text-white/90">
                Professional documentation solutions tailored to your needs
              </p>
              <Button size="lg" className="mt-8 bg-white text-ui-blue-600 hover:bg-gray-100">
                Schedule a Consultation
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Our Documentation Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer a comprehensive range of documentation services to help individuals and businesses navigate complex paperwork requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Property Registration",
                  description: "Complete property registration services including document verification, preparation, and submission.",
                  icon: <FileText className="h-8 w-8 text-ui-blue-500" />
                },
                {
                  title: "Legal Documentation",
                  description: "Preparation and processing of various legal documents with proper authentication and verification.",
                  icon: <CheckCircle className="h-8 w-8 text-ui-blue-500" />
                },
                {
                  title: "License Applications",
                  description: "Assistance with various license applications and renewals for businesses and individuals.",
                  icon: <FileText className="h-8 w-8 text-ui-blue-500" />
                },
                {
                  title: "Notary Services",
                  description: "Professional notary services for document authentication and certification.",
                  icon: <CheckCircle className="h-8 w-8 text-ui-blue-500" />
                },
                {
                  title: "Document Translation",
                  description: "Accurate translation of documents to and from multiple languages with certification.",
                  icon: <FileText className="h-8 w-8 text-ui-blue-500" />
                },
                {
                  title: "Document Verification",
                  description: "Thorough verification of documents to ensure authenticity and compliance with legal requirements.",
                  icon: <CheckCircle className="h-8 w-8 text-ui-blue-500" />
                }
              ].map((service, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-ui-blue-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Button variant="outline" className="w-full border-ui-blue-200 text-ui-blue-600 hover:bg-ui-blue-50">
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
              <StatisticsCard value="20,000+" label="Documents Processed" variant="blue" />
              <StatisticsCard value="98%" label="Customer Satisfaction" variant="green" />
              <StatisticsCard value="15+" label="Years of Experience" variant="blue" />
              <StatisticsCard value="20" label="Office Locations" variant="green" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Why Choose Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our documentation services stand out with exceptional quality, efficiency, and customer care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Professionals",
                  description: "Our team consists of experienced professionals with extensive knowledge in all documentation processes."
                },
                {
                  title: "Fast Turnaround",
                  description: "We prioritize quick processing without compromising on accuracy or quality."
                },
                {
                  title: "Complete Support",
                  description: "From initial consultation to final delivery, we provide comprehensive support throughout the process."
                },
                {
                  title: "Transparent Pricing",
                  description: "No hidden fees or surprises - our pricing structure is clear and upfront."
                },
                {
                  title: "Digital Access",
                  description: "Access your documents and track progress through our secure online portal."
                },
                {
                  title: "Custom Solutions",
                  description: "We tailor our services to meet your specific requirements and deadlines."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-ui-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="bg-ui-blue-50 p-2 rounded-full mr-4">
                      <List className="h-5 w-5 text-ui-blue-500" />
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
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Pricing Plans</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the right service package that fits your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Standard",
                  price: "₹1,500",
                  isPopular: false,
                  features: [
                    "Basic document processing",
                    "5-7 business days turnaround",
                    "Email support",
                    "Standard verification"
                  ]
                },
                {
                  title: "Premium",
                  price: "₹2,500",
                  isPopular: true,
                  features: [
                    "Priority document processing",
                    "3-5 business days turnaround",
                    "Phone & email support",
                    "Enhanced verification",
                    "Document pickup & delivery"
                  ]
                },
                {
                  title: "VIP",
                  price: "₹4,000",
                  isPopular: false,
                  features: [
                    "Express document processing",
                    "1-2 business days turnaround",
                    "24/7 dedicated support",
                    "Premium verification",
                    "Document pickup & delivery",
                    "Expert consultation"
                  ]
                }
              ].map((plan, index) => (
                <Card key={index} className={`overflow-hidden ${plan.isPopular ? 'border-2 border-ui-blue-500 shadow-lg' : 'border border-gray-200'}`}>
                  {plan.isPopular && (
                    <div className="bg-ui-blue-500 text-white text-center py-1 text-sm font-medium">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <div className="text-4xl font-bold text-ui-blue-600 mb-6">{plan.price}</div>
                    <div className="space-y-3 mb-8 text-left">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-ui-green-500 mr-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full ${plan.isPopular ? 'bg-ui-blue-500 hover:bg-ui-blue-600' : ''}`}>
                      Choose Plan
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our documentation services
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "What documents do I need for property registration?",
                    answer: "For property registration, you'll typically need property title documents, identity proof, address proof, photographs, and any relevant agreements or NOCs. Our team will guide you through the specific requirements based on your situation."
                  },
                  {
                    question: "How long does the documentation process take?",
                    answer: "The processing time varies depending on the type of document and the service package you choose. Standard processing takes 5-7 business days, Premium is 3-5 business days, and VIP service can be completed in 1-2 business days."
                  },
                  {
                    question: "Do you provide document pickup and delivery services?",
                    answer: "Yes, document pickup and delivery services are included in our Premium and VIP packages. For Standard packages, these services can be availed for an additional fee."
                  },
                  {
                    question: "What areas do you service?",
                    answer: "We provide documentation services throughout Kanyakumari district through our network of 20 branch offices. For specific locations, please check our branches page or contact our customer support."
                  },
                  {
                    question: "Is online document submission possible?",
                    answer: "Yes, many documents can be submitted online through our secure portal. However, some documentation processes may require in-person verification or submission of physical documents depending on regulatory requirements."
                  }
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center">
                        <HelpCircle className="h-5 w-5 text-ui-blue-500 mr-2" />
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
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Customer Testimonials</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear what our clients have to say about our services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rajesh Kumar",
                  position: "Business Owner",
                  testimonial: "The documentation services provided by Prince Group were exceptional. They handled all the paperwork for my new business license with remarkable efficiency.",
                  rating: 5
                },
                {
                  name: "Priya Sharma",
                  position: "Homeowner",
                  testimonial: "I was amazed by how smoothly the property registration process went with Prince Group's help. Their team managed everything professionally and saved me a lot of time.",
                  rating: 5
                },
                {
                  name: "Sanjay Patel",
                  position: "Restaurant Manager",
                  testimonial: "Getting all the licenses for my new restaurant was a breeze thanks to Prince Group. Their staff was knowledgeable and supportive throughout the entire process.",
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
        <section className="py-16 bg-gradient-to-r from-ui-blue-600 to-ui-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and let us handle all your documentation needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-ui-blue-600 hover:bg-gray-100">
                Schedule a Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View All Services
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentationServices;


import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Users, CheckCircle, Shield, FileText, CreditCard, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-prince-green to-prince-accent">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Welcome to Prince Group
              </h1>
              <p className="text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Your trusted partner for document registration, loan services, and membership benefits across Kanyakumari District.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Button asChild className="bg-white text-prince-green hover:bg-gray-100 px-8 py-6 text-lg">
                  <Link to="/services">Our Services</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Prince Group</h2>
              <p className="text-lg text-gray-600">
                We're committed to providing exceptional service and value to our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="h-12 w-12 text-prince-green" />,
                  title: "Membership Benefits",
                  description:
                    "Join our exclusive membership program to enjoy special benefits, discounts, and priority access to events.",
                },
                {
                  icon: <MapPin className="h-12 w-12 text-prince-green" />,
                  title: "20+ Branches",
                  description:
                    "With over 20 branches across Kanyakumari District, we're always nearby to serve you.",
                },
                {
                  icon: <Clock className="h-12 w-12 text-prince-green" />,
                  title: "Quick Processing",
                  description:
                    "Experience efficient service delivery with our streamlined processes and dedicated team.",
                },
                {
                  icon: <CheckCircle className="h-12 w-12 text-prince-green" />,
                  title: "Expert Support",
                  description:
                    "Our knowledgeable team ensures you receive professional guidance every step of the way.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border border-gray-100"
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
              <p className="text-lg text-gray-600">Explore our comprehensive range of services designed to meet your needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <FileText className="h-12 w-12 text-prince-green" />,
                  title: "Documentation Services",
                  description: "Professional assistance with all your documentation needs including registration, verification, and processing.",
                  path: "/services"
                },
                {
                  icon: <CreditCard className="h-12 w-12 text-prince-green" />,
                  title: "Loan Services",
                  description: "Comprehensive loan services with competitive rates and flexible terms for individuals and businesses.",
                  path: "/services#loans"
                },
                {
                  icon: <Calendar className="h-12 w-12 text-prince-green" />,
                  title: "Event Management",
                  description: "Discover and participate in exclusive events organized for our members and the community.",
                  path: "/events"
                },
                {
                  icon: <Users className="h-12 w-12 text-prince-green" />,
                  title: "Membership Programs",
                  description: "Join our tiered membership programs to access premium benefits, discounts, and exclusive services.",
                  path: "/membership"
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="p-8">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <Button asChild>
                      <Link to={service.path}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tariff Comparison Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Transparent Pricing</h2>
              <p className="text-lg text-gray-600">
                We believe in complete transparency with our service fees. No hidden charges, ever.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-prince-green text-white">
                      <th className="py-4 px-6 text-left">Service</th>
                      <th className="py-4 px-6 text-center">Regular Fee</th>
                      <th className="py-4 px-6 text-center">Member Fee</th>
                      <th className="py-4 px-6 text-center">Processing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        service: "Property Registration",
                        regularFee: "₹2,500",
                        memberFee: "₹2,000",
                        time: "3-5 days",
                      },
                      {
                        service: "Legal Documentation",
                        regularFee: "₹1,500",
                        memberFee: "₹1,200",
                        time: "2-3 days",
                      },
                      {
                        service: "License Application",
                        regularFee: "₹1,800",
                        memberFee: "₹1,500",
                        time: "5-7 days",
                      },
                      {
                        service: "Notary Services",
                        regularFee: "₹800",
                        memberFee: "₹600",
                        time: "Same day",
                      },
                      {
                        service: "Personal Loan Processing",
                        regularFee: "₹2,000",
                        memberFee: "₹1,500",
                        time: "2-3 days",
                      },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-6 font-medium">{row.service}</td>
                        <td className="py-4 px-6 text-center">{row.regularFee}</td>
                        <td className="py-4 px-6 text-center text-prince-green font-medium">
                          {row.memberFee}
                        </td>
                        <td className="py-4 px-6 text-center">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                <Button asChild>
                  <Link to="/tariff-comparison">View Full Tariff Comparison <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-prince-green to-prince-accent">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What Our Clients Say</h2>
              <p className="text-lg text-white/90">
                Don't just take our word for it. See what our clients have to say about us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Prince Group helped me navigate the complex loan process with ease. Their staff was knowledgeable and supportive throughout.",
                  author: "Ramesh Kumar",
                  position: "Business Owner",
                },
                {
                  quote: "The documentation services are quick and reliable. I've been a member for 3 years and always receive excellent customer service.",
                  author: "Priya Sharma",
                  position: "Regular Customer",
                },
                {
                  quote: "Their membership program offers great benefits. The exclusive events and discounts have more than paid for the membership fee.",
                  author: "Suresh Patel",
                  position: "Premium Member",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="text-5xl text-prince-green mb-6">"</div>
                  <p className="text-gray-600 mb-8">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Branches Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Branches</h2>
              <p className="text-lg text-gray-600">
                With 20 branches spread across Kanyakumari District, we're always nearby to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Nagercoil Headquarters",
                  address: "Sri Sai Complex, Court Road, Vepamoodu Junction",
                  phone: "9150537718",
                },
                {
                  name: "Thuckalay Branch",
                  address: "123 Main Street, Thuckalay",
                  phone: "9385722102",
                },
                {
                  name: "Marthandam Branch",
                  address: "45 Gandhi Road, Marthandam",
                  phone: "9876543210",
                },
              ].map((branch, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-prince-green">{branch.name}</h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-prince-green mr-3 mt-1 flex-shrink-0" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-prince-green mr-3 flex-shrink-0" />
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild>
                <Link to="/branches">View All Branches <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Events Preview Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Upcoming Events</h2>
              <p className="text-lg text-gray-600">
                Join us for educational workshops, seminars, and networking opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Document Registration Workshop",
                  date: "Jun 15, 2023",
                  location: "Nagercoil Main Branch",
                  image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
                },
                {
                  title: "Financial Planning Seminar",
                  date: "Jun 22, 2023",
                  location: "Thuckalay Branch",
                  image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
                },
                {
                  title: "Loan Application Workshop",
                  date: "Jun 29, 2023",
                  location: "Marthandam Branch",
                  image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
                },
              ].map((event, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="h-48 relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-prince-green text-white py-1 px-3 text-sm font-medium">
                      {event.date}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 text-prince-green mr-2" />
                      <span className="text-gray-600">{event.location}</span>
                    </div>
                    <Button asChild>
                      <Link to="/events">Register Now</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link to="/events">View All Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Membership CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-gradient-to-r from-prince-green to-prince-accent rounded-xl overflow-hidden shadow-xl">
              <div className="px-6 py-12 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Join thousands of satisfied customers who trust Prince Group for their documentation and loan services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-white text-prince-green hover:bg-gray-100 px-8 py-6 text-lg">
                    <Link to="/membership">Become a Member</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default Index;

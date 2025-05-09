
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ChevronRight, Award, BarChart, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatisticsCard from "@/components/StatisticsCard";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-prince-dark to-prince-green py-24">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
          <div className="absolute inset-x-0 bottom-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white h-16 w-full">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
            </svg>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
              <p className="text-xl text-white/90">
                Learn about our mission, values, and the team behind Prince Group.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-16 relative z-10">
              <StatisticsCard value="2010" label="Year Established" variant="blue" />
              <StatisticsCard value="20+" label="Branch Locations" variant="green" />
              <StatisticsCard value="150+" label="Team Members" variant="blue" />
              <StatisticsCard value="50,000+" label="Happy Clients" variant="green" />
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-6 inline-block">
                  <div className="bg-prince-light text-prince-green text-sm font-semibold py-1 px-3 rounded-full">
                    OUR JOURNEY
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2010, Prince Group started with a vision to simplify documentation services in Kanyakumari district. What began as a small office with three dedicated staff members has now grown into a network of over 20 branches serving thousands of satisfied customers.
                </p>
                <p className="text-gray-600 mb-6">
                  Our journey has been marked by continuous improvement, innovation, and an unwavering commitment to customer satisfaction. Today, we are proud to be the leading documentation and loan service provider in the region.
                </p>
                <p className="text-gray-600 mb-8">
                  As we continue to grow, our focus remains on delivering exceptional service quality, embracing technological advancements, and expanding our offerings to meet the evolving needs of our clients.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-ui-blue-500 hover:bg-ui-blue-600">
                    Learn More
                  </Button>
                  <Button variant="outline" className="border-ui-blue-200 text-ui-blue-600 hover:bg-ui-blue-50">
                    Our Services
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-8 -left-8 bg-ui-blue-100 w-full h-full rounded-xl"></div>
                <div className="absolute -bottom-8 -right-8 bg-ui-green-100 w-full h-full rounded-xl"></div>
                <div className="bg-gray-200 h-96 rounded-lg relative z-10 flex items-center justify-center">
                  <div className="text-gray-400 text-lg">Company Image</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-6 inline-block">
                <div className="bg-prince-light text-prince-green text-sm font-semibold py-1 px-3 rounded-full">
                  OUR PURPOSE
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Mission & Vision</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our guiding principles that drive everything we do at Prince Group
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-ui-blue-500 hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 bg-ui-blue-50 rounded-full inline-block mb-6">
                  <Shield className="h-8 w-8 text-ui-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  To provide accessible, efficient, and reliable documentation and loan services that simplify processes for our clients while maintaining the highest standards of quality and integrity.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-ui-blue-50 p-1 rounded-full mr-3 mt-1.5">
                      <Check className="h-4 w-4 text-ui-blue-500" />
                    </div>
                    <span className="text-gray-700">Simplify complex documentation processes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-ui-blue-50 p-1 rounded-full mr-3 mt-1.5">
                      <Check className="h-4 w-4 text-ui-blue-500" />
                    </div>
                    <span className="text-gray-700">Ensure accuracy and compliance in all services</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-ui-blue-50 p-1 rounded-full mr-3 mt-1.5">
                      <Check className="h-4 w-4 text-ui-blue-500" />
                    </div>
                    <span className="text-gray-700">Deliver exceptional customer experience</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-ui-green-500 hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 bg-ui-green-50 rounded-full inline-block mb-6">
                  <BarChart className="h-8 w-8 text-ui-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Our Vision</h3>
                <p className="text-gray-600 mb-6">
                  To be recognized as the premier provider of documentation and financial services across Tamil Nadu, known for our innovation, reliability, and customer-centric approach.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-ui-green-50 p-1 rounded-full mr-3 mt-1.5">
                      <Check className="h-4 w-4 text-ui-green-500" />
                    </div>
                    <span className="text-gray-700">Expand our services throughout Tamil Nadu</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-ui-green-50 p-1 rounded-full mr-3 mt-1.5">
                      <Check className="h-4 w-4 text-ui-green-500" />
                    </div>
                    <span className="text-gray-700">Continuously adapt to changing customer needs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-ui-green-50 p-1 rounded-full mr-3 mt-1.5">
                      <Check className="h-4 w-4 text-ui-green-500" />
                    </div>
                    <span className="text-gray-700">Lead the industry in digital transformation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-6 inline-block">
                <div className="bg-prince-light text-prince-green text-sm font-semibold py-1 px-3 rounded-full">
                  OUR PRINCIPLES
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The foundational principles that guide our conduct and decisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Integrity",
                  description: "We uphold the highest ethical standards in all our interactions and services.",
                  icon: <Shield className="h-8 w-8 text-ui-blue-500" />
                },
                {
                  title: "Excellence",
                  description: "We strive for perfection in our work and continuously improve our services.",
                  icon: <Award className="h-8 w-8 text-ui-green-500" />
                },
                {
                  title: "Customer First",
                  description: "Our clients' needs are at the center of everything we do.",
                  icon: <Users className="h-8 w-8 text-ui-blue-500" />
                },
                {
                  title: "Innovation",
                  description: "We embrace new ideas and technologies to enhance our service delivery.",
                  icon: <BarChart className="h-8 w-8 text-ui-green-500" />
                }
              ].map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className={`p-4 ${index % 2 === 0 ? 'bg-ui-blue-50' : 'bg-ui-green-50'} rounded-full inline-block mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-6 inline-block">
                <div className="bg-prince-light text-prince-green text-sm font-semibold py-1 px-3 rounded-full">
                  OUR PEOPLE
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Leadership Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated professionals who lead Prince Group
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Rajesh Kumar",
                  position: "Founder & CEO",
                  bio: "With over 20 years of experience in the industry, Rajesh founded Prince Group with a vision to revolutionize documentation services."
                },
                {
                  name: "Priya Sharma",
                  position: "Operations Director",
                  bio: "Priya oversees all operational aspects of our 20+ branches, ensuring consistent service quality and customer satisfaction."
                },
                {
                  name: "Anand Patel",
                  position: "Finance Manager",
                  bio: "Anand brings 15 years of financial expertise, managing our loan services and ensuring compliance with regulatory requirements."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-64 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">Photo</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-ui-blue-600 font-medium mb-4">{member.position}</p>
                    <p className="text-gray-600">{member.bio}</p>
                    <div className="mt-6 flex space-x-2">
                      <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-6">
                Our team consists of over 150 dedicated professionals working across 20+ branches.
              </p>
              <Button asChild className="bg-ui-blue-500 hover:bg-ui-blue-600">
                <a href="/contact">Join Our Team</a>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-ui-blue-600 to-ui-blue-400 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about our services and how we can assist you
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-ui-blue-600 hover:bg-gray-100">
                Contact Us
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Services
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

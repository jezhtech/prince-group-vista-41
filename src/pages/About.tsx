
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-prince-green py-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
              <p className="text-xl text-white/90">
                Learn about our mission, values, and the team behind Prince Group.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2010, Prince Group started with a vision to simplify documentation services in Kanyakumari district. What began as a small office with three dedicated staff members has now grown into a network of over 20 branches serving thousands of satisfied customers.
                </p>
                <p className="text-gray-600 mb-6">
                  Our journey has been marked by continuous improvement, innovation, and an unwavering commitment to customer satisfaction. Today, we are proud to be the leading documentation and loan service provider in the region.
                </p>
                <p className="text-gray-600">
                  As we continue to grow, our focus remains on delivering exceptional service quality, embracing technological advancements, and expanding our offerings to meet the evolving needs of our clients.
                </p>
              </div>
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                <div className="text-gray-400 text-lg">Company Image</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-prince-green">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  To provide accessible, efficient, and reliable documentation and loan services that simplify processes for our clients while maintaining the highest standards of quality and integrity.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>Simplify complex documentation processes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>Ensure accuracy and compliance in all services</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>Deliver exceptional customer experience</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-prince-green">Our Vision</h3>
                <p className="text-gray-600 mb-6">
                  To be recognized as the premier provider of documentation and financial services across Tamil Nadu, known for our innovation, reliability, and customer-centric approach.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>Expand our services throughout Tamil Nadu</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>Continuously adapt to changing customer needs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5" />
                    <span>Lead the industry in digital transformation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Leadership Team</h2>
              <p className="text-lg text-gray-600">
                Meet the dedicated professionals who lead Prince Group.
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
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Photo</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-prince-green font-medium mb-4">{member.position}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button asChild>
                <a href="/contact">Contact Our Team</a>
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

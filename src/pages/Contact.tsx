
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(formData);
      
      toast({
        title: "Message Sent Successfully",
        description: "We've received your message and will get back to you soon.",
        action: (
          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        ),
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-ui-blue-500" />,
      title: "Our Headquarters",
      content: "Sri Sai Complex, Court Road, Vepamoodu Junction, Nagercoil, Tamil Nadu, India - 629001"
    },
    {
      icon: <Phone className="h-6 w-6 text-ui-blue-500" />,
      title: "Phone",
      content: "+91 9150537718, +91 9385722102"
    },
    {
      icon: <Mail className="h-6 w-6 text-ui-blue-500" />,
      title: "Email",
      content: "info@princegroup.com"
    },
    {
      icon: <Clock className="h-6 w-6 text-ui-blue-500" />,
      title: "Working Hours",
      content: "Monday to Friday: 9am to 6pm\nSaturday: 9am to 2pm\nSunday: Closed"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-ui-blue-600 to-ui-blue-400 py-24">
          <div className="absolute inset-x-0 bottom-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-white h-16 w-full">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
              <p className="text-xl text-white/90">
                Get in touch with our team. We're here to help you.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Contact Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16 mb-16">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-ui-blue-50 rounded-bl-full opacity-30"></div>
                    <div className="mb-4 p-3 bg-ui-blue-50 rounded-lg inline-block">
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 gradient-heading">Get In Touch</h2>
                  <p className="text-gray-600 mb-8">
                    We'd love to hear from you. Please fill out the form, and we'll get back to you as soon as possible.
                  </p>

                  <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="border-gray-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="border-gray-200"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          className="border-gray-200"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className="border-gray-200"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message..."
                          rows={5}
                          className="border-gray-200 resize-none"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-ui-blue-500 hover:bg-ui-blue-600 flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : (
                          <>
                            Send Message
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-gray-500 mt-3 text-center">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </form>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-6 gradient-heading">Find Us</h2>
                  <p className="text-gray-600 mb-8">
                    Visit our headquarters or any of our <a href="/branches" className="text-ui-blue-600 hover:underline">20+ branches</a> across Kanyakumari district.
                  </p>

                  <div className="rounded-xl overflow-hidden mb-8 shadow-md border border-gray-200 h-[400px]">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15779.002034272029!2d77.41286905!3d8.173896899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f13b953de0f5%3A0x4e16c20259c28428!2sNagercoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715246423969!5m2!1sen!2sin" 
                      width="100%" 
                      height="400" 
                      style={{ border: 0 }} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Prince Group Location"
                    ></iframe>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800">What are your operating hours?</h4>
                        <p className="text-gray-600 mt-1">We're open Monday to Friday from 9am to 6pm, and Saturday from 9am to 2pm. We're closed on Sundays and public holidays.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">How can I check the status of my application?</h4>
                        <p className="text-gray-600 mt-1">You can check your application status by calling our customer service line or visiting your nearest branch with your application reference number.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Do you provide doorstep services?</h4>
                        <p className="text-gray-600 mt-1">Yes, we offer doorstep document collection and delivery services for certain service plans. Please contact us for more details.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

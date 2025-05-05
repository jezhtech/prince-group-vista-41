
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Membership = () => {
  const membershipPlans = [
    {
      title: "Basic",
      price: "₹999",
      benefits: [
        "Access to basic documentation services",
        "Standard processing time",
        "Basic member support",
        "Online access to your documents",
        "Monthly newsletter"
      ],
      isPopular: false,
      buttonText: "Get Started"
    },
    {
      title: "Premium",
      price: "₹1,999",
      benefits: [
        "Priority documentation services",
        "Faster processing time",
        "Priority member support",
        "Online access to your documents",
        "Exclusive member events",
        "Discounted service fees",
        "Quarterly consultation"
      ],
      isPopular: true,
      buttonText: "Select Plan"
    },
    {
      title: "VIP",
      price: "₹4,999",
      benefits: [
        "All Premium benefits",
        "Express processing time",
        "Dedicated account manager",
        "Unlimited document access",
        "Free attendance at all events",
        "Complimentary add-on services",
        "Monthly consultation",
        "Custom membership card"
      ],
      isPopular: false,
      buttonText: "Go VIP"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-prince-green py-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Become a Member</h1>
              <p className="text-xl text-white/90">
                Join our community and enjoy exclusive benefits and services.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Membership</h2>
              <p className="text-lg text-gray-600">
                Select the plan that best fits your needs. Upgrade or downgrade anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipPlans.map((plan, index) => (
                <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden relative transition-transform hover:-translate-y-1 hover:shadow-lg ${
                  plan.isPopular ? "border-2 border-prince-green" : "border border-gray-200"
                }`}>
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-prince-green text-white text-xs font-semibold py-1 px-4 transform rotate-45 translate-y-[6px] translate-x-[30px] shadow-md">
                        Popular
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className={`text-xl font-semibold mb-2 ${
                      plan.isPopular ? "text-prince-green" : "text-gray-800"
                    }`}>
                      {plan.title}
                    </h3>
                    <div className="mb-6">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.price !== "Free" && <span className="text-gray-600">/month</span>}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-prince-green mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 pb-6">
                    <Button className={`w-full ${
                      plan.isPopular 
                        ? "bg-prince-green hover:bg-prince-accent" 
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}>
                      {plan.buttonText}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600">
                All plans include a 30-day money-back guarantee. Need help choosing? <a href="/contact" className="text-prince-green font-medium hover:underline">Contact our team</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {[
                  {
                    q: "How do I become a member?",
                    a: "You can become a member by selecting one of our membership plans and completing the registration process online or at any of our branches."
                  },
                  {
                    q: "Can I upgrade my membership later?",
                    a: "Yes, you can upgrade your membership at any time. The price difference will be prorated based on the remaining time in your current membership."
                  },
                  {
                    q: "Are there any hidden fees?",
                    a: "No, all membership fees are transparent and clearly listed. There are no hidden or additional charges."
                  },
                  {
                    q: "What if I'm not satisfied with my membership?",
                    a: "We offer a 30-day money-back guarantee if you're not satisfied with your membership for any reason."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Membership;

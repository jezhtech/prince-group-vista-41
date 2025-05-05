
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-prince-green py-16">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
              <p className="text-lg text-white/90">
                Last updated: May 5, 2023
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-white transform -skew-y-3"></div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using Prince Group's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                </p>

                <h2>2. Description of Services</h2>
                <p>
                  Prince Group provides documentation services, loan services, and membership programs as described on our website and in our promotional materials. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
                </p>

                <h2>3. User Responsibilities</h2>
                <p>
                  Users of our services agree to:
                </p>
                <ul>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of their account credentials</li>
                  <li>Notify us immediately of any unauthorized use of their account</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>

                <h2>4. Fees and Payment</h2>
                <p>
                  Fees for our services are as published on our website or as quoted by our representatives. All fees are subject to change with reasonable notice. Payment is required in advance for most services, and we accept various payment methods as specified at the time of service.
                </p>

                <h2>5. Refund Policy</h2>
                <p>
                  Our refund policy varies by service. For membership fees, we offer a 30-day money-back guarantee if you are not satisfied. For specific service fees, refunds may be issued at our discretion and will depend on the stage of service completion. Processing fees and government charges are typically non-refundable.
                </p>

                <h2>6. Intellectual Property</h2>
                <p>
                  All content on our website and our service materials, including text, graphics, logos, and software, is the property of Prince Group and protected by intellectual property laws. Users may not reproduce, distribute, or create derivative works without our express permission.
                </p>

                <h2>7. Limitation of Liability</h2>
                <p>
                  Prince Group will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claim arising from our services will not exceed the amount you paid for the specific service in question.
                </p>

                <h2>8. Privacy</h2>
                <p>
                  Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                </p>

                <h2>9. Changes to Terms</h2>
                <p>
                  We may modify these Terms at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes your acceptance of the modified terms.
                </p>

                <h2>10. Contact Information</h2>
                <p>
                  If you have questions about these Terms, please contact us at:<br />
                  Prince Group<br />
                  Sri Sai Complex, Court Road<br />
                  Vepamoodu Junction, Nagercoil<br />
                  Tamil Nadu, India - 629001<br />
                  Phone: 9150537718, 9385722102<br />
                  Email: info@jeztechnologies.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;

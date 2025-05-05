
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
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
                <h2>1. Introduction</h2>
                <p>
                  These Terms and Conditions govern your use of services provided by Prince Group ("we," "our," or "us") including our website, mobile applications, and physical branches. By accessing or using our services, you agree to be bound by these Terms and Conditions.
                </p>

                <h2>2. Definitions</h2>
                <p>
                  <strong>"Services"</strong> refers to documentation services, loan services, membership benefits, and any other services offered by Prince Group.
                </p>
                <p>
                  <strong>"User"</strong> or <strong>"you"</strong> refers to any individual or entity that uses our Services.
                </p>
                <p>
                  <strong>"Member"</strong> refers to Users who have subscribed to one of our membership plans.
                </p>

                <h2>3. Service Terms</h2>
                <h3>3.1 Documentation Services</h3>
                <p>
                  Prince Group provides various documentation services, including but not limited to property registration, legal documentation, and notary services. All documentation services are subject to applicable laws and regulations.
                </p>
                
                <h3>3.2 Loan Services</h3>
                <p>
                  Our loan services are provided in partnership with licensed financial institutions. All loan applications are subject to credit approval and terms and conditions set by our partner financial institutions.
                </p>
                
                <h3>3.3 Membership Services</h3>
                <p>
                  Membership benefits are subject to the tier of membership purchased. Benefits may change from time to time, and we reserve the right to modify membership benefits with reasonable notice.
                </p>

                <h2>4. User Responsibilities</h2>
                <p>
                  You agree to:
                </p>
                <ul>
                  <li>Provide accurate and complete information when using our Services</li>
                  <li>Maintain the confidentiality of any account information and passwords</li>
                  <li>Use our Services in compliance with all applicable laws and regulations</li>
                  <li>Not engage in any fraudulent or deceptive practices when using our Services</li>
                </ul>

                <h2>5. Fees and Payments</h2>
                <p>
                  Our service fees are as published in our fee schedule, which may be updated from time to time. Members receive discounted fees as per their membership tier. All fees are non-refundable unless otherwise specified.
                </p>

                <h2>6. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Prince Group shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our Services.
                </p>

                <h2>7. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend your access to our Services at any time for violation of these Terms and Conditions or for any other reason at our sole discretion.
                </p>

                <h2>8. Changes to Terms</h2>
                <p>
                  We may modify these Terms and Conditions at any time. Your continued use of our Services following any changes constitutes your acceptance of the modified Terms and Conditions.
                </p>

                <h2>9. Governing Law</h2>
                <p>
                  These Terms and Conditions are governed by the laws of India, without regard to its conflict of law principles.
                </p>

                <h2>10. Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <p>
                  Prince Group<br />
                  Sri Sai Complex, Court Road, Vepamoodu Junction<br />
                  Nagercoil, Tamil Nadu, India - 629001<br />
                  Phone: 9150537718, 9385722102<br />
                  Email: info@princegroup.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default Terms;

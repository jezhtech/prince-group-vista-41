
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-prince-green py-16">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
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
                  This Privacy Policy explains how Prince Group ("we," "our," or "us") collects, uses, and discloses your personal information when you use our services, visit our website, or interact with us in any way.
                </p>

                <h2>2. Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, such as:
                </p>
                <ul>
                  <li>Contact information (name, email address, phone number, etc.)</li>
                  <li>Identity information for documentation services</li>
                  <li>Financial information for loan services</li>
                  <li>Account login credentials</li>
                  <li>Feedback and correspondence</li>
                </ul>

                <p>
                  We also automatically collect certain information when you use our services, including:
                </p>
                <ul>
                  <li>Device information</li>
                  <li>Log information</li>
                  <li>Usage information</li>
                  <li>Location information</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Develop new products and services</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                  <li>Personalize your experience</li>
                </ul>

                <h2>4. Information Sharing</h2>
                <p>
                  We may share your information with:
                </p>
                <ul>
                  <li>Service providers who perform services on our behalf</li>
                  <li>Financial institutions for loan processing</li>
                  <li>Government authorities when required by law</li>
                  <li>Professional advisors such as lawyers and auditors</li>
                </ul>

                <p>
                  We will not sell or rent your personal information to third parties for marketing purposes without your explicit consent.
                </p>

                <h2>5. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                </p>

                <h2>6. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>

                <h2>7. Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Request restriction of processing your personal information</li>
                  <li>Request transfer of your personal information</li>
                </ul>

                <h2>8. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p>
                  Prince Group<br />
                  Sri Sai Complex, Court Road, Vepamoodu Junction<br />
                  Nagercoil, Tamil Nadu, India - 629001<br />
                  Phone: 9150537718, 9385722102<br />
                  Email: privacy@princegroup.com
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

export default Privacy;

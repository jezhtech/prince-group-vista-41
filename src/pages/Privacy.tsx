
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
                <h2>Overview</h2>
                <p>
                  This Privacy Policy explains how Prince Group collects, uses, and discloses your personal information when you use our services, visit our website, or interact with us in any way.
                </p>

                <h2>Information We Collect</h2>
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

                <h2>How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative information, updates, and promotional materials</li>
                  <li>Respond to comments, questions, and requests</li>
                  <li>Analyze usage patterns and optimize user experience</li>
                  <li>Protect against fraud and unauthorized access</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>Information Sharing</h2>
                <p>
                  We may share your information with:
                </p>
                <ul>
                  <li>Service providers who perform services on our behalf</li>
                  <li>Financial institutions for loan processing</li>
                  <li>Government authorities when required by law</li>
                  <li>Professional advisors such as lawyers and accountants</li>
                  <li>Business partners with your consent</li>
                </ul>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2>Your Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul>
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your information</li>
                  <li>Restriction or objection to processing</li>
                  <li>Data portability</li>
                </ul>

                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date, and the updated version will be effective as soon as it is accessible.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:<br />
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

export default Privacy;

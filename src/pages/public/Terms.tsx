import { Helmet } from "react-helmet-async";
import MainNavbar from "@/components/MainNavbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Shield,
  Users,
  CreditCard,
  RefreshCw,
  Copyright,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Info,
  Scale,
} from "lucide-react";
import MainFooter from "@/components/MainFooter";

const Terms = () => {
  const lastUpdated = "May 5, 2023";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Terms and Conditions | Prince Group</title>
        <meta
          name="description"
          content="Read Prince Group's terms and conditions for using our documentation and loan services."
        />
      </Helmet>
      <MainNavbar />

      <main className="flex-grow pt-[60px] sm:pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary/80 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Scale className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Terms & Conditions
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Please read these terms carefully before using our services.
              </p>
              <div className="flex items-center justify-center gap-4 text-white/80">
                <Calendar className="w-5 h-5" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 rotate-180">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-12"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="white"
                opacity=".25"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                fill="white"
                opacity=".5"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                fill="white"
              ></path>
            </svg>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Overview Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Info className="w-6 h-6" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using Prince Group's services, you agree to
                    be bound by these Terms and Conditions. If you do not agree
                    to these terms, please do not use our services. These terms
                    apply to all users of our services, including documentation
                    services, loan services, and membership programs.
                  </p>
                </CardContent>
              </Card>

              {/* Services Description */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <FileText className="w-6 h-6" />
                    Description of Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Prince Group provides comprehensive documentation
                      services, loan services, and membership programs as
                      described on our website and in our promotional materials.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-foreground">
                          Documentation
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Legal document processing
                        </p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-foreground">
                          Loan Services
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Financial assistance
                        </p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-foreground">
                          Membership
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Exclusive benefits
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Responsibilities */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Users className="w-6 h-6" />
                    User Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Users of our services agree to:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-sm">
                            Provide accurate and complete information
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-sm">
                            Maintain account confidentiality
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-sm">
                            Notify of unauthorized account use
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                          <span className="text-sm">
                            Comply with applicable laws
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fees and Payment */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <CreditCard className="w-6 h-6" />
                    Fees and Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Fees for our services are as published on our website or
                      as quoted by our representatives. All fees are subject to
                      change with reasonable notice.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">
                          Payment Requirements
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">
                              Payment required in advance
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">
                              Multiple payment methods accepted
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">
                              Fees subject to change
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">
                          Accepted Methods
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Cash</Badge>
                          <Badge variant="secondary">Bank Transfer</Badge>
                          <Badge variant="secondary">UPI</Badge>
                          <Badge variant="secondary">Cards</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Refund Policy */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <RefreshCw className="w-6 h-6" />
                    Refund Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Our refund policy varies by service and is designed to be
                      fair to both parties.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">
                            Membership Fees
                          </h4>
                          <p className="text-sm text-green-700">
                            30-day money-back guarantee if not satisfied
                          </p>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">
                            Service Fees
                          </h4>
                          <p className="text-sm text-blue-700">
                            Refunds at our discretion based on completion stage
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h4 className="font-semibold text-yellow-800 mb-2">
                            Processing Fees
                          </h4>
                          <p className="text-sm text-yellow-700">
                            Typically non-refundable
                          </p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-semibold text-red-800 mb-2">
                            Government Charges
                          </h4>
                          <p className="text-sm text-red-700">
                            Non-refundable as per regulations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Intellectual Property */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Copyright className="w-6 h-6" />
                    Intellectual Property
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      All content on our website and our service materials,
                      including text, graphics, logos, and software, is the
                      property of Prince Group and protected by intellectual
                      property laws.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Restrictions
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">
                            No reproduction without permission
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">
                            No distribution of materials
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">No derivative works</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Limitation of Liability */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Shield className="w-6 h-6" />
                    Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Prince Group will not be liable for any indirect,
                      incidental, special, consequential, or punitive damages
                      arising from your use of our services.
                    </p>
                    <div className="bg-white/50 p-4 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-foreground mb-2">
                        Maximum Liability
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Our total liability for any claim arising from our
                        services will not exceed the amount you paid for the
                        specific service in question.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Reference */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Shield className="w-6 h-6" />
                    Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Your use of our services is also governed by our Privacy
                      Policy, which is incorporated into these Terms by
                      reference.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Privacy Policy
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Please review our Privacy Policy to understand how we
                        collect, use, and protect your information.
                      </p>
                      <a
                        href="/privacy"
                        className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                      >
                        <FileText className="w-4 h-4" />
                        View Privacy Policy
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Changes to Terms */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <RefreshCw className="w-6 h-6" />
                    Changes to Terms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We may modify these Terms at any time. Any changes will be
                      effective immediately upon posting on our website.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        Important Notice
                      </h4>
                      <p className="text-sm text-yellow-700">
                        Your continued use of our services after changes are
                        posted constitutes your acceptance of the modified
                        terms.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Mail className="w-6 h-6" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    If you have questions about these Terms, please contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold text-foreground">
                            Address
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Thingal Nager
                            <br />
                            Vepamoodu Junction, Nagercoil
                            <br />
                            Tamil Nadu, India - 629001
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="font-semibold text-foreground">
                            Phone
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            9150537718, 9385722102
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Email</h4>
                        <a
                          href="mailto:info@jeztechnologies.com"
                          className="text-sm text-primary hover:underline"
                        >
                          info@jeztechnologies.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
};

export default Terms;

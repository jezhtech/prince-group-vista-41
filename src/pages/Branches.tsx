
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail } from 'lucide-react';

const Branches = () => {
  const branches = [
    {
      id: 1,
      name: "Nagercoil Headquarters",
      address: "Sri Sai Complex, Court Road, Vepamoodu Junction, Nagercoil",
      phone: "9150537718",
      email: "nagercoil@princegroup.com",
      region: "central"
    },
    {
      id: 2,
      name: "Thuckalay Branch",
      address: "123 Main Street, Thuckalay",
      phone: "9385722102",
      email: "thuckalay@princegroup.com",
      region: "north"
    },
    {
      id: 3,
      name: "Marthandam Branch",
      address: "45 Gandhi Road, Marthandam",
      phone: "9876543210",
      email: "marthandam@princegroup.com",
      region: "north"
    },
    {
      id: 4,
      name: "Colachel Branch",
      address: "78 Beach Road, Colachel",
      phone: "8765432109",
      email: "colachel@princegroup.com",
      region: "south"
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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Branches</h1>
              <p className="text-xl text-white/90">
                20 branches across Kanyakumari District to serve you better.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Find a Branch Near You</h2>
              <p className="text-gray-600">
                With 20 branches spread across Kanyakumari District, we're always nearby to assist you with your documentation and loan needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map(branch => (
                <div key={branch.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-prince-green">{branch.name}</h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-prince-green mr-3 mt-1 flex-shrink-0" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-prince-green mr-3 flex-shrink-0" />
                        <a href={`tel:${branch.phone}`} className="hover:text-prince-green">
                          {branch.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-prince-green mr-3 flex-shrink-0" />
                        <a href={`mailto:${branch.email}`} className="hover:text-prince-green">
                          {branch.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-gray-50 text-center">
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-prince-green hover:underline inline-flex items-center"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> View on Map
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Branches;

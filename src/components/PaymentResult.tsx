import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  CheckCircle,
  Home,
  Ticket,
  Calendar,
  MapPin,
  Music,
  Star,
  Sparkles,
} from "lucide-react";

export const PaymentResult = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation after component mounts
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleViewBookings = () => {
    navigate("/member/tickets");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-10 md:pt-0 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 rounded-full animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                backgroundColor: [
                  "#ff6b6b",
                  "#4ecdc4",
                  "#45b7d1",
                  "#96ceb4",
                  "#feca57",
                ][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full p-4 md:p-8 space-y-6 shadow-2xl border border-white/20">
          {/* Success Icon with Animation */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-green-500 rounded-full p-4 animate-bounce">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 text-lg">
              Your concert tickets have been successfully booked!
            </p>
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <Sparkles className="h-5 w-5 animate-spin" />
              <span>Payment Successful</span>
              <Sparkles className="h-5 w-5 animate-spin" />
            </div>
          </div>

          {/* Event Details Card */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Music className="h-5 w-5 text-pink-600" />
              Event Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  September 20, 2025 • 5:00 PM
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Concordia High School Ground, Nagercoil
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-700">
                  Featuring: Aditya Rkay, Sri Nisha, Aparnaa Pratheep
                </span>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          {/* <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-medium text-gray-800">BK{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tickets:</span>
                <span className="font-medium text-gray-800">2x VIP Pass</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-green-600">₹2,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">Confirmed</span>
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleViewBookings}
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Ticket className="mr-2 h-5 w-5" />
              View My Bookings
            </Button>
            <Button
              variant="outline"
              onClick={handleGoHome}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p>You will receive a confirmation email shortly.</p>
            <p>Please arrive 30 minutes before the event starts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

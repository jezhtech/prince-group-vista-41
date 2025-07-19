import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Booking } from '@/types';

interface TicketPDFProps {
  booking: Booking;
  eventDetails: {
    name: string;
    date: string;
    time: string;
    location: string;
    performers: string[];
  };
}

const TicketPDF: React.FC<TicketPDFProps> = ({ booking, eventDetails }) => {
  return (
    <div 
      id="ticket-pdf"
      className="w-[800px] h-[400px] bg-gradient-to-br from-[#0c1e3c] via-[#0e253f] to-[#1a365d] text-white relative overflow-hidden"
      style={{
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        borderRadius: '20px',
        border: '2px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)
          `
        }}
      />

      <div className="relative z-10 p-8 h-full flex">
        {/* Left Side - Booking Details */}
        <div className="flex-1 pr-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ec4899] to-[#db2777] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎫</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ec4899] to-[#db2777] bg-clip-text text-transparent">
                Prince Group Vista
              </h1>
            </div>
            <p className="text-[#a0aec0] text-sm">Booking Confirmation</p>
          </div>

          {/* Booking Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#ec4899] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📅</span>
                </div>
                <span className="text-[#a0aec0] text-sm font-medium">Booking Number</span>
              </div>
              <p className="text-white font-mono font-bold ml-8">{booking.bookingNumber}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#f59e0b] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🎫</span>
                </div>
                <span className="text-[#a0aec0] text-sm font-medium">Ticket Type</span>
              </div>
              <p className="text-white font-semibold ml-8">{booking.ticket?.type || 'Standard'}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#f59e0b] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📊</span>
                </div>
                <span className="text-[#a0aec0] text-sm font-medium">Number of Tickets</span>
              </div>
              <p className="text-white font-semibold ml-8">{booking.ticketCount}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#10b981] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💰</span>
                </div>
                <span className="text-[#a0aec0] text-sm font-medium">Total Amount</span>
              </div>
              <p className="text-white font-semibold ml-8">₹{booking.paymentPrice}</p>
            </div>
          </div>

          {/* Booking Date */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#8b5cf6] rounded-full flex items-center justify-center">
                <span className="text-white text-xs">📅</span>
              </div>
              <div>
                <p className="text-[#a0aec0] text-sm">Booking Date</p>
                <p className="text-white font-semibold">
                  {new Date(booking.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - QR Code */}
        <div className="w-48 flex flex-col items-center justify-center">
          {/* QR Code Container */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-white/20">
            <QRCodeSVG
              value={booking.bookingNumber}
              size={120}
              level="H"
              includeMargin={true}
              className="mb-3"
            />
            <div className="text-center">
              <p className="text-[#0c1e3c] text-xs font-bold mb-1">ENTRY PASS</p>
              <p className="text-[#0c1e3c] text-xs">Scan for entry</p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="w-8 h-8 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-xs">🔒</span>
            </div>
            <p className="text-[#a0aec0] text-xs font-medium">Secure Entry</p>
            <p className="text-[#718096] text-xs">Valid ID required</p>
          </div>
        </div>
      </div>

      {/* Generation Date */}
      <div className="absolute bottom-4 right-8">
        <div className="text-[#a0aec0] text-xs">
          Generated on {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TicketPDF; 
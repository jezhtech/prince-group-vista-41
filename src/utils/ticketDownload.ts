import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { Booking } from '@/types';

interface EventDetails {
  name: string;
  date: string;
  time: string;
  location: string;
  performers: string[];
}

// Generate QR code using qrcode library directly
const generateQRCode = async (text: string, size: number = 120): Promise<string> => {
  try {
    const qrDataURL = await QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    });
    return qrDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    // Fallback to a simple text-based QR-like pattern
    return generateFallbackQR(text, size);
  }
};

// Fallback QR code generation using canvas
const generateFallbackQR = (text: string, size: number = 120): string => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  
  // Generate a simple pattern based on the text
  const cellSize = size / 25;
  const hash = text.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Create pattern
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      const shouldFill = (hash + i * 31 + j * 17) % 3 === 0;
      if (shouldFill) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
  }
  
  // Add corner markers
  ctx.fillStyle = '#000000';
  // Top-left corner
  ctx.fillRect(0, 0, 7 * cellSize, 7 * cellSize);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cellSize, cellSize, 5 * cellSize, 5 * cellSize);
  ctx.fillStyle = '#000000';
  ctx.fillRect(2 * cellSize, 2 * cellSize, 3 * cellSize, 3 * cellSize);
  
  // Top-right corner
  ctx.fillStyle = '#000000';
  ctx.fillRect(18 * cellSize, 0, 7 * cellSize, 7 * cellSize);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(19 * cellSize, cellSize, 5 * cellSize, 5 * cellSize);
  ctx.fillStyle = '#000000';
  ctx.fillRect(20 * cellSize, 2 * cellSize, 3 * cellSize, 3 * cellSize);
  
  // Bottom-left corner
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 18 * cellSize, 7 * cellSize, 7 * cellSize);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cellSize, 19 * cellSize, 5 * cellSize, 5 * cellSize);
  ctx.fillStyle = '#000000';
  ctx.fillRect(2 * cellSize, 20 * cellSize, 3 * cellSize, 3 * cellSize);
  
  return canvas.toDataURL();
};

export const downloadTicketPDF = async (booking: Booking, eventDetails: EventDetails) => {
  try {
    // Generate QR code
    const qrCodeDataURL = await generateQRCode(booking.bookingNumber, 120);
    
    // Create HTML content matching the email confirmation design
    const ticketHTML = `
      <div style="
        width: 800px; 
        background: #fff;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
        overflow: visible;
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(135deg, #4eb4a7 0%, #60afb4 100%);
          color: white;
          padding: 40px;
          text-align: center;
        ">
          <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
          <h1 style="margin: 0; font-size: 32px;">Payment Successful!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">Your concert tickets have been confirmed</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px;">
          <h2 style="margin: 0 0 20px 0; color: #333;">Hello!</h2>
          <p style="margin: 0 0 30px 0; color: #666;">Thank you for your payment. Your booking has been successfully confirmed!</p>
          
          <!-- Ticket Card -->
          <div style="
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            border-left: 5px solid #4eb4a7;
          ">
            <h3 style="color: #4eb4a7; margin: 0 0 20px 0; font-size: 24px;">🎫 Ticket Details</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 15px 0;">
              <span style="font-size: 18px; font-weight: bold;">${booking.ticket?.type || 'Standard'}</span>
              <span style="font-size: 20px; font-weight: bold; color: #4eb4a7;">${booking.ticketCount} tickets</span>
            </div>
            <div style="margin-top: 20px;">
              <span style="font-size: 24px; font-weight: bold; color: #28a745;">₹${booking.paymentPrice}</span>
              <span style="color: #666; font-size: 14px;"> (Total Amount Paid)</span>
            </div>
          </div>
          
          <!-- Booking Details -->
          <div style="
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin: 25px 0;
          ">
            <h3 style="color: #495057; margin: 0 0 20px 0; font-size: 20px;">📋 Booking Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
              <div>
                <strong>Booking Number:</strong><br>
                <span style="color: #4eb4a7; font-family: monospace; font-size: 16px;">${booking.bookingNumber}</span>
              </div>
              <div>
                <strong>Payment Status:</strong><br>
                <span style="color: #28a745; font-weight: bold;">✅ Confirmed</span>
              </div>
              <div>
                <strong>Tickets Paid For:</strong><br>
                <span style="font-weight: bold;">${booking.ticketCount}</span>
              </div>
              <div>
                <strong>Booking Date:</strong><br>
                <span style="font-weight: bold;">${new Date(booking.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </div>
          
          <!-- Event Details -->
          <div style="
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 20px;
            border-radius: 10px;
            margin: 25px 0;
          ">
            <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 20px;">🎵 Event Details</h3>
            <div style="margin: 15px 0;">
              <strong>Event:</strong> ${eventDetails.name}<br>
              <strong>Date & Time:</strong> ${eventDetails.date} at ${eventDetails.time}<br>
              <strong>Venue:</strong> ${eventDetails.location}<br>
              <strong>Artists:</strong> ${eventDetails.performers.join(', ')}
            </div>
          </div>
          
          <!-- QR Section -->
          <div style="
            background: #e9ecef;
            border: 2px dashed #adb5bd;
            border-radius: 10px;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
          ">
            <h4 style="margin: 0 0 20px 0; color: #666; font-size: 18px;">🎫 Entry Pass</h4>
            <p style="color: #666; margin-bottom: 20px;">Scan this QR code at the venue for entry</p>
            ${qrCodeDataURL ? 
              `<div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; display: inline-block;">
                <img src="${qrCodeDataURL}" alt="QR Code for Booking ${booking.bookingNumber}" style="width: 120px; height: 120px; display: block; margin: 0 auto;" />
              </div>` :
              `<div style="background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; display: inline-block;">
                <div style="width: 120px; height: 120px; background: #f8f9fa; border: 2px dashed #adb5bd; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666; font-size: 12px;">
                  QR Code<br>Unavailable
                </div>
              </div>`
            }
            <p style="color: #666; font-size: 12px; margin-top: 15px;">
              <strong>Booking Number:</strong> ${booking.bookingNumber}
            </p>
          </div>
          
          <!-- Important Note -->
          <div style="
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
          ">
            <h4 style="margin: 0 0 10px 0; color: #856404;">⚠️ Important Information</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Please arrive 30 minutes before the event starts</li>
              <li>Bring a valid ID for verification</li>
              <li>Entry will be denied without proper identification</li>
              <li>No outside food or beverages allowed</li>
              <li>Parking is available at the venue</li>
            </ul>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          color: #666;
        ">
          <p style="margin: 0 0 10px 0;"><strong>Prince Group Vista</strong></p>
          <p style="margin: 0 0 10px 0;">Thank you for choosing us for your entertainment!</p>
          <p style="font-size: 12px; color: #999; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;

    // Create a temporary div with the ticket content
    const ticketDiv = document.createElement('div');
    ticketDiv.innerHTML = ticketHTML;
    ticketDiv.style.position = 'absolute';
    ticketDiv.style.left = '-9999px';
    ticketDiv.style.top = '0';
    document.body.appendChild(ticketDiv);

    // Wait for the content to render
    await new Promise(resolve => setTimeout(resolve, 100));

    // Get the actual content element
    const contentElement = ticketDiv.firstElementChild as HTMLElement;
    
    // Get the actual height of the content
    const actualHeight = contentElement.scrollHeight;
    const actualWidth = contentElement.scrollWidth;

    // Convert to canvas with dynamic height
    const canvas = await html2canvas(contentElement, {
      width: actualWidth,
      height: actualHeight,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calculate dimensions to fit the content properly
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Calculate scaling to fit the image within the PDF page
    const scaleX = pdfWidth / imgWidth;
    const scaleY = pdfHeight / imgHeight;
    const scale = Math.min(scaleX, scaleY) * 0.95; // 95% to add some margin
    
    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;
    
    // Center the image on the page
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);

    // Generate filename
    const filename = `ticket-${booking.bookingNumber}-${eventDetails.name.replace(/\s+/g, '-').toLowerCase()}.pdf`;

    // Download PDF
    pdf.save(filename);

    // Clean up
    document.body.removeChild(ticketDiv);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate ticket PDF');
  }
};

// Use the same HTML approach for consistency
export const downloadTicketPDFSimple = async (booking: Booking, eventDetails: EventDetails) => {
  return downloadTicketPDF(booking, eventDetails);
}; 
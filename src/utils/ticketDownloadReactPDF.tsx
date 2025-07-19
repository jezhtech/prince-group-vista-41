import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import QRCode from "qrcode";
import { Booking } from "@/types";

interface EventDetails {
  name: string;
  date: string;
  time: string;
  location: string;
  performers: string[];
}

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: "#4eb4a7",
    color: "white",
    padding: 15,
    textAlign: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    opacity: 0.9,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4eb4a7",
    marginBottom: 8,
  },
  ticketCard: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #e9ecef",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    minHeight: 24,
  },
  label: {
    fontSize: 10,
    color: "#666",
    fontWeight: "bold",
    flex: 1,
    marginRight: 15,
    maxWidth: "40%",
  },
  value: {
    fontSize: 10,
    color: "#333",
    flex: 2,
    textAlign: "right",
    maxWidth: "60%",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
    flex: 2,
    textAlign: "right",
    maxWidth: "60%",
  },
  eventDetails: {
    backgroundColor: "#fff3cd",
    border: "1px solid #ffeaa7",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  qrSection: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
    padding: 20,
    border: "2px dashed #adb5bd",
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4eb4a7",
  },
  qrCode: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 8,
    color: "#666",
  },
  important: {
    backgroundColor: "#fff3cd",
    borderLeft: "4px solid #ffc107",
    padding: 8,
    marginTop: 12,
  },
  importantTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 4,
  },
  importantText: {
    fontSize: 8,
    color: "#856404",
    marginBottom: 2,
  },
  pageBreak: {
    pageBreakBefore: "always",
  },
});

// Helper function to truncate long text
const truncateText = (text: string, maxLength: number = 30): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// Generate QR code as base64
const generateQRCodeAsBase64 = async (text: string): Promise<string> => {
  try {
    const base64String = await QRCode.toDataURL(text, {
      width: 120,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });

    return base64String;
  } catch (error) {
    console.error("❌ Error generating QR code:", error);
    return "";
  }
};

// PDF Document Component
const TicketPDFDocument: React.FC<{
  booking: Booking;
  eventDetails: EventDetails;
  qrCodeBase64: string;
}> = ({ booking, eventDetails, qrCodeBase64 }) => (
  <Document>
    {/* First Page - Main Ticket Information */}
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment Successful!</Text>
        <Text style={styles.headerSubtitle}>
          Your concert tickets have been confirmed
        </Text>
      </View>

      {/* Ticket Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ticket Details</Text>
        <View style={styles.ticketCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Ticket Type:</Text>
            <Text style={styles.value}>
              {booking.ticket?.type || "Standard"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Number of Tickets:</Text>
            <Text style={styles.value}>{booking.ticketCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Amount:</Text>
            <Text style={styles.price}>Rs. {booking.paymentPrice}</Text>
          </View>
        </View>
      </View>

      {/* Booking Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Information</Text>
        <View style={styles.ticketCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Booking Number:</Text>
            <Text style={styles.value}>{booking.bookingNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Status:</Text>
            <Text style={styles.value}>{booking.paymentStatus}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Booking Date:</Text>
            <Text style={styles.value}>
              {new Date(booking.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>
      </View>

      {/* Event Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Details</Text>
        <View style={styles.eventDetails}>
          <View style={styles.row}>
            <Text style={styles.label}>Event:</Text>
            <Text style={styles.value}>
              {truncateText(eventDetails.name, 35)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date & Time:</Text>
            <Text style={styles.value}>
              {truncateText(`${eventDetails.date} at ${eventDetails.time}`, 40)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Venue:</Text>
            <Text style={styles.value}>
              {truncateText(eventDetails.location, 35)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Artists:</Text>
            <Text style={styles.value}>
              {truncateText(eventDetails.performers.join(", "), 40)}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Prince Group Vista</Text>
        <Text>Thank you for choosing us for your entertainment!</Text>
        <Text>Generated on {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>

    {/* Second Page - QR Code and Important Information */}
    <Page size="A4" style={styles.page}>
      {/* QR Code Section */}
      <View style={styles.qrSection}>
        <Text style={styles.qrTitle}>Entry Pass</Text>
        {qrCodeBase64 && <Image src={qrCodeBase64} style={styles.qrCode} />}
        <Text style={styles.value}>
          Booking Number: {booking.bookingNumber}
        </Text>
      </View>

      {/* Important Information */}
      <View style={styles.important}>
        <Text style={styles.importantTitle}>Important Information</Text>
        <Text style={styles.importantText}>
          • Please arrive 30 minutes before the event starts
        </Text>
        <Text style={styles.importantText}>
          • Bring a valid ID for verification
        </Text>
        <Text style={styles.importantText}>
          • Entry will be denied without proper identification
        </Text>
        <Text style={styles.importantText}>
          • No outside food or beverages allowed
        </Text>
        <Text style={styles.importantText}>
          • Parking is available at the venue
        </Text>
      </View>

      {/* Additional Event Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        <View style={styles.ticketCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Event Name:</Text>
            <Text style={styles.value}>
              {truncateText(eventDetails.name, 35)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Booking Reference:</Text>
            <Text style={styles.value}>
              {truncateText(booking.bookingNumber, 25)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ticket Count:</Text>
            <Text style={styles.value}>{booking.ticketCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Paid:</Text>
            <Text style={styles.price}>Rs. {booking.paymentPrice}</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Prince Group Vista</Text>
        <Text>Thank you for choosing us for your entertainment!</Text>
        <Text>Generated on {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

export const downloadTicketPDFReactPDF = async (
  booking: Booking,
  eventDetails: EventDetails
) => {
  try {
    // Generate QR code as base64 first
    const qrCodeBase64 = await generateQRCodeAsBase64(booking.bookingNumber);

    // Create the PDF document
    const pdfDoc = (
      <TicketPDFDocument
        booking={booking}
        eventDetails={eventDetails}
        qrCodeBase64={qrCodeBase64}
      />
    );

    // Generate PDF blob
    const pdfBlob = await pdf(pdfDoc).toBlob();

    // Generate filename
    const filename = `ticket-${booking.bookingNumber}-${eventDetails.name
      .replace(/\s+/g, "-")
      .toLowerCase()}.pdf`;

    // Download the PDF
    saveAs(pdfBlob, filename);

    return true;
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    throw new Error("Failed to generate ticket PDF");
  }
};

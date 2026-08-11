package com.klu.service;

import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Element;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfPCell;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.Booking;
import com.klu.repository.BookingRepository;

@Service
public class PdfInvoiceService {

    @Autowired
    private BookingRepository bookingRepository;

    public byte[] generateInvoicePdf(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found: " + bookingId));

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Header Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, Color.BLUE);
            Paragraph title = new Paragraph("B1K SERVICES - INVOICE", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" "));

            // Booking Details Table
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);

            addCell(table, "Invoice Number:", "INV-" + booking.getId() + "-" + System.currentTimeMillis() / 1000);
            addCell(table, "Booking Date:", booking.getBookingDate() != null ? booking.getBookingDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) : "N/A");
            addCell(table, "Customer Name:", booking.getUser() != null ? booking.getUser().getName() : "N/A");
            addCell(table, "Customer Contact:", booking.getUser() != null ? booking.getUser().getPhone() : "N/A");
            addCell(table, "Service Address:", booking.getAddress());
            addCell(table, "Service Name:", booking.getService() != null ? booking.getService().getName() : "N/A");
            addCell(table, "Diagnosed Issue:", booking.getIssue() != null ? booking.getIssue().getTitle() : "N/A");
            addCell(table, "Technician:", booking.getTechnician() != null ? booking.getTechnician().getName() : "Unassigned");
            addCell(table, "Status:", booking.getStatus());
            addCell(table, "Total Amount Paid:", "₹" + booking.getTotalPrice());

            document.add(table);

            document.add(new Paragraph(" "));
            Font footerFont = FontFactory.getFont(FontFactory.HELVETICA, 10, Font.ITALIC, Color.GRAY);
            Paragraph footer = new Paragraph("Thank you for using B1K Services! For support, email admin@b1kservices.com", footerFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF invoice: " + e.getMessage(), e);
        }

        return out.toByteArray();
    }

    private void addCell(PdfPTable table, String label, String value) {
        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

        PdfPCell cell1 = new PdfPCell(new Paragraph(label, boldFont));
        cell1.setPadding(8);
        cell1.setBackgroundColor(new Color(240, 240, 240));

        PdfPCell cell2 = new PdfPCell(new Paragraph(value, normalFont));
        cell2.setPadding(8);

        table.addCell(cell1);
        table.addCell(cell2);
    }
}

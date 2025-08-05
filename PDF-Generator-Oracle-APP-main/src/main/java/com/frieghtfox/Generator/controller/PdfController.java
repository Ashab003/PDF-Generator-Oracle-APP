package com.frieghtfox.Generator.controller;

import com.frieghtfox.Generator.model.InvoiceRequest;
import com.frieghtfox.Generator.services.InvoiceService;
import com.frieghtfox.Generator.services.PDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Paths;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    @Autowired
    private PDFService pdfService;

    @Autowired
    private InvoiceService invoiceService; // ✅ inject your new service

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generatePdf(@RequestBody InvoiceRequest pdfRequest) {
        try {
            // ✅ Step 1: Save invoice data to Oracle DB and get the generated invoice ID
            int invoiceId = invoiceService.saveInvoice(pdfRequest);

            // ✅ Step 2: Generate the PDF using the invoice data
            String filePath = pdfService.generatePdf(pdfRequest);
            byte[] pdfBytes = Files.readAllBytes(Paths.get(filePath));

            // ✅ Step 3: Return PDF as downloadable file
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                    .filename("invoice_" + invoiceId + ".pdf") // use real Oracle invoice ID
                    .build());
            headers.setContentLength(pdfBytes.length);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfBytes);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}

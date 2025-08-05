package com.frieghtfox.Generator;

import com.frieghtfox.Generator.controller.PdfController;
import com.frieghtfox.Generator.model.InvoiceRequest;
import com.frieghtfox.Generator.services.PDFService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PdfController.class)
public class PdfControllerTest {

//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private PDFService pdfService;

//    @Test
//    public void testGeneratePdf() throws Exception {
//        InvoiceRequest pdfRequest = new InvoiceRequest(); // Initialize with sample data
//
//        Mockito.when(pdfService.generatePdf(Mockito.any())).thenReturn("sample.pdf");
//
//        mockMvc.perform(post("/api/pdf/generate")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(new ObjectMapper().writeValueAsString(pdfRequest)))
//                .andExpect(status().isOk());
//    }
}

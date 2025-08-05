package com.frieghtfox.Generator.services;

import com.frieghtfox.Generator.model.InvoiceRequest;
import org.springframework.core.io.Resource;

import java.io.IOException;

public interface PDFService {
    public String generatePdf(InvoiceRequest request);
}

package com.frieghtfox.Generator.services;

import com.frieghtfox.Generator.model.InvoiceRequest;

import java.sql.SQLException;

public interface InvoiceService {
    int saveInvoice(InvoiceRequest request);
    void insertInvoiceUsingProcedure(InvoiceRequest request) throws SQLException;
}

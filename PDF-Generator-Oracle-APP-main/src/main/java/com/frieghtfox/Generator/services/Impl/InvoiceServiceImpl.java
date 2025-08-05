package com.frieghtfox.Generator.services;

import com.frieghtfox.Generator.db.OracleArrayUtil;
import com.frieghtfox.Generator.model.InvoiceRequest;
import com.frieghtfox.Generator.model.Item;
import com.frieghtfox.Generator.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Date;
import java.util.List;

import oracle.sql.ARRAY;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private InvoiceRepository invoiceRepository;

    /**
     * OLD METHOD: Save invoice using JPA or manual logic
     * You can leave this empty or reuse it if needed.
     */
    @Override
    public int saveInvoice(InvoiceRequest request) {
        // TODO: Your existing logic here (optional)
        return 0; // Or return generated invoice ID
    }

    /**
     * NEW METHOD: Save invoice using Oracle stored procedure
     */
    @Override
    public void insertInvoiceUsingProcedure(InvoiceRequest request) throws SQLException {
        try (Connection conn = dataSource.getConnection()) {
            CallableStatement cs = conn.prepareCall("{ call insert_invoice_with_items(?, ?, ?, ?) }");

            // Set input parameters
            cs.setString(1, request.getBuyer());
            cs.setString(2, request.getSeller());

            // Use current date (or modify to parse from request)
            cs.setDate(3, new Date(System.currentTimeMillis()));

            // Convert Java List<Item> to Oracle ARRAY
            ARRAY itemsArray = OracleArrayUtil.createInvoiceItemArray(conn, request.getItems());
            cs.setArray(4, itemsArray);

            // Execute stored procedure
            cs.execute();
        }
    }
}

package com.frieghtfox.Generator.db;

import com.frieghtfox.Generator.model.Item;
import oracle.jdbc.OracleConnection;
import oracle.sql.ARRAY;
import oracle.sql.ArrayDescriptor;
import oracle.sql.STRUCT;
import oracle.sql.StructDescriptor;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class OracleArrayUtil {

    public static ARRAY createInvoiceItemArray(Connection conn, List<Item> items) throws SQLException {
        OracleConnection oracleConn = conn.unwrap(OracleConnection.class);

        StructDescriptor structDescriptor = StructDescriptor.createDescriptor("INVOICE_ITEM_OBJ", oracleConn);
        Object[] structArray = new Object[items.size()];

        for (int i = 0; i < items.size(); i++) {
            Item item = items.get(i);
            Object[] attributes = new Object[]{
                    item.getName(),
                    item.getQuantity(),
                    item.getRate(),
                    item.getAmount()
            };
            STRUCT struct = new STRUCT(structDescriptor, oracleConn, attributes);
            structArray[i] = struct;
        }

        ArrayDescriptor arrayDescriptor = ArrayDescriptor.createDescriptor("INVOICE_ITEM_TAB", oracleConn);
        return new ARRAY(arrayDescriptor, oracleConn, structArray);
    }
}

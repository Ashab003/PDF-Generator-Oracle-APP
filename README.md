
# Invoice Generator Project

This is a full-stack Invoice Generator application using **Spring Boot (Java)**, **React**, and **Oracle Database**.

---

## 🔧 Technologies Used

- **Frontend:** React.js
- **Backend:** Spring Boot (Java)
- **Database:** Oracle 11g+
- **PDF Generation:** iText / PDFBox (Java-based)
- **PL/SQL Features Used:**
    - Object & Table Types
    - Stored Procedures
    - Stored Functions
    - Triggers
    - Cursors
    - Packages

---

## 🚀 Features

- Invoice creation form (React)
- Sends data to Spring Boot REST API
- Spring Boot calls Oracle Stored Procedure to insert data
- PDF invoice is generated and downloaded
- Advanced Oracle features for internship-level showcase

---

## 🗃️ Oracle Objects Created

- `INVOICE_ITEM_OBJ` – Custom object type for invoice items
- `INVOICE_ITEM_TAB` – Table of object type for bulk insert
- `insert_invoice_with_items` – Procedure to insert full invoice with item list
- `get_invoice_total` – Function to get total amount
- `trg_log_invoice_insert` – Trigger to log invoice insert
- `invoice_pkg` – Package wrapping the procedure and function
- `ITEM_LOG` – Table to store insert logs

All of these are included in `oracle_scripts.zip` in this project.

---

## 📦 Project Structure

```
com.frieghtfox.Generator/
├── controller/
│   └── PdfController.java
├── db/
│   └── OracleArrayUtil.java
├── model/
│   ├── InvoiceEntity.java
│   ├── InvoiceRequest.java
│   └── Item.java
├── repository/
│   └── InvoiceRepository.java
├── services/
│   ├── InvoiceService.java
│   └── InvoiceServiceImpl.java
└── GeneratorApplication.java
```

---

## 🏁 How to Run

### 🔹 Backend (Spring Boot)
```bash
# In the root backend folder
mvn spring-boot:run
```

### 🔹 Frontend (React)
```bash
# In the frontend folder
npm install
npm start
```

Make sure Oracle XE is running and properly connected.

---

## 📂 Files for DB Setup

Check the `oracle_scripts.zip` in this repo for:
- All table/type/function/procedure/trigger/package scripts
- You can run them directly in TOAD or SQL Developer

---

## 👨‍💻 Author

Mohammad Ashab  
Student | Developer | Oracle DB Enthusiast


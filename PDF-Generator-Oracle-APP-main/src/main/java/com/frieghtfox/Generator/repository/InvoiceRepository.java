package com.frieghtfox.Generator.repository;

import com.frieghtfox.Generator.model.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long> {
}

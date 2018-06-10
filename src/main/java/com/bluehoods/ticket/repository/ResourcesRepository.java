package com.bluehoods.ticket.repository;

import com.bluehoods.ticket.domain.Resources;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Resources entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResourcesRepository extends JpaRepository<Resources, Long> {

}

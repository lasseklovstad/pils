package no.web.pils.repository

import no.web.pils.model.Batch
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface BatchRepository:JpaRepository<Batch, UUID> {
}
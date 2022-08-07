package no.web.pils.repository

import no.web.pils.model.Batch
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID

interface BatchRepository:JpaRepository<Batch, UUID> {
    @Query(
        value = "SELECT pg_database_size(current_database())/1024/1024",
        nativeQuery = true)
    fun getDatabaseSize(): String
}

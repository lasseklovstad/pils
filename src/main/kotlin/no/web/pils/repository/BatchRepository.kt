package no.web.pils.repository

import no.web.pils.controller.dtoOut.BatchDetailed
import no.web.pils.model.Batch
import no.web.pils.model.BatchType
import no.web.pils.model.MicroController
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.UUID

interface BatchRepository:JpaRepository<Batch, UUID> {
    @Query(
        value = "SELECT pg_database_size(current_database())/1024/1024",
        nativeQuery = true)
    fun getDatabaseSize(): String

    fun findAllByMicroControllerAndBatchTypeAndActive(microController: MicroController, batchType: BatchType, active: Boolean): List<Batch>
    fun findAllByMicroController(microController: MicroController): List<Batch>
}

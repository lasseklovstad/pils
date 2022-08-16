package no.web.pils.controller

import no.web.pils.controller.dtoOut.BatchDetailed
import no.web.pils.controller.dtoOut.BatchSimple
import no.web.pils.controller.dtoOut.BatchUpdate
import no.web.pils.model.Batch
import no.web.pils.model.Temperature
import no.web.pils.repository.BatchRepository
import no.web.pils.repository.TemperatureRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.UUID

@RestController
@RequestMapping("api/batch")
class BatchController {

    @Autowired
    lateinit var batchRepository: BatchRepository

    @Autowired
    lateinit var temperatureRepository: TemperatureRepository

    @GetMapping
    fun getBatches(): List<BatchSimple> {
        return batchRepository.findAll().map { BatchSimple(it) }
    }

    @GetMapping("databasesize")
    fun getDatabaseSize(): String {
        return batchRepository.getDatabaseSize()
    }

    @GetMapping("{id}")
    fun getBatch(@PathVariable id:String): BatchDetailed {
        val batch = batchRepository.findById(UUID.fromString(id));
        if(batch.isPresent){
            return BatchDetailed(batch.get())
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!");
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteBatch(@PathVariable id:String) {
        val batch = batchRepository.findById(UUID.fromString(id));
        if(batch.isPresent){
            batchRepository.delete(batch.get())
            return;
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!");
    }

    @PutMapping("{id}")
    fun putBatch(@PathVariable id:String, @RequestBody body:BatchUpdate): BatchDetailed {
        val batch = batchRepository.findById(UUID.fromString(id));
        if(batch.isPresent){
            val newBatch = batch.get();
            newBatch.name = body.name
            newBatch.controllerTemperature = body.controllerTemperature
            batchRepository.save(newBatch);
            return BatchDetailed(newBatch)
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!");
    }

    @GetMapping("{id}/temperature")
    fun getBatchTemperatures(@PathVariable id:String): List<Temperature> {
        val batch = batchRepository.findById(UUID.fromString(id));
        if(batch.isPresent){
            return temperatureRepository.findAllByBatchOrderByDateDesc(batch.get());
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!");
    }

    @PostMapping("{id}/active")
    @PreAuthorize("hasAuthority('pilsadmin')")
    fun postBatchActive(@PathVariable id:String): BatchDetailed {
        val batch = batchRepository.findById(UUID.fromString(id))
        if (batch.isPresent) {
            val batchObject = batch.get();
            batchObject.active = !batchObject.active;
            val newBatch = batchRepository.save(batchObject);
            return BatchDetailed(newBatch);
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!");
    }
}

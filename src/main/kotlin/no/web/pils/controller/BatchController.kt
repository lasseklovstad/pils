package no.web.pils.controller

import no.web.pils.controller.dtoOut.BatchDetailed
import no.web.pils.controller.dtoOut.BatchSimple
import no.web.pils.controller.dtoOut.BatchUpdate
import no.web.pils.model.Batch
import no.web.pils.model.MicroController
import no.web.pils.model.Temperature
import no.web.pils.model.toTemperatureArray
import no.web.pils.repository.BatchRepository
import no.web.pils.repository.MicroControllerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*

@RestController
@RequestMapping("api/batch")
class BatchController {

    @Autowired
    lateinit var batchRepository: BatchRepository

    @Autowired
    lateinit var microControllerRepository: MicroControllerRepository

    @GetMapping
    fun getBatches(): List<BatchSimple> {
        return batchRepository.findAll().map { BatchSimple(it) }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('pilsadmin')")
    fun postBatch(): BatchDetailed {
        val batch = Batch()
        batchRepository.save(batch);
        return BatchDetailed(batch);
    }

    @GetMapping("databasesize")
    fun getDatabaseSize(): String {
        return batchRepository.getDatabaseSize()
    }

    @GetMapping("controller")
    fun getControllers(): List<MicroController> {
        return microControllerRepository.findAll()
    }

    @GetMapping("{id}")
    fun getBatch(@PathVariable id: String): BatchDetailed {
        val batch = findBatchById(id)
        return BatchDetailed(batch)
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteBatch(@PathVariable id: String) {
        val batch = findBatchById(id)
        batchRepository.delete(batch)
    }

    @PutMapping("{id}")
    fun putBatch(@PathVariable id: String, @RequestBody body: BatchUpdate): BatchDetailed {
        val batch = findBatchById(id)
        batch.name = body.name
        batch.controllerTemperature = body.controllerTemperature
        batch.batchType = body.batchType
        if(!body.microControllerId.isNullOrBlank()){
            val microController = getMicroController(body.microControllerId!!)
            batch.microController = microController
        }else{
            batch.microController = null
        }
        batchRepository.save(batch);
        return BatchDetailed(batch)
    }

    @GetMapping("{id}/temperature")
    fun getBatchTemperatures(@PathVariable id: String): List<Temperature> {
        val batch = findBatchById(id)
        return batch.temperatureData.toTemperatureArray()
    }

    @PostMapping("{id}/active")
    @PreAuthorize("hasAuthority('pilsadmin')")
    fun postBatchActive(@PathVariable id: String): BatchDetailed {
        val batch = findBatchById(id)
        batch.active = !batch.active;
        val newBatch = batchRepository.save(batch);
        return BatchDetailed(newBatch);
    }

    fun findBatchById(batchId: String): Batch {
        val batch = batchRepository.findById(UUID.fromString(batchId))
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!") }
        return batch
    }

    fun getMicroController(controllerId: String): MicroController {
        return microControllerRepository.findById(UUID.fromString(controllerId))
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Micro controller not found!") }
    }
}

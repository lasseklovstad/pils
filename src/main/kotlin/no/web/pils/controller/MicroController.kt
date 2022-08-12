package no.web.pils.controller

import no.web.pils.model.Batch
import no.web.pils.model.Temperature
import no.web.pils.repository.BatchRepository
import no.web.pils.repository.TemperatureRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.UUID
import javax.websocket.server.PathParam

@RestController
@RequestMapping("api/microcontroller")
class MicroController {

    @Autowired
    lateinit var temperatureRepository: TemperatureRepository

    @Autowired
    lateinit var batchRepository: BatchRepository

    @PostMapping("{batchId}/temperature")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun postColdTemperatur(@RequestBody body: String, @PathVariable batchId: String) {
        val batch = batchRepository.findById(UUID.fromString(batchId))
        if (batch.isPresent) {
            val temperatureValue = body.toFloat()
            val temp = Temperature(temperatureValue, batch.get())
            temperatureRepository.save(temp)
            return;
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!");
    }

    @GetMapping("{batchId}/active")
    fun getIsBatchActive(@PathVariable batchId: String): String {
        val batch = batchRepository.findById(UUID.fromString(batchId))
        if (batch.isPresent) {
            if (batch.get().active) {
                return "true"
            } else {
                return "false"
            }
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!");
    }

    @PostMapping("{batchId}/restarted")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun postBatchRestarted(@PathVariable batchId: String) {
        val batch = batchRepository.findById(UUID.fromString(batchId))
        if (batch.isPresent) {
            val batchObject = batch.get();
            batchObject.numberOfRestarts = batchObject.numberOfRestarts + 1;
            batchRepository.save(batchObject);
            return;
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!");
    }

    @PostMapping("batch/warm")
    fun newWarmBatch(): String? {
        val newBatch = Batch()
        newBatch.controllerTemperature = 18F
        val batch = batchRepository.save(newBatch)
        return batch.id.toString()
    }

    @PostMapping("batch/cold")
    fun newColdBatch(): String? {
        val newBatch = Batch()
        newBatch.controllerTemperature = 10F
        val batch = batchRepository.save(newBatch)
        return batch.id?.toString()
    }
}

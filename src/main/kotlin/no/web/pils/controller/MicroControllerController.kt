package no.web.pils.controller

import no.web.pils.controller.dtoInn.TemperatureReading
import no.web.pils.model.MicroController
import no.web.pils.repository.BatchRepository
import no.web.pils.repository.MicroControllerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*

@RestController
@RequestMapping("api/microcontroller")
class MicroControllerController {

    @Autowired
    lateinit var batchRepository: BatchRepository

    @Autowired
    lateinit var microControllerRepository: MicroControllerRepository

    @PostMapping("{controllerId}/temperature")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun posTemperatur(@RequestBody body: TemperatureReading, @PathVariable controllerId: String) {
        val microController = getMicroController(controllerId)

        val batches = batchRepository.findAllByMicroControllerAndBatchTypeAndActive(microController, body.type, true)
        batches.forEach {
            it.temperatureData = "${it.temperatureData};${body.temp} ${Date().time}"
            batchRepository.save(it)
        }
    }

    @PostMapping("{controllerId}/restarted")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun postBatchRestarted(@PathVariable controllerId: String) {
        val microController = getMicroController(controllerId)
        val batches = batchRepository.findAllByMicroController(microController)
        batches.forEach {
            it.numberOfRestarts = it.numberOfRestarts + 1;
            batchRepository.save(it);
        }
    }

    fun getMicroController(controllerId: String): MicroController {
        return microControllerRepository.findById(UUID.fromString(controllerId))
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Micro controller not found!") }
    }

    @PostMapping
    fun postMicroController(@RequestBody name: String): String {
        val microController = MicroController()
        microController.name = name
        microControllerRepository.save(microController)
        return microController.id.toString()
    }
}

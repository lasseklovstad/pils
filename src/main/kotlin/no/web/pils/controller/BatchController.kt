package no.web.pils.controller

import no.web.pils.controller.dtoOut.BatchDetailed
import no.web.pils.controller.dtoOut.BatchSimple
import no.web.pils.model.Batch
import no.web.pils.repository.BatchRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.util.UUID

@RestController
@RequestMapping("api/batch")
class BatchController {

    @Autowired
    lateinit var batchRepository: BatchRepository

    @GetMapping
    fun getBatches(): List<BatchSimple> {
        return batchRepository.findAll().map { BatchSimple(it) }
    }

    @GetMapping("{id}")
    fun getBatch(@RequestParam id:String): BatchDetailed {
        val batch = batchRepository.findById(UUID.fromString(id));
        if(batch.isPresent){
            return BatchDetailed(batch.get())
        }
        throw ResponseStatusException(HttpStatus.NOT_FOUND, "Batch finnes ikke!");
    }
}
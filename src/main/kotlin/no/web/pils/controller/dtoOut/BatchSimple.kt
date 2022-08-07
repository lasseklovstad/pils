package no.web.pils.controller.dtoOut

import no.web.pils.model.Batch
import no.web.pils.model.Temperature
import java.util.*

class BatchSimple(
    var id: UUID?,
    var name: String,
    var createdDate: Date
){
    constructor(batch: Batch) : this(batch.id, batch.name, batch.createdDate)
}

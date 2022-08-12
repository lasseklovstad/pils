package no.web.pils.controller.dtoOut

import no.web.pils.model.Batch
import no.web.pils.model.Temperature
import java.util.*

class BatchDetailed(
    var id: UUID?,
    var name: String,
    var temperatureData: List<Temperature>,
    var createdDate: Date,
    var controllerTemperature: Float,
    var active: Boolean,
    var numberOfRestarts: Int
) {
    constructor(batch: Batch) : this(
        batch.id,
        batch.name,
        batch.temperatureData,
        batch.createdDate,
        batch.controllerTemperature,
        batch.active,
        batch.numberOfRestarts
    )
}

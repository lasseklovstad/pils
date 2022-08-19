package no.web.pils.controller.dtoOut

import no.web.pils.model.*
import java.util.*

class BatchDetailed(
    var id: UUID?,
    var name: String,
    var createdDate: Date,
    var controllerTemperature: Float,
    var active: Boolean,
    var numberOfRestarts: Int,
    var numberOfReadings: Int,
    var microControllerId: UUID?,
    var batchType: BatchType
) {
    constructor(batch: Batch) : this(
        batch.id,
        batch.name,
        batch.createdDate,
        batch.controllerTemperature,
        batch.active,
        batch.numberOfRestarts,
        batch.temperatureData.toTemperatureArray().size,
        batch.microController?.id,
        batch.batchType
    )
}

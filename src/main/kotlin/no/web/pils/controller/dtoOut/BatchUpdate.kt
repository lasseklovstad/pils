package no.web.pils.controller.dtoOut

import no.web.pils.model.BatchType

class BatchUpdate(var name: String, var controllerTemperature: Float, var microControllerId: String?, var batchType: BatchType) {
}
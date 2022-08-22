package no.web.pils.model

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.*
import javax.persistence.*


class Temperature(
    var date: Long,
    var temperature: Float,
) {
    constructor() : this(date = 0L, temperature = 0F)
}

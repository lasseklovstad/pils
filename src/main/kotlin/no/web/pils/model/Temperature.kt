package no.web.pils.model

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.*
import javax.persistence.*

@Entity
class Temperature(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: UUID?,
    @OrderBy
    var date: Date,
    var temperature: Float,
    @ManyToOne
    @JsonIgnore
    var batch: Batch?
) {
    constructor() : this(null,Date(), 0F, null)
    constructor(temperature:Float, batch:Batch) : this(null,Date(), temperature, batch)
}

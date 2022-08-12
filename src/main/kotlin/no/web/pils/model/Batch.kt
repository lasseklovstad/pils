package no.web.pils.model

import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.ColumnDefault
import java.util.*
import javax.persistence.*

@Entity
class Batch(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: UUID?,
    var name: String,
    @OneToMany(mappedBy = "batch")
    @JsonIgnore
    var temperatureData: List<Temperature>,
    var controllerTemperature: Float,
    var createdDate: Date,
    var active: Boolean,
    var numberOfRestarts: Int
) {
    constructor() : this(null, "New batch", emptyList(), 20F, Date(), true, 0)
}

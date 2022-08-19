package no.web.pils.model

import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class MicroController(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: UUID?,
    var name: String,
) {
    constructor() : this(id = null, name = "")
}

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
    @JsonIgnore
    var temperatureData: String,
    var controllerTemperature: Float,
    var createdDate: Date,
    var active: Boolean,
    var numberOfRestarts: Int,
    var batchType: BatchType,
    @ManyToOne
    var microController: MicroController?
) {
    constructor() : this(
        id = null,
        name = "New batch",
        temperatureData = "",
        controllerTemperature = 18F,
        createdDate = Date(),
        active = false,
        numberOfRestarts = 0,
        microController = null,
        batchType = BatchType.WARM
    )
}


fun String.toTemperatureArray(): List<Temperature> {

    if (!this.contains(";")) {
        return emptyList();
    }

    val dataList = this.split(";")
    if (dataList.isEmpty()) {
        return emptyList();
    }

    return dataList.filter { it.isNotEmpty() }.map {
        val data = it.split(" ")
        val temp = data[0]
        val time = data[1]
        Temperature(time.toLong(), temp.toFloat())
    }
}

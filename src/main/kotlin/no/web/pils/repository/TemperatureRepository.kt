package no.web.pils.repository

import no.web.pils.model.Temperature
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface TemperatureRepository: JpaRepository<Temperature, UUID> {
}
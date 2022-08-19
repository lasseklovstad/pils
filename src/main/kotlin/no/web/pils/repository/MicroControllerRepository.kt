package no.web.pils.repository

import no.web.pils.model.MicroController
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface MicroControllerRepository: JpaRepository<MicroController,UUID> {
}
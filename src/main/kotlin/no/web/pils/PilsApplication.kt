package no.web.pils

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PilsApplication

fun main(args: Array<String>) {
	runApplication<PilsApplication>(*args)
}

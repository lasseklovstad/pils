package no.web.pils.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain


@EnableWebSecurity
class APISecurityConfig {
    @Value("\${pils.http.auth-token-header-name}")
    private val principalRequestHeader: String? = null

    @Value("\${pils.http.auth-token}")
    private val principalRequestValue: String? = null

    @Bean
    fun apiFilterChain(httpSecurity: HttpSecurity): SecurityFilterChain {
        val filter = APIKeyAuthFilter(principalRequestHeader!!)
        filter.setAuthenticationManager { authentication ->
            val principal = authentication.principal as String
            if (principalRequestValue != principal) {
                throw BadCredentialsException("The API key was not found or not the expected value.")
            }
            authentication.isAuthenticated = true
            authentication
        }
        httpSecurity.antMatcher("/api/microcontroller/**").csrf().disable().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().addFilter(filter).authorizeRequests()
            .anyRequest().authenticated()
        return httpSecurity.build()
    }
}
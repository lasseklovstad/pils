package no.web.pils.security

import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter
import javax.servlet.http.HttpServletRequest


class APIKeyAuthFilter(var principalRequestHeader: String) : AbstractPreAuthenticatedProcessingFilter() {

    override fun getPreAuthenticatedPrincipal(request: HttpServletRequest): String {

        val headers = request.headerNames.toList()
        if(headers.indexOf(principalRequestHeader) != -1){
            return request.getHeader(principalRequestHeader)
        }
        return ""
    }

    override fun getPreAuthenticatedCredentials(request: HttpServletRequest?): Any {
        return "N/A"
    }
}
package com.github.krix38.quicklist.configuration

import com.github.krix38.quicklist.entity.QuickList
import org.springframework.context.annotation.Configuration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.web.servlet.config.annotation.CorsRegistry

@Configuration
class RepositoryConfiguration: RepositoryRestConfigurer {
    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration?, corsConfigurer: CorsRegistry){
        config?.exposeIdsFor(QuickList::class.java)
    }
}
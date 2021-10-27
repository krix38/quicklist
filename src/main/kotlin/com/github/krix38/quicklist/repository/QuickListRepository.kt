package com.github.krix38.quicklist.repository

import com.github.krix38.quicklist.entity.QuickList
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource
import java.time.LocalDateTime

@RepositoryRestResource(collectionResourceRel = "lists", path = "lists")
interface QuickListRepository : MongoRepository<QuickList, String> {
    @RestResource(exported = false)
    override fun deleteAll()
    @RestResource(exported = false)
    override fun findAll(): MutableList<QuickList>
    @RestResource(exported = false)
    override fun findAll(sort: Sort): MutableList<QuickList>
    @RestResource(exported = false)
    override fun findAll(pageable: Pageable): Page<QuickList>
    @RestResource(exported = false)
    fun deleteByUpdateDateBefore(expiryDate: LocalDateTime)
    @Query("{ 'id' :  ?0 }")
    fun findVersionById(id: String): QuickList?
}
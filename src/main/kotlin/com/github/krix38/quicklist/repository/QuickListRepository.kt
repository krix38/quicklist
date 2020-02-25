package com.github.krix38.quicklist.repository

import com.github.krix38.quicklist.entity.QuickList
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@RepositoryRestResource(collectionResourceRel = "lists", path = "lists")
interface QuickListRepository : PagingAndSortingRepository<QuickList, String> {
    @RestResource(exported = false)
    override fun deleteAll()
    @RestResource(exported = false)
    override fun findAll(): MutableIterable<QuickList>
    @RestResource(exported = false)
    override fun findAll(sort: Sort): MutableIterable<QuickList>
    @RestResource(exported = false)
    override fun findAll(pageable: Pageable): Page<QuickList>
    @RestResource(exported = false)
    @Modifying
    @Transactional
    fun deleteByUpdateDateBefore(expiryDate: LocalDateTime)
}
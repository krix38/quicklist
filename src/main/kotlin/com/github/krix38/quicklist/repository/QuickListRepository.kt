package com.github.krix38.quicklist.repository

import com.github.krix38.quicklist.entity.QuickList
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource

@RepositoryRestResource(collectionResourceRel = "lists", path = "lists")
interface QuickListRepository : PagingAndSortingRepository<QuickList, String> {
    @RestResource(exported = false)
    override fun deleteAll()
}
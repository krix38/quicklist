package com.github.krix38.quicklist.repository

import com.github.krix38.quicklist.entity.QuickList
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource

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

}

///$ curl -X POST -H "Content-Type: application/json" http://localhost:8080/api/lists -d "{ \"items\": [{ \"name\": \"ziemnioki\", \"state\": \"IN_CART\" }] }"
///$ curl -X PATCH -H "Content-Type: application/json" http://localhost:8080/api/lists/7a6608a8-fb38-482f-b24c-5627241349c1 -d "{ \"items\": [{ \"name\": \"ziemnioksssi\", \"state\: \"IN_CART\" }] }"

package com.github.krix38.quicklist.entity

import org.hibernate.annotations.GenericGenerator
import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class QuickList(
        @Id
        @GeneratedValue(generator = "UUID")
        @GenericGenerator(
                name = "UUID",
                strategy = "org.hibernate.id.UUIDGenerator")
        val id: String?,
        @ElementCollection
        val items: MutableSet<Item> = mutableSetOf()
)
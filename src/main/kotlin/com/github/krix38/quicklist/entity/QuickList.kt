package com.github.krix38.quicklist.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.GenericGenerator
import java.time.LocalDateTime
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
        val items: MutableList<Item> = mutableListOf(),
        var version: Long = 0,
        @JsonIgnore
        var updateDate: LocalDateTime = LocalDateTime.now()
)
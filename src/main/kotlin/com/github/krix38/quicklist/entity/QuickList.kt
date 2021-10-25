package com.github.krix38.quicklist.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.annotation.Id
import java.time.LocalDateTime
import java.util.*

data class QuickList(
        @Id
        val id: String = UUID.randomUUID().toString(),
        var items: List<Item> = mutableListOf(),
        var version: Long = 0,
        @JsonIgnore
        var updateDate: LocalDateTime = LocalDateTime.now()
)
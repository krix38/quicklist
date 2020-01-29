package com.github.krix38.quicklist.entity

import javax.persistence.Embeddable

@Embeddable
data class Item (
        val name: String,
        val state: ItemState
)
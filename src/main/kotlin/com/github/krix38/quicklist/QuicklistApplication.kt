package com.github.krix38.quicklist

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class QuicklistApplication

fun main(args: Array<String>) {
	runApplication<QuicklistApplication>(*args)
}

package com.github.krix38.quicklist

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class QuicklistApplication

fun main(args: Array<String>) {
	runApplication<QuicklistApplication>(*args)
}

package com.github.krix38.quicklist.controller

import com.github.krix38.quicklist.service.EmitterService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter

@Controller
class QuickListEventsController (private val emitterService: EmitterService){
    @GetMapping("/events/{id}")
    fun streamSseMvc(@PathVariable id: String): SseEmitter = emitterService.addEmitter(id)
}
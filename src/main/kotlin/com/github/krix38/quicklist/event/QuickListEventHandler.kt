package com.github.krix38.quicklist.event

import com.github.krix38.quicklist.entity.QuickList
import com.github.krix38.quicklist.service.EmitterService
import org.springframework.data.rest.core.annotation.HandleAfterSave
import org.springframework.data.rest.core.annotation.HandleBeforeCreate
import org.springframework.data.rest.core.annotation.HandleBeforeSave
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.stereotype.Component
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter

@Component
@RepositoryEventHandler(QuickList::class)
class QuickListEventHandler(private val emitterService: EmitterService) {
    @HandleAfterSave
    fun handleSave(quickList: QuickList) = emitterService.sendMessageToAllEmitters(
        quickList.id,
        SseEmitter.event()
            .comment("saved")
            .build()
    )

}
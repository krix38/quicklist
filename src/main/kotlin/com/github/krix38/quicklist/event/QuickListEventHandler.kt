package com.github.krix38.quicklist.event

import com.github.krix38.quicklist.entity.QuickList
import com.github.krix38.quicklist.exception.InvalidListVersionException
import com.github.krix38.quicklist.repository.QuickListRepository
import com.github.krix38.quicklist.service.EmitterService
import org.springframework.data.rest.core.annotation.HandleAfterSave
import org.springframework.data.rest.core.annotation.HandleBeforeSave
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.stereotype.Component
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import java.time.LocalDateTime

@Component
@RepositoryEventHandler(QuickList::class)
class QuickListEventHandler(
    private val emitterService: EmitterService,
    private val quickListRepository: QuickListRepository
) {

    @HandleBeforeSave
    fun updateDate(quickList: QuickList) = quickList.id?.let {
        val currentVersion = quickListRepository.findVersionById(quickList.id)
        if (currentVersion == quickList.version) {
            quickList.updateDate = LocalDateTime.now()
            quickList.version++
        } else {
            throw InvalidListVersionException()
        }
    }

    @HandleAfterSave
    fun handleSave(quickList: QuickList) = emitterService.sendMessageToAllEmitters(
        quickList.id,
        SseEmitter.event()
            .comment("saved")
            .build()
    )

}
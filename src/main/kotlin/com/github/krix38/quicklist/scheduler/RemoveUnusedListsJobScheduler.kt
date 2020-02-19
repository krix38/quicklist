package com.github.krix38.quicklist.scheduler

import com.github.krix38.quicklist.repository.QuickListRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class RemoveUnusedListsJobScheduler(
    @Autowired
    val quickListRepository: QuickListRepository,
    @Value("\${deleteListsAfterMinutes}")
    val deleteListAfter: Long
) {

    @Scheduled(cron = "*/5 * * * * *")
    fun removeUnusedLists() = quickListRepository.deleteByUpdateDateBefore(LocalDateTime.now().minusMinutes(deleteListAfter))
}
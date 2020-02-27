package com.github.krix38.quicklist.service

import org.slf4j.LoggerFactory.getLogger
import org.springframework.stereotype.Service
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import java.io.IOException
import java.util.concurrent.ConcurrentHashMap

@Service
class EmitterService(
        private val emittersMap: ConcurrentHashMap<String, ConcurrentHashMap<String, SseEmitter>> = ConcurrentHashMap()
) {

    companion object {
        private val logger = getLogger(EmitterService::class.java)
    }

    fun addEmitter(id: String): SseEmitter {
        val uuid = java.util.UUID.randomUUID().toString()
        val newEmitter = SseEmitter().apply {
            setEmitterCallbacks(id, uuid)
            send(uuid)
        }
        emittersMap.getOrPut(id) { ConcurrentHashMap() }[uuid] = newEmitter
        return newEmitter
    }

    @Synchronized
    fun sendMessageToAllEmitters(id: String?, event: MutableSet<ResponseBodyEmitter.DataWithMediaType>){
        if(!id.isNullOrEmpty()){
            emittersMap[id]?.forEachValue(1) {
                sendEvent(it, event)
            }
        }
    }

    private fun sendEvent(emitter: SseEmitter?, event: MutableSet<ResponseBodyEmitter.DataWithMediaType>) {
        try {
            emitter?.send(event)
        } catch (exception: IOException) {
            logger.error(exception.message)
        }
    }

    private fun SseEmitter.setEmitterCallbacks(id: String, uuid: String) {
        onCompletion {
            removeEmitter(id, uuid)
        }
        onError {
            removeEmitter(id, uuid)
        }
        onTimeout {
            removeEmitter(id, uuid)
        }
    }

    private fun removeEmitter(id: String, uuid: String) {
        emittersMap[id]?.let {
            it.remove(uuid)
            if (it.isEmpty()) {
                emittersMap.remove(id)
            }
        }
    }
}
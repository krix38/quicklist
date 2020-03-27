package com.github.krix38.quicklist.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus
import java.lang.RuntimeException

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Invalid list version")
class InvalidListVersionException : RuntimeException()

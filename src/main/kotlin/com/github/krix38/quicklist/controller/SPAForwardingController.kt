package com.github.krix38.quicklist.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class SPAForwardingController {
   @RequestMapping("/{path:^(?!api|events)[^.]*}")
    fun forwardSPARequests() = "forward:/"
}
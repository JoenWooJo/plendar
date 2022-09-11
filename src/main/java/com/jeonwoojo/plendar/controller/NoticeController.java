package com.jeonwoojo.plendar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.security.Auth;
import com.jeonwoojo.plendar.security.AuthUser;
import com.jeonwoojo.plendar.service.NoticeService;
import com.jeonwoojo.plendar.vo.NoticeMessage;
import com.jeonwoojo.plendar.vo.UserVo;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/notice")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	@GetMapping("/alramList")
	public ResponseEntity<JsonResult> getAlramList(@RequestParam("userNo")long userNo) {
		System.out.println(userNo);
		
		List<NoticeMessage> alramList = noticeService.getAlramList(userNo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(alramList));
	}
	
}

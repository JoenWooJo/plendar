package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.CalendarService;

@Controller
@RequestMapping("api/calendar")
@CrossOrigin(origins = "http://localhost:9090")
public class CalendarController {
	
	@Autowired
	private CalendarService calendarService;
	
	@GetMapping("/axios/team")
	public ResponseEntity<JsonResult> readTC(@RequestParam("userNo") Long userNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(calendarService.findAll(userNo)));
	}
	
	@GetMapping("/axios/personal")
	public ResponseEntity<JsonResult> readPC(@RequestParam("userNo") Long userNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(calendarService.findByNo(userNo)));
	}
}
package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.TestService;

@Controller
@CrossOrigin(origins = "http://localhost:9090",allowedHeaders= "*")
public class TestController {
	
	@Autowired
	private TestService testService;
	
	@GetMapping("/")
	public String test() {
		return "index";
	}
	
//	@GetMapping("/project/myproject")
//	public String test1() {
//		return "index";
//	}
	
	
	@GetMapping("/api/axios/test")
	public ResponseEntity<JsonResult> axios() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(testService.findName()));
		
	}
}

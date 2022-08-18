package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.ProjectService;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@PostMapping("/create")
	public ResponseEntity<JsonResult> create(@RequestBody Object data) {
		System.out.println("data: "+data);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(null));
	}
	
	@GetMapping("/find/user")
	public ResponseEntity<JsonResult> findUser() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(projectService.findUser()));
	}
}

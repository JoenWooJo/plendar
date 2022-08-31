package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.security.Auth;
import com.jeonwoojo.plendar.service.TaskService;
import com.jeonwoojo.plendar.vo.DeckVo;
import com.jeonwoojo.plendar.vo.TaskVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Auth
@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/kanban/task")
public class TaskController {

	@Autowired
	private TaskService taskService;
	
	@GetMapping("/find/{cardNo}")
	public ResponseEntity<JsonResult> findTask(@PathVariable("cardNo") Long cardNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(taskService.findTask(cardNo)));
	}
	
	@PostMapping("/create")
	public ResponseEntity<JsonResult> create( @RequestBody TaskVo taskVo) {
		boolean newVo = taskService.createTask(taskVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(newVo));
	}
	
	@PostMapping("/clickTask")
	public ResponseEntity<JsonResult> clickTask(@RequestBody TaskVo taskVo) {
		System.out.println("Task Changed" + taskVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(taskService.clickTask(taskVo)));
	}
	
	@DeleteMapping("/deleteTask/{taskNo}")
	public ResponseEntity<JsonResult> deleteTask(@PathVariable("taskNo") Long taskNo) {
		System.out.println("deleteTask: " + taskNo);
		taskService.deleteTask(taskNo);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(taskNo));
	}
}

package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.security.Auth;
import com.jeonwoojo.plendar.security.AuthUser;
import com.jeonwoojo.plendar.service.NoticeService;
import com.jeonwoojo.plendar.service.ProjectService;
import com.jeonwoojo.plendar.vo.NoticeMessage;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Auth
@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/project")
public class ProjectController {
	
	@Autowired
	private SimpMessageSendingOperations sendingOperations;
	@Autowired
	private ProjectService projectService;
	@Autowired
	private NoticeService noticeService;
	
	@PostMapping("/create")
	public ResponseEntity<JsonResult> create(@AuthUser UserVo authUser, @RequestBody ProjectVo projectVo) {
		ProjectVo newVo = projectService.createProject(projectVo, authUser);
		NoticeMessage noticeMessage= noticeService.insertNoticeProject(newVo, authUser);
		System.out.println(noticeMessage);
		sendingOperations.convertAndSend("/topic/notice/"+authUser.getNo(), noticeMessage);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(newVo));
	}
	
	@GetMapping("/find/user")
	public ResponseEntity<JsonResult> findUser() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(projectService.findUser()));
	}
	
	@Auth
	@GetMapping("/find/project")
	public ResponseEntity<JsonResult> findProject(@AuthUser UserVo authUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(projectService.findProject(authUser.getNo())));
	}
	
	@Auth
	@GetMapping("/find/completeProject")
	public ResponseEntity<JsonResult> findCompleteProject(@AuthUser UserVo authUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(projectService.findCompleteProject(authUser.getNo())));
	}
	
	@GetMapping("/find/member/{projectNo}") 
	public ResponseEntity<JsonResult> findProjectMember(@PathVariable("projectNo") long projectNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(projectService.findProjectMember(projectNo)));
	}
	
	@PostMapping("/update")
	public ResponseEntity<JsonResult> updateProject(@AuthUser UserVo authUser, @RequestBody ProjectVo projectVo) {
		System.out.println(">>>"+projectVo);
		String projectTitle = projectService.findProjectTitle(projectVo.getNo());
		ProjectVo updateProjectVo = projectService.updateProject(projectVo);
		NoticeMessage noticeMessage= noticeService.insertNoticeUpdateProject(updateProjectVo, authUser, projectTitle);
		sendingOperations.convertAndSend("/topic/notice/"+authUser.getNo(), noticeMessage);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(updateProjectVo));
	}
	
}

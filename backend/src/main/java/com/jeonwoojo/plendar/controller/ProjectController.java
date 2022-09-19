package com.jeonwoojo.plendar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.NoticeService;
import com.jeonwoojo.plendar.service.ProjectService;
import com.jeonwoojo.plendar.vo.ProjectVo;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	@Autowired
	private NoticeService noticeService;
	
	@PostMapping("/create")
	public ResponseEntity<JsonResult> create(@RequestParam("userNo") long userNo, @RequestBody ProjectVo projectVo) {
		ProjectVo newVo = projectService.createProject(projectVo, userNo);
		noticeService.insertNoticeProject(newVo, userNo);
		
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
	
	@GetMapping("/find/project/{userNo}")
	   public ResponseEntity<JsonResult> findProject(@PathVariable("userNo")long userNo) {;
	      return ResponseEntity
	            .status(HttpStatus.OK)
	            .body(JsonResult.success(projectService.findProject(userNo)));
	}
	
	@GetMapping("/find/completeProject")
	public ResponseEntity<JsonResult> findCompleteProject(@RequestParam("userNo")long userNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(projectService.findCompleteProject(userNo)));
	}
	
	@GetMapping("/find/member/{projectNo}") 
	public ResponseEntity<JsonResult> findProjectMember(@PathVariable("projectNo") long projectNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(projectService.findProjectMember(projectNo)));
	}
	
	@GetMapping("/findProjectMembeByNo") 
	public ResponseEntity<JsonResult> findProjectMemberByNo(@RequestParam("userNo") Long userNo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(projectService.findProjectMemberByNo(userNo)));
	}
	
	@PostMapping("/update")
	public ResponseEntity<JsonResult> updateProject(@RequestParam("userNo") long userNo, @RequestBody ProjectVo projectVo) {
		String projectTitle = projectService.findProjectTitle(projectVo.getNo());
		ProjectVo updateProjectVo = projectService.updateProject(projectVo);
		
		noticeService.insertNoticeUpdateProject(updateProjectVo, userNo, projectTitle);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(updateProjectVo));
	}
	
	@DeleteMapping("/delete/{projectNo}")
	public ResponseEntity<JsonResult> deleteProject(@PathVariable("projectNo")long projectNo) {
		projectService.deleteProject(projectNo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success("delete ok!"));
	}
	
	@PutMapping("/finish/{projectNo}")
	public ResponseEntity<JsonResult> finishProject(@PathVariable("projectNo")long projectNo) {
		projectService.finishProject(projectNo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success("finish ok!"));
	}
	

	@GetMapping("/title/{projectNo}")
	public ResponseEntity<JsonResult> findProjectTitle(@PathVariable("projectNo")long projectNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(projectService.findProjectTitle(projectNo)));

	@GetMapping("/search/{word}")
	public ResponseEntity<JsonResult> searchProject(@PathVariable("word") String word, @RequestParam("userNo") long userNo) {
		List<ProjectVo> searchProjectList = projectService.searchProject(word, userNo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(searchProjectList));
	}
	
	@PutMapping("/change/ongoing")
	public ResponseEntity<JsonResult> changeOngoing(@RequestParam("userNo") long userNo, @RequestParam("projectNo") long projectNo) {
		projectService.changeOngoing(userNo, projectNo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success("change ongoing!"));

	}
	
}

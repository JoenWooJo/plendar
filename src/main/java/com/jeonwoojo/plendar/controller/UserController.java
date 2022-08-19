package com.jeonwoojo.plendar.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

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
import com.jeonwoojo.plendar.service.UserService;
import com.jeonwoojo.plendar.vo.UserVo;

@Controller
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/check/email")
	public ResponseEntity<JsonResult> checkEmail(@RequestBody UserVo vo) {
		boolean result = userService.checkEmail(vo.getEmail());
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(result)); 
	}
	
	@PostMapping("/join")
	public ResponseEntity<JsonResult> add(@RequestBody @Valid UserVo vo) {
		boolean joinResult = userService.insert(vo);
		
		if (joinResult) {
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success("insert 성공"));
		}
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(JsonResult.fail("insert 실패"));
	}
	
	@PostMapping("/login")
	public void login() {
	}
	
	@GetMapping("/logout")
	public void logout() {
	}
	
	
	@PostMapping("/axios/update")
	public ResponseEntity<JsonResult> updateUser(@RequestBody UserVo vo) {
		System.out.println("modify: "+vo);
		userService.updateUser(vo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(vo));
	}
	
	@PostMapping("/updateProfile")
	public ResponseEntity<JsonResult> update(@RequestBody UserVo vo) {
		System.out.println("modify: "+vo);
//		userService.updateProfile(vo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(vo));
	}

}
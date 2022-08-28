package com.jeonwoojo.plendar.controller;

import javax.validation.Valid;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.security.Auth;
import com.jeonwoojo.plendar.security.AuthUser;
import com.jeonwoojo.plendar.service.FileUploadService;
import com.jeonwoojo.plendar.service.UserService;
import com.jeonwoojo.plendar.vo.UserVo;

@Controller
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private FileUploadService fileUploadService;

	@PostMapping("/check/email")
	public ResponseEntity<JsonResult> checkEmail(@RequestBody UserVo vo) {
		boolean result = userService.checkEmail(vo.getEmail());

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(result));
	}

	@PostMapping("/join")
	public ResponseEntity<JsonResult> add(@RequestBody @Valid UserVo vo) {
		boolean joinResult = userService.insert(vo);

		if (joinResult) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("insert 성공"));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(JsonResult.fail("insert 실패"));
	}
	
	@RequestMapping("/login")
	public void login() {
	}
	
	@GetMapping("/logout")
	public void logout() {
	}
	
	@Auth
	@PostMapping("/axios/update")
	public ResponseEntity<JsonResult> updateUser(@RequestBody UserVo vo) {
		System.out.println("modify: " + vo);
		userService.updateUser(vo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}
	
	@Auth
	@PostMapping("/axios/deleteProfile")
	public ResponseEntity<JsonResult> deleteProfile(@RequestBody UserVo vo) {
		System.out.println("delete: " + vo);
		userService.deleteProfile(vo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}

	@Auth
	@PostMapping("/axios/updateProfile")
	public ResponseEntity<JsonResult> updateProfile(@RequestParam(value = "file") MultipartFile multipartFile, @AuthUser UserVo authUser) {
		System.out.println("AuthUser: " + authUser);
		
		String profile = "";
		try {
			profile = fileUploadService.restoreImage(multipartFile);
			System.out.println(profile);
		} catch (FileUploadException e) {
			e.printStackTrace();
		}

		UserVo vo = new UserVo();
		vo.setProfile(profile);
		vo.setNo(authUser.getNo());
		
		userService.updateProfile(vo);
		
		System.out.println("profile Update: " + vo);
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(profile));
	}
	
	@Auth
	@PostMapping("/confirmPassword")
	public ResponseEntity<JsonResult> confirmPassword(@RequestBody UserVo vo) {
		boolean result = userService.confirmPassword(vo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(result));
	}

}
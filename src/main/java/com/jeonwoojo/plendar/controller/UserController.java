package com.jeonwoojo.plendar.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
	
	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;

	@PostMapping("/check/email")
	public ResponseEntity<JsonResult> checkEmail(@RequestBody UserVo vo) {
		boolean result = userService.checkEmail(vo.getEmail());

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(result));
	}

	@PostMapping("/join")
	public ResponseEntity<JsonResult> add(@RequestBody @Valid UserVo vo) {
		vo.setPassword(this.bcryptPasswordEncoder.encode(vo.getPassword()));
		System.out.println(vo.getPassword());
		boolean joinResult = userService.insert(vo);

		if (joinResult) {
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("insert 성공"));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(JsonResult.fail("insert 실패"));
	}
	
	@GetMapping("/logout")
	public void logout() {
	}
	
	@PostMapping("/axios/update")
	public ResponseEntity<JsonResult> updateUser(@RequestBody UserVo vo) {
		vo.setPassword(this.bcryptPasswordEncoder.encode(vo.getPassword()));
		userService.updateUser(vo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}
	
	@PostMapping("/axios/deleteProfile")
	public ResponseEntity<JsonResult> deleteProfile(@RequestBody UserVo vo) {
		userService.deleteProfile(vo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}

	@PostMapping("/axios/updateProfile")
	public ResponseEntity<JsonResult> updateProfile(@RequestParam(value = "file") MultipartFile multipartFile,  @RequestParam("userNo") Long no) {
		
		String profile = "";
		try {
			profile = fileUploadService.restoreImage(multipartFile);
		} catch (FileUploadException e) {
			e.printStackTrace();
		}
		 Map<String, Object> map = new HashMap<>();
		 map.put("profile", profile);
		 map.put("userNo", no);
		
		userService.updateProfile(map);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(profile));
	}
	
	@PostMapping("/confirmPassword")
	public ResponseEntity<JsonResult> confirmPassword(@RequestBody UserVo vo) {
		UserVo user = userService.findByNo(vo.getNo());
		boolean result = userService.confirmPassword(vo);
		if(bcryptPasswordEncoder.matches(vo.getPassword(), user.getPassword()));
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(bcryptPasswordEncoder.matches(vo.getPassword(), user.getPassword())));
	}
	
	@GetMapping("/findByUserNo")
	public ResponseEntity<JsonResult> findByNo(@AuthUser UserVo authUser) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(userService.findByNo(authUser.getNo())));
	}

}
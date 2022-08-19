package com.jeonwoojo.plendar.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.UserService;
import com.jeonwoojo.plendar.vo.UserVo;

@Controller
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:9090", allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserService userService;

	
	@GetMapping({"", "/"})
	public String index() {
		//머스태치 기본폴더 src/main/resources/
		//뷰리졸브 설정 :templates (prefix), .mustache (suffix) 생략가능!!
		return "join"; //src/main/resources/templates/index.mustache
		
	}

//	@PostMapping("/join")
//	public String join(@ModelAttribute @Valid UserVo userVo, BindingResult result, Model model) {
//		if(result.hasErrors()) {
//			model.addAllAttributes(result.getModel());
//			return "/user/join";
//		}
//		userService.join(userVo);
//		return "redirect:user/login";
//	}

//	@PostMapping("/session")
//	public void sessionRequest(Model model, HttpSession session, HttpServletRequest request,
//			HttpServletResponse response) {
//	    String user_id = "test123" ;
//	    String user_name = "튜나" ;
//	    
//	    session.setMaxInactiveInterval(30*60);
//		session.setAttribute("user_id", user_id);
//	    session.setAttribute("user_name", user_name);
//
//	    session.getAttribute("user_id");
//	    session.getAttribute("user_name");
//	}

	@GetMapping("/mypage")
	public String mypage() {
		return "/user/mypage";
	}
	
	@PostMapping("/join")
	public ResponseEntity<JsonResult> add(@RequestBody @Valid UserVo vo, Model model, HttpSession session, HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("join: "+vo);
		userService.insert(vo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(vo));
	}
	
	@PostMapping("/login")
	public ResponseEntity<JsonResult> login(@RequestBody UserVo vo, HttpSession session, HttpServletRequest request,
			HttpServletResponse response) {	
		UserVo loginUser = userService.findUser(vo);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(loginUser));
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
	
	
	
	@RequestMapping(value="/auth")
	public void auth() {
	}

}
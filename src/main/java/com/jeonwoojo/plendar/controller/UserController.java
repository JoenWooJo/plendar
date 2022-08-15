package com.jeonwoojo.plendar.controller;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.jeonwoojo.plendar.service.UserService;
import com.jeonwoojo.plendar.vo.UserVo;

@Controller
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:9090",allowedHeaders= "*")
public class UserController {
	@Autowired
	private UserService userService;
	
	@GetMapping("/join")
	public String join(@ModelAttribute UserVo userVo) {
		return "user/join";
	}
	
	@PostMapping("/join")
	public String join(@ModelAttribute @Valid UserVo userVo, BindingResult result, Model model) {
		if(result.hasErrors()) {
			model.addAllAttributes(result.getModel());
			return "/user/join";
		}
		userService.join(userVo);
		return "redirect:user/login";
	}
	
	@GetMapping("/mypage")
	public String mypage() {
		return "/user/mypage";
	}
	
	
	@GetMapping("/login")
	public String login() {
		return  "user/login";
	}
	
//	@PostMapping("/login")
//	public String login(@RequestParam UserVo userVo) {
//		// 파라미터 알아서 수정하삼
//		return "";
//	}
	

}
package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.ChatService;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/chat")
public class ChatRoomController {
	
	@Autowired
	private ChatService chatService;

	@GetMapping("/rooms")
	public ResponseEntity<JsonResult> rooms() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(chatService.findAllRoom()));
	}
	
	@GetMapping("/room/member")
	public ResponseEntity<JsonResult> roomMemberList(@RequestParam(value="no") long no) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(chatService.findRoomMember(no))); 
	}
	
}

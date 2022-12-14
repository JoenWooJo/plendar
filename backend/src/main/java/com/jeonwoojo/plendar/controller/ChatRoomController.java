package com.jeonwoojo.plendar.controller;

import java.util.List;

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
import com.jeonwoojo.plendar.vo.ChatMessage;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/chat")
public class ChatRoomController {
	
	@Autowired
	private ChatService chatService;

	@GetMapping("/rooms")
	public ResponseEntity<JsonResult> rooms(@RequestParam("userNo")Long no) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(chatService.findAllRoom(no)));
	}
	
	@GetMapping("/sub/rooms")
	public ResponseEntity<JsonResult> subRooms(@RequestParam("userNo")Long no) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(chatService.findAllRoom(no)));
	}
	
	@GetMapping("/room/member")
	public ResponseEntity<JsonResult> roomMemberList(@RequestParam(value="roomNo") long no) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(chatService.findRoomMember(no))); 
	}
	
	@GetMapping("/room/messages")
	public ResponseEntity<JsonResult> roomMessages(@RequestParam(value="userNo") long userNo, @RequestParam(value="roomId") long roomId) {
		List<ChatMessage> messages = chatService.findMessages(roomId);
		chatService.updateNotice(userNo, roomId);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(messages)); 
	}
	
	@GetMapping("/notice")
	public ResponseEntity<JsonResult> roomNotice(@RequestParam(value="userNo") long userNo, 
			@RequestParam(value="roomId") long roomId, 
			@RequestParam(value="roomIdSelected") long roomIdSelected) {
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(chatService.findRoomNotice(userNo, roomId, roomIdSelected))); 
	}
	
	@GetMapping("/last/message")
	public ResponseEntity<JsonResult> findLastMessage(@RequestParam(value="roomId") long roomId) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(chatService.findLastMessage(roomId))); 
	}
	
//	@GetMapping("/notice/count")
//	public ResponseEntity<JsonResult> findNoticeCount(@AuthUser UserVo authUser) {
//		return ResponseEntity
//				.status(HttpStatus.OK)
//				.body(JsonResult.success(chatService.findNoticeCount(authUser))); 
//	}
	
}

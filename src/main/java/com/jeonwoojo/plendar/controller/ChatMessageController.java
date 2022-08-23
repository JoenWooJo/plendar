package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import com.jeonwoojo.plendar.service.ChatService;
import com.jeonwoojo.plendar.vo.ChatMessage;


@RestController
public class ChatMessageController {
	@Autowired
	private SimpMessageSendingOperations sendingOperations;
	
	@Autowired
	private ChatService chatService;

    @MessageMapping("/chat/message")
    public void enter(ChatMessage message) {
//        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
//            message.setMessage(message.getSender()+"님이 입장하였습니다.");
//        }
    	System.out.println("message: "+message);
        sendingOperations.convertAndSend("/topic/chat/room/"+message.getRoomId(),message);
        
//        chatService.chatMessageInsert(message);
    }
}

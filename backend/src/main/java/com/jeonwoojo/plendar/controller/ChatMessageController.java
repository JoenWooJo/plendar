package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import com.jeonwoojo.plendar.service.ChatService;
import com.jeonwoojo.plendar.service.NoticeService;
import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.UserVo;


@RestController
public class ChatMessageController {
	@Autowired
	private SimpMessageSendingOperations sendingOperations;
	@Autowired
	private ChatService chatService;
	@Autowired
	private NoticeService noticeService;

    @MessageMapping("/chat/message")
    public void enter(ChatMessage message) {
    	UserVo sendUserVo= chatService.findsendUser(message.getSender());
    	message.setSenderName(sendUserVo.getName());
    	message.setSenderProfile(sendUserVo.getProfile());
    	
    	chatService.chatMessageInsert(message);
        chatService.chatNoticeUpdate(message);
        
        sendingOperations.convertAndSend("/topic/chat/room/"+message.getRoomId(), message);
        
        noticeService.getChatAlramCount(message);
    }
    
//    @MessageMapping("/notice/message")
//    public void notice (NoticeMessage noticeMessage) {
////    	sendingOperations.convertAndSend("/topic/notice", noticeMessage);
//    }
}

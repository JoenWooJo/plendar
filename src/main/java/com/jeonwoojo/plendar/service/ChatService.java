package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.ChatRepository;
import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.ChatRoomVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Service
public class ChatService {
	
	@Autowired
	private ChatRepository chatRepository;
	public List<UserVo> findRoomMember(long no) {
		return chatRepository.findRoomMember(no);
	};

	public List<ChatRoomVo> findAllRoom(Long no) {
		return chatRepository.findAllRoom(no);
	}

	public boolean chatMessageInsert(ChatMessage message) {
		return chatRepository.chatMessageInsert(message);
	}
	
	
}

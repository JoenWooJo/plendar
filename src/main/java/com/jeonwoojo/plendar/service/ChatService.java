package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.ChatRepository;
import com.jeonwoojo.plendar.vo.ChatRoomVo;

@Service
public class ChatService {
	
	@Autowired
	private ChatRepository chatRepository;

	public List<ChatRoomVo> findAllRoom() {
		return chatRepository.findAllRoom();
	}
	
	
}

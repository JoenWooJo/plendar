package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.ChatRepository;
import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.ChatNotice;
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

	public List<ChatMessage> findMessages(long roomId) {
		return chatRepository.findMessages(roomId);
	}

	public UserVo findsendUser(long senderNo) {
		return chatRepository.findsendUser(senderNo);
	}

	public boolean chatNoticeInsert(ChatMessage message) {
		return chatRepository.chatNoticeInsert(message);
	}

	public boolean updateNotice(UserVo authUser, long roomId) {
		return chatRepository.updateNotice(authUser.getNo(), roomId);
	}

	public ChatNotice findRoomNotice(UserVo authUser, long roomId, long roomIdSelected) {
		if (roomId == roomIdSelected) {
			chatRepository.updateNotice(authUser.getNo(), roomId);
		}
		return chatRepository.findRoomNotice(authUser.getNo(), roomId);
	}

	public void chatNoticeUpdate(ChatMessage message) {
		List<UserVo> member = chatRepository.findRoomMember(message.getRoomId());
		
		for(int i=0;i<member.size();i++) {
			if(member.get(i).getNo() != message.getSender()) {
				chatRepository.chatNoticeUpdate(member.get(i).getNo(), message.getRoomId());
			}
			
		}
	}
	
	
}

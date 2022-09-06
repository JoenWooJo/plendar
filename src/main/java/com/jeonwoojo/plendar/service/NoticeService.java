package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.ChatRepository;
import com.jeonwoojo.plendar.repository.NoticeRepository;
import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.NoticeMessage;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Service
public class NoticeService {
	@Autowired
	private SimpMessageSendingOperations sendingOperations;
	@Autowired
	private NoticeRepository noticeRepository;
	@Autowired
	private ChatRepository chatRepository;
	
	public NoticeMessage insertNoticeProject(ProjectVo projectVo, UserVo authUser) {
		return noticeRepository.insertNoticeProject(projectVo, authUser.getNo());
	}

	public List<NoticeMessage> getAlramList(UserVo authUser) {
		return noticeRepository.getAlramList(authUser.getNo());
	}

	public NoticeMessage insertNoticeUpdateProject(ProjectVo updateProjectVo, UserVo authUser, String projectTitle) {
		return noticeRepository.insertNoticeUpdateProject(updateProjectVo, authUser.getNo(), projectTitle);
	}

	public NoticeMessage insertNoticeCard(CardVo newCardVo, String projectTitle) {
		return noticeRepository.insertNoticeCard(newCardVo, projectTitle);
	}

	public void getChatAlramCount(ChatMessage message) {
		List<UserVo> chatMember = chatRepository.findRoomMember(message.getRoomId());
		
		for(int i=0; i<chatMember.size();i++) {
			int count = noticeRepository.getChatAlramCount(chatMember.get(i).getNo());
			sendingOperations.convertAndSend("/topic/notice/chat/"+chatMember.get(i).getNo(), count);
		}
		
	}

	public int getChatAlramCount(Long userNo) {
		return noticeRepository.getChatAlramCount(userNo);
	}

}

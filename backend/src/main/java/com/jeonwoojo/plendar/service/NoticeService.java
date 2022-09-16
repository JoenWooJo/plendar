package com.jeonwoojo.plendar.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.CardRepository;
import com.jeonwoojo.plendar.repository.ChatRepository;
import com.jeonwoojo.plendar.repository.NoticeRepository;
import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.CommentVo;
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
	@Autowired
	private CardRepository cardRepository;
	
	public void insertNoticeProject(ProjectVo projectVo, long userNo) {
		noticeRepository.insertNoticeProject(projectVo, userNo);
	}

	public List<NoticeMessage> getAlramList(long userNo) {
		return noticeRepository.getAlramList(userNo);
	}

	public void insertNoticeUpdateProject(ProjectVo updateProjectVo, long userNo, String projectTitle) {
		noticeRepository.insertNoticeUpdateProject(updateProjectVo, userNo, projectTitle);
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

	public void deleteNotice(long noticeNo) {
		noticeRepository.deleteNotice(noticeNo);
	}

	public void commentNotice(CommentVo commentVo) {
		CardVo cardVo = cardRepository.findCardInfo(commentVo.getCardNo());
		List<UserVo> cardMember = cardRepository.findCurrentCardMember(commentVo.getCardNo());
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		NoticeMessage noticeMessage = new NoticeMessage();
		noticeMessage.setMessage(cardVo.getTitle()+"의 코멘트가 추가 되었습니다.");
		noticeMessage.setType("comment");
		noticeMessage.setProjectNo(commentVo.getProjectNo());
		noticeMessage.setCardNo(commentVo.getCardNo());
		
		for(int i=0; i<cardMember.size();i++) {
			noticeMessage.setTime(dtf.format(LocalDateTime.now()));
			noticeMessage.setUserNo(cardMember.get(i).getNo());
			noticeRepository.insertNotice(noticeMessage);
			sendingOperations.convertAndSend("/topic/notice/"+cardMember.get(i).getNo(), noticeMessage);
		}
	}

	public void deleteCardNotice(Long projectNo, CardVo cardVo) {
		List<UserVo> cardMember = cardRepository.findCurrentCardMember(cardVo.getNo());
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		NoticeMessage noticeMessage = new NoticeMessage();
		noticeMessage.setMessage(cardVo.getTitle()+"(카드)가 삭제 되었습니다.");
		noticeMessage.setType("cardDelete");
		noticeMessage.setProjectNo(projectNo);
		
		for(int i=0; i<cardMember.size();i++) {
			noticeMessage.setTime(dtf.format(LocalDateTime.now()));
			noticeMessage.setUserNo(cardMember.get(i).getNo());
			noticeRepository.insertNoticeDelete(noticeMessage);
			sendingOperations.convertAndSend("/topic/notice/"+cardMember.get(i).getNo(), noticeMessage);
		}
		 
	}

}

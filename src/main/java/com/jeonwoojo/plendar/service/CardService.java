package com.jeonwoojo.plendar.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.CardRepository;
import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.CommentVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Service
public class CardService {
	
	@Autowired
	private CardRepository cardRepository;
	@Autowired
	private NoticeService noticeService;

	public List<CardVo> findCard(Long deckNo) {
		return cardRepository.findCard(deckNo);
	}

	public List<UserVo> findCardUser(Long projectNo) {
		return cardRepository.findCardUser(projectNo);
	}

	public CardVo createCard(CardVo cardVo) {
		return cardRepository.createCard(cardVo);
	}

	public void commentInsert(CommentVo commentVo) {
		cardRepository.commentInsert(commentVo);
	}

	public List<CommentVo> findComment(Long cardNo) {
		return cardRepository.findComment(cardNo);
	}

	public List<UserVo> findCurrentCardMember(Long cardNo) {
		return cardRepository.findCurrentCardMember(cardNo);
	}

	public CardVo findCardInfo(Long cardNo) {
		return cardRepository.findCardInfo(cardNo);
	}

	public CardVo updateCard(CardVo cardVo) {
		cardRepository.updateCard(cardVo);
		
		List<UserVo> origin = cardRepository.findCurrentCardMember(cardVo.getNo());
		List<UserVo> newMember = cardVo.getMember();
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("cardNo", cardVo.getNo());
		map.put("deckNo", cardVo.getDeckNo());
		for(int i=0;i<origin.size();i++) {
			map.put("userVo", origin.get(i));
			cardRepository.deleteMember(map);
			map.remove("userVo");
		}
		
		for(int i=0;i<newMember.size();i++) {
			map.put("userVo", newMember.get(i));
			cardRepository.memberUpdate(map);
			map.remove("userVo");
		}
		
		return cardVo;
	}

	public void deleteCard(Long cardNo) {
		cardRepository.deleteCard(cardNo);
	}

	public void cardNotice(CardVo newCardVo, String projectTitle) {
		noticeService.insertNoticeCard(newCardVo, projectTitle);
	}

}

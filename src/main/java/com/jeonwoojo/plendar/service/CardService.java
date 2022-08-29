package com.jeonwoojo.plendar.service;

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

}

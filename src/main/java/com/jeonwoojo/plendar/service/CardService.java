package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.CardRepository;
import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.CommentVo;

@Service
public class CardService {
	
	@Autowired
	private CardRepository cardRepository;

	public List<CardVo> findCard(Long deckNo) {
		return cardRepository.findCard(deckNo);
	}

	public Object findCardUser() {
		return cardRepository.findCardUser();
	}

	public void commentInsert(CommentVo commentVo) {
		cardRepository.commentInsert(commentVo);
	}

}

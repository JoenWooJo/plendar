package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.CardRepository;
import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.DeckVo;
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
		System.out.println("CS: " + cardVo);
		return cardRepository.createCard(cardVo);
	}

}

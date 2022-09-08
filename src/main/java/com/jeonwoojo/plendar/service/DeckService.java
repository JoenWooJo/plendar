package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.CardRepository;
import com.jeonwoojo.plendar.repository.DeckRepository;
import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.DeckVo;

@Service
public class DeckService {
	
	@Autowired
	private DeckRepository deckRepository;
	@Autowired
	private CardRepository cardRepository;

	public List<DeckVo> findDeck(Long projectNo) {
		return deckRepository.findDeck(projectNo);
	}

	public boolean createDeck(DeckVo deckVo) {
		return deckRepository.createDeck(deckVo);
	}

	public boolean updateDeck(DeckVo deckVo) {
		return deckRepository.updateDeck(deckVo);
	}

	public void deleteDeck(long deckNo) {
		List<CardVo> cardList = cardRepository.findCard(deckNo);
		
		for(int i=0; i < cardList.size(); i++) {
			cardRepository.deleteCard(cardList.get(i).getNo());
		}
		deckRepository.deleteDeck(deckNo);
	}

}

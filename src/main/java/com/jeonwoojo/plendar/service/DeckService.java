package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.DeckRepository;
import com.jeonwoojo.plendar.vo.DeckVo;

@Service
public class DeckService {
	
	@Autowired
	private DeckRepository deckRepository;

	public List<DeckVo> findDeck(Long projectNo) {
		return deckRepository.findDeck(projectNo);
	}

	public boolean createDeck(DeckVo deckVo) {
		return deckRepository.createDeck(deckVo);
	}

	public boolean updateDeck(DeckVo deckVo) {
		return deckRepository.updateDeck(deckVo);
	}

	public boolean moveDeck(List<DeckVo> deckList) {
		for(int i=0; i<deckList.size(); i++ ) {
		 deckRepository.moveDeck(deckList.get(i));
		}
		return false;
	}

}

package com.jeonwoojo.plendar.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	public void deleteDeck(long projectNo, long deckNo) {
		List<CardVo> cardList = cardRepository.findCard(deckNo);
		
		for(int i=0; i < cardList.size(); i++) {
			cardRepository.deleteCard(cardList.get(i).getNo());
		}
		// deck sequence 교체 해주기
		List<DeckVo> deckList = deckRepository.findDeck(projectNo);
		DeckVo deckVo = deckRepository.findOneDeck(deckNo);
		
		for(int i=0; i< deckList.size();i++) {
			if(deckVo.getSequence()<deckList.get(i).getSequence()) {
				deckRepository.updateSequence(deckList.get(i));
			}
		}
		deckRepository.deleteDeck(deckNo);
	}

	public boolean moveDeck(List<DeckVo> deckList) {
		for(int i=0; i<deckList.size(); i++ ) {
		 deckRepository.moveDeck(deckList.get(i));
		}
		return false;

	}

    public List<DeckVo> getCardList(Long projectNo) {
        return deckRepository.findAll(projectNo);
    }

	@Transactional
    public void updateDeckOrder(Map moving) {
        deckRepository.updateOrderNos(moving);
        deckRepository.updateOrderNo(moving);
    }

}

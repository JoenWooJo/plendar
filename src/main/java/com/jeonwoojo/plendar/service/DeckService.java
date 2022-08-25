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

}

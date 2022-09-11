package com.jeonwoojo.plendar.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.DeckVo;

@Repository
public class DeckRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<DeckVo> findDeck(Long projectNo) {
		return sqlSession.selectList("deck.findDeck", projectNo);
	}

	public boolean createDeck(DeckVo deckVo) {
		return sqlSession.insert("deck.insertDeck", deckVo) == 1;
	}

	public boolean updateDeck(DeckVo deckVo) {
		return sqlSession.update("deck.updateDeck",deckVo) ==1;
	}

	public boolean moveDeck(DeckVo deckList) {
		return sqlSession.update("deck.moveDeck",deckList) ==1;
	} 

}

package com.jeonwoojo.plendar.repository;

import java.util.List;
import java.util.Map;

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


	public void deleteDeck(long deckNo) {
		sqlSession.delete("deck.deleteDeck", deckNo);
	}

	public boolean moveDeck(DeckVo deckList) {
		return sqlSession.update("deck.moveDeck",deckList) ==1;

	}

	public DeckVo findOneDeck(long deckNo) {
		return sqlSession.selectOne("deck.findOneDeck", deckNo);
	}

	public void updateSequence(DeckVo deckVo) {
		sqlSession.update("deck.updateSequence", deckVo);
	}

	public List<DeckVo> findAll(Long projectNo) {
		return sqlSession.selectList("deck.findAll", projectNo);
	}

	public void updateOrderNos(Map moving) {
		sqlSession.update("deck.updateOrderNos", moving);
    }

	public void updateOrderNo(Map moving) {
		sqlSession.update("deck.updateOrderNo", moving);
	}

}

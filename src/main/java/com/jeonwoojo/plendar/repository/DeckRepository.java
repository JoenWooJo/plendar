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

}

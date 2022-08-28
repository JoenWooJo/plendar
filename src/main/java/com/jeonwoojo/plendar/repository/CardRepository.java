package com.jeonwoojo.plendar.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.CommentVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class CardRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<CardVo> findCard(Long deckNo) {
		return sqlSession.selectList("card.findCard", deckNo);
	}

	public List<UserVo> findCardUser() {
		return sqlSession.selectList("card.findCardUser");
	}

	public boolean commentInsert(CommentVo commentVo) {
		return sqlSession.insert("card.commentInsert", commentVo) ==1;
	}


}

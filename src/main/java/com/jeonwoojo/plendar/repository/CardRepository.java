package com.jeonwoojo.plendar.repository;

import java.util.HashMap;
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

	public List<UserVo> findCardUser(Long projectNo) {
		return sqlSession.selectList("card.findCardUser", projectNo);
	}

	public CardVo createCard(CardVo cardVo) {
		sqlSession.insert("card.createCard", cardVo);
		
		List<UserVo> list = cardVo.getMember();

		HashMap<String, Object> map = new HashMap<>();
		map.put("cardNo", cardVo.getNo());
		map.put("deckNo", cardVo.getDeckNo());

		for (int i=0;i<list.size();i++) {
			map.put("userVo", list.get(i));
			sqlSession.insert("card.insertMember", map);
			map.remove("userVo");
		}

		return cardVo;
	}

	public boolean commentInsert(CommentVo commentVo) {
		return sqlSession.insert("card.commentInsert", commentVo) ==1;
	}

	public List<CommentVo> findComment(Long cardNo) {
		return sqlSession.selectList("card.findComment", cardNo);
	}


}

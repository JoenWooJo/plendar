package com.jeonwoojo.plendar.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	public List<UserVo> findCurrentCardMember(Long cardNo) {
		return sqlSession.selectList("card.findCurrentCardMember", cardNo);
	}

	public CardVo findCardInfo(Long cardNo) {
		return sqlSession.selectOne("card.findCardInfo", cardNo);
	}

	public CardVo updateCard(CardVo cardVo) {
		sqlSession.update("card.updateCard", cardVo);
		return cardVo;
	}

	public void deleteMember(HashMap<String, Object> map) {
		sqlSession.delete("card.deleteMember", map);
	}

	public void memberUpdate(HashMap<String, Object> map) {
		sqlSession.insert("card.memberUpdate", map);
	}

	public void deleteCard(Long cardNo) {
		sqlSession.delete("card.deleteTask", cardNo);
		sqlSession.delete("card.deleteComment", cardNo);
		sqlSession.delete("card.deleteItem", cardNo);
		sqlSession.delete("card.deleteCardNotice", cardNo);
		sqlSession.delete("card.deleteCardMember", cardNo);
		sqlSession.delete("card.deleteCard", cardNo);
		
		
	}

	public Long findTaskCount(Long cardNo) {
		return sqlSession.selectOne("card.findTaskCount", cardNo);
	}

	public Long findNCount(Long cardNo) {
		return sqlSession.selectOne("card.findNCount", cardNo);
	}


	@SuppressWarnings("rawtypes")
	public void updateOrderNo(Map moving) {
		sqlSession.update("card.updateOrderNo", moving);
	}


	@SuppressWarnings("rawtypes")
	public void updateOrderNos(Map moving) {
		sqlSession.update("card.updateOrderNos", moving);
	}

	
}

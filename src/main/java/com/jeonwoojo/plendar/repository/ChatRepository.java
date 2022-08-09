package com.jeonwoojo.plendar.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.ChatRoomVo;

@Repository
public class ChatRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<ChatRoomVo> findAllRoom() {
		return sqlSession.selectList("chat.findAllRoom");
	}

}

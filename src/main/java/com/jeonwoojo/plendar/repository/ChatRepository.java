package com.jeonwoojo.plendar.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.ChatRoomVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class ChatRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<ChatRoomVo> findAllRoom(Long no) {
		return sqlSession.selectList("chat.findAllRoom", no);
	}

	public List<UserVo> findRoomMember(long no) {
		return sqlSession.selectList("chat.findRoomMember", no);
	}

	public boolean chatMessageInsert(ChatMessage message) {
		return sqlSession.insert("chat.chatMessageInsert", message) == 1;
	}

}

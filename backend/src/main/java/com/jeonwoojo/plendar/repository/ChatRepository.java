package com.jeonwoojo.plendar.repository;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.ChatNotice;
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

	public List<ChatMessage> findMessages(long roomId) {
		return sqlSession.selectList("chat.findMessages", roomId);
	}

	public UserVo findsendUser(long senderNo) {
		return sqlSession.selectOne("chat.findsendUser", senderNo);
	}

	public boolean chatNoticeInsert(ChatMessage message) {
		return sqlSession.insert("chat.chatNoticeInsert", message)==1;
	}

	public boolean updateNotice(Long userNo, long roomId) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("roomId", roomId);
		map.put("userNo", userNo);
		
		return sqlSession.update("chat.updateNoticeFalse", map)==1;
	}

	public ChatNotice findRoomNotice(Long userNo, long roomId) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("roomId", roomId);
		map.put("userNo", userNo);
		return sqlSession.selectOne("chat.findRoomNotice", map);
	}

	public void chatNoticeUpdate(Long userNo, long roomId) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("roomId", roomId);
		map.put("userNo", userNo);
		sqlSession.update("chat.updateNoticeInsert", map);
	}

	public ChatMessage findLastMessage(long roomId) {
		return sqlSession.selectOne("chat.findLastMessage", roomId);
	}

	public int findNoticeCount(Long userNo) {
		return sqlSession.selectOne("chat.findNoticeCount", userNo);
	}

}

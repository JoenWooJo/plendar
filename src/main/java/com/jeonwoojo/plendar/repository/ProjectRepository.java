package com.jeonwoojo.plendar.repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.DeckVo;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class ProjectRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<UserVo> findUser() {
		return sqlSession.selectList("project.findUser");
	}

	public ProjectVo createProject(ProjectVo projectVo, UserVo authUser) {
		sqlSession.insert("project.createProject", projectVo);
		
		List<UserVo> list = projectVo.getMember();
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("projectNo", projectVo.getNo());
		map.put("authUser", authUser);
		
		sqlSession.insert("chat.chatRoomCreate", projectVo);
		sqlSession.insert("project.insertReader", map);
		sqlSession.insert("chat.chatNoticeInsertReader", map);
		
		for (int i=0;i<list.size();i++) {
			if(list.get(i).getPermission() == null) {
				list.get(i).setPermission("0");
			} else {
				list.get(i).setPermission("1");
			}
			map.put("userVo", list.get(i));
			sqlSession.insert("project.insertMember", map);
			sqlSession.insert("chat.chatNoticeInsert", map);
			map.remove("userVo");
		}
		
		
		ChatMessage firstMessage = new ChatMessage();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		
		firstMessage.setRoomId(projectVo.getNo());
		firstMessage.setSender(1); // admin용 id 필요할지도,,,?
		firstMessage.setMessage(projectVo.getTitle()+" 채팅방이 개설 되었습니다.");
		firstMessage.setSendTime(dtf.format(LocalDateTime.now()));
		firstMessage.setType("notice");
		
		sqlSession.insert("chat.chatMessageInsert", firstMessage);
		
		ArrayList<DeckVo> defaultDeck = new ArrayList<DeckVo>();
		
		DeckVo toDo = new DeckVo();
		toDo.setProjectNo(projectVo.getNo());
		toDo.setTitle("ToDo");
		toDo.setSequence(1);
		defaultDeck.add(toDo);
		
		DeckVo doing = new DeckVo();
		doing.setProjectNo(projectVo.getNo());
		doing.setTitle("Doing");
		doing.setSequence(2);
		defaultDeck.add(doing);
		
		DeckVo done = new DeckVo();
		done.setProjectNo(projectVo.getNo());
		done.setTitle("Done");
		done.setSequence(3);
		defaultDeck.add(done);
		
		for (int i=0;i<defaultDeck.size();i++) {
			map.put("deck", defaultDeck.get(i));
			sqlSession.insert("deck.insertDefaultDeck", map);
			map.remove("deck");
		}
		
		return projectVo;
	}

	public List<ProjectVo> findProject(Long userNo) {
		return sqlSession.selectList("project.findProject", userNo);
	}

	public List<ProjectVo> findCompleteProject(Long userNo) {
		return sqlSession.selectList("project.findCompleteProject", userNo);
	}

	public Object updateProject(ProjectVo projectVo, UserVo authUser) {
		return sqlSession.update("project.updateProject", projectVo);
	}

	public List<UserVo> findProjectMember(long projectNo) {
		return sqlSession.selectList("project.findProjectMember", projectNo);
	}

	public ProjectVo updateProject(ProjectVo projectVo) {
		sqlSession.update("project.updateProject", projectVo);
		return projectVo;
	}

	public void deleteMember(HashMap<String, Object> map) {
		sqlSession.delete("project.deleteMember", map);
	}

	public void memberUpdate(HashMap<String, Object> map) {
		sqlSession.insert("project.memberUpdate", map);
	}

	public void updateChatRoom(ProjectVo projectVo) {
		sqlSession.update("chat.updateChatRoom", projectVo);
	}

	public void noticeMessageInsert(ChatMessage memberMessage) {
		sqlSession.update("chat.chatMessageInsert", memberMessage);
	}
	

}

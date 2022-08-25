package com.jeonwoojo.plendar.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
		
		sqlSession.insert("project.insertReader", map);
		
		for (int i=0;i<list.size();i++) {
			if(list.get(i).getPermission() == null) {
				list.get(i).setPermission("0");
			} else {
				list.get(i).setPermission("1");
			}
			map.put("userVo", list.get(i));
			sqlSession.insert("project.insertMember", map);
			map.remove("userVo");
		}
		
		sqlSession.insert("chat.chatRoomCreate", projectVo);
		
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

}

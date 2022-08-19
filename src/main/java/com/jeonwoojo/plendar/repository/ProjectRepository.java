package com.jeonwoojo.plendar.repository;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class ProjectRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<UserVo> findUser() {
		return sqlSession.selectList("project.findUser");
	}

	public ProjectVo createProject(ProjectVo projectVo) {
		sqlSession.insert("project.createProject", projectVo);
		System.out.println("repo: "+projectVo.getMember());
		
		List<UserVo> list = projectVo.getMember();
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("projectNo", projectVo.getNo());
		
		for (int i=0;i<list.size();i++) {
			System.out.println(list.get(i));
			if(list.get(i).getPermission() == null) {
				list.get(i).setPermission("'N'");
			} else {
				list.get(i).setPermission("'Y'");
			}
			map.put("userVo", list.get(i));
			sqlSession.insert("project.insertMember", map);
			map.remove("userVo");
		}
		
		return projectVo;
	}

}

package com.jeonwoojo.plendar.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class ProjectRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<UserVo> findUser() {
		return sqlSession.selectList("project.findUser");
	}

}

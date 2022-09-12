package com.jeonwoojo.plendar.auth;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class SecurityRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public UserVo findByEmail(String email) {
		return sqlSession.selectOne("auth.findByEmail", email);
	}

}

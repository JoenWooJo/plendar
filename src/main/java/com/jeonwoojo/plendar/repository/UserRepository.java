package com.jeonwoojo.plendar.repository;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class UserRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public UserVo findByNo(Long no) {
		return sqlSession.selectOne("user.findAll", no);
	}
	
	public boolean insert(UserVo vo) {
		return sqlSession.insert("user.insert", vo) == 1;
	}

	public UserVo findByEmailAndPassword(UserVo vo) {
		return sqlSession.selectOne("user.findByEmailAndPassword", vo);
	}

	public UserVo checkEmail(String email) {
		return sqlSession.selectOne("user.checkEmail", email);
	}

	public boolean updateUser(UserVo vo) {
		return sqlSession.update("user.updateUser", vo) == 1;
	}

	public boolean updateProfile(Map map) {
		return sqlSession.update("user.updateProfile", map) == 1;
	}

	public UserVo checkPassword(UserVo vo) {
		return sqlSession.selectOne("user.checkPassword", vo);
	}

	public boolean deleteProfile(UserVo vo) {
		System.out.println("repositry" + vo);
		return sqlSession.update("user.deleteProfile", vo) == 1;
	}
}

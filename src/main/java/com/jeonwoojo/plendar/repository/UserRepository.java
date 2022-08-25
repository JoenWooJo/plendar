package com.jeonwoojo.plendar.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class UserRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
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
		System.out.println("repositry" + vo);
		return sqlSession.insert("user.updateUser", vo) == 1;
	}

	public boolean updateProfile(UserVo vo) {
		System.out.println("repositry" + vo);
		return sqlSession.update("user.updateProfile", vo) == 1;
	}

	public UserVo getProfile() {
		// TODO Auto-generated method stub
		return null;
	}
}

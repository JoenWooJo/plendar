package com.jeonwoojo.plendar.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.CalendarVo;

@Repository
public class CalendarRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<CalendarVo> findAll() {
		return sqlSession.selectList("calendar.findAll");
	}

	public List<CalendarVo> findByNo() {
		return sqlSession.selectList("calendar.findByNo");
	}

}

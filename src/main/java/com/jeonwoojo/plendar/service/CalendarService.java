package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.CalendarRepository;
import com.jeonwoojo.plendar.vo.CalendarVo;

@Service
public class CalendarService {
	
	@Autowired
	private CalendarRepository calendarRepository;

	public List<CalendarVo> findAll(Long userNo) {
		return calendarRepository.findAll(userNo);
	}

	public List<CalendarVo> findByNo(Long userNo) {
		return calendarRepository.findByNo(userNo);
	}


}

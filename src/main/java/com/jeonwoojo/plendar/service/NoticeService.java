package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.NoticeRepository;
import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.NoticeMessage;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Service
public class NoticeService {
	@Autowired
	private NoticeRepository noticeRepository;
	
	public NoticeMessage insertNoticeProject(ProjectVo projectVo, UserVo authUser) {
		return noticeRepository.insertNoticeProject(projectVo, authUser.getNo());
	}

	public List<NoticeMessage> getAlramList(UserVo authUser) {
		return noticeRepository.getAlramList(authUser.getNo());
	}

	public NoticeMessage insertNoticeUpdateProject(ProjectVo updateProjectVo, UserVo authUser, String projectTitle) {
		return noticeRepository.insertNoticeUpdateProject(updateProjectVo, authUser.getNo(), projectTitle);
	}

	public NoticeMessage insertNoticeCard(CardVo newCardVo, UserVo authUser, String projectTitle) {
		return noticeRepository.insertNoticeCard(newCardVo, authUser.getNo(), projectTitle);
	}

}

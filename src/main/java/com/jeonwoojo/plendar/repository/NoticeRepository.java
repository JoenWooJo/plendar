package com.jeonwoojo.plendar.repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.NoticeMessage;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class NoticeRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public NoticeMessage insertNoticeProject(ProjectVo projectVo, Long userNo) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		NoticeMessage noticeMessage = new NoticeMessage();
		noticeMessage.setMessage(projectVo.getTitle()+" 프로젝트가 생성 되었습니다.");
		noticeMessage.setType("create");
		noticeMessage.setTime(dtf.format(LocalDateTime.now()));
		noticeMessage.setProjectNo(projectVo.getNo());
		
		List<UserVo> member = sqlSession.selectList("project.findProjectMember", projectVo.getNo());
		for(int i=0;i<member.size();i++) {
			noticeMessage.setUserNo(member.get(i).getNo());
			sqlSession.insert("notice.insertNoticeProject", noticeMessage);
		}
		noticeMessage.setUserNo(userNo);
		
		return noticeMessage;
	}

	public List<NoticeMessage> getAlramList(Long userNo) {
		return sqlSession.selectList("notice.getAlramList", userNo);
	}
}

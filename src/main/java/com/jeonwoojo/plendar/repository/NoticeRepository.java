package com.jeonwoojo.plendar.repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.NoticeMessage;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Repository
public class NoticeRepository {
	@Autowired
	private SimpMessageSendingOperations sendingOperations;
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

	public NoticeMessage insertNoticeUpdateProject(ProjectVo updateProjectVo, Long userNo, String projectTitle) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		NoticeMessage noticeMessage = new NoticeMessage();
		noticeMessage.setMessage(projectTitle+" 프로젝트가 수정 되었습니다.");
		noticeMessage.setType("update");
		noticeMessage.setTime(dtf.format(LocalDateTime.now()));
		noticeMessage.setProjectNo(updateProjectVo.getNo());
		
		for(int i=0;i<updateProjectVo.getMember().size();i++) {
			noticeMessage.setUserNo(updateProjectVo.getMember().get(i).getNo());
			sqlSession.insert("notice.insertNoticeProject", noticeMessage);
		}
		noticeMessage.setUserNo(userNo);
		
		return noticeMessage;
	}

	public NoticeMessage insertNoticeCard(CardVo newCardVo, String projectTitle) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		NoticeMessage noticeMessage = new NoticeMessage();
		noticeMessage.setMessage(projectTitle+" 프로젝트의 "+newCardVo.getTitle()+"(카드)가 생성 되었습니다.");
		noticeMessage.setType("card");
		noticeMessage.setTime(dtf.format(LocalDateTime.now()));
		noticeMessage.setProjectNo(newCardVo.getProjectNo());
		noticeMessage.setDeckNo(newCardVo.getDeckNo());
		noticeMessage.setCardNo(newCardVo.getNo());
		
		for(int i=0;i<newCardVo.getMember().size();i++) {
			noticeMessage.setUserNo(newCardVo.getMember().get(i).getNo());
			sqlSession.insert("notice.insertNoticeCard", noticeMessage);
			sendingOperations.convertAndSend("/topic/notice/"+newCardVo.getMember().get(i).getNo(), noticeMessage);
		}
		
		return noticeMessage;
	}

	public int getChatAlramCount(Long userNo) {
		return sqlSession.selectOne("notice.getChatAlramCount", userNo);
	}

	public void deleteNotice(long noticeNo) {
		sqlSession.delete("notice.deleteNotice", noticeNo);
	}
}

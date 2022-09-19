package com.jeonwoojo.plendar.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.ChatRepository;
import com.jeonwoojo.plendar.repository.NoticeRepository;
import com.jeonwoojo.plendar.repository.ProjectRepository;
import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.NoticeMessage;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Service
public class ProjectService {
	
	@Autowired
	private SimpMessageSendingOperations sendingOperations;
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private ChatRepository chatRepository;
	@Autowired
	private NoticeRepository noticeRepository;
	
	public List<UserVo> findUser() {
		return projectRepository.findUser();
	}

	public ProjectVo createProject(ProjectVo projectVo, long userNo) {
		return projectRepository.createProject(projectVo, userNo);
	}

	public List<ProjectVo> findProject(Long userNo) {
		return projectRepository.findProject(userNo);
	}

	public List<ProjectVo> findCompleteProject(Long userNo) {
		return projectRepository.findCompleteProject(userNo);
	}

	public List<UserVo> findProjectMember(long projectNo) {
		return projectRepository.findProjectMember(projectNo);
	}

	public ProjectVo updateProject(ProjectVo projectVo) {
		projectRepository.updateProject(projectVo);
		projectRepository.updateChatRoom(projectVo);
		List<UserVo> origin = projectRepository.findProjectMember(projectVo.getNo());
		List<UserVo> originLong = new ArrayList<UserVo>();
		
		List<UserVo> fixed = new ArrayList<UserVo>();
		
		List<UserVo> newMember = projectVo.getMember();
		List<UserVo> newMemberLong = new ArrayList<UserVo>();
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("projectNo", projectVo.getNo());
		
		for(int i=0;i<origin.size();i++) {
			map.put("userVo", origin.get(i));
			projectRepository.deleteMember(map);
			projectRepository.deleteChatNotice(map);
			UserVo memVo = new UserVo();
			memVo.setNo(origin.get(i).getNo());
			memVo.setName(origin.get(i).getName());
			originLong.add(memVo);
			fixed.add(memVo);
			map.remove("userVo");
		}
		
		for(int i=0;i<newMember.size();i++) {
			map.put("userVo", newMember.get(i));
			projectRepository.memberUpdate(map);
			chatRepository.chatNoticeUpdate(newMember.get(i).getNo(), projectVo.getNo());
			UserVo memVo = new UserVo();
			memVo.setNo(newMember.get(i).getNo());
			memVo.setName(newMember.get(i).getName());
			newMemberLong.add(memVo);
			map.remove("userVo");
		}
		
		// 퇴장, 입장 메세지 보내기
		fixed.retainAll(newMemberLong);
		
		ChatMessage MemberMessage = new ChatMessage();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		
		MemberMessage.setRoomId(projectVo.getNo());
		MemberMessage.setSender(1); // admin용 id 필요할지도,,,?
		MemberMessage.setType("notice");
		
		MemberMessage.setMessage(projectVo.getTitle()+" 으로 이름이 변경 되었습니다.");
		MemberMessage.setSendTime(dtf.format(LocalDateTime.now()));
		projectRepository.noticeMessageInsert(MemberMessage);
		
		originLong.removeAll(fixed);
		//퇴장 메세지
		for(int i=0;i<originLong.size();i++) {
			MemberMessage.setMessage(originLong.get(i).getName()+"님께서 퇴장하셨습니다.");
			MemberMessage.setSendTime(dtf.format(LocalDateTime.now()));
			projectRepository.noticeMessageInsert(MemberMessage);
		}
		
		newMemberLong.removeAll(fixed);
		//입장 메세지
		for(int i=0;i<newMemberLong.size();i++) {
			MemberMessage.setMessage(newMemberLong.get(i).getName()+"님께서 입장하셨습니다.");
			MemberMessage.setSendTime(dtf.format(LocalDateTime.now()));
			projectRepository.noticeMessageInsert(MemberMessage);
		}
		
		return projectVo;
	}

	public String findProjectTitle(long no) {
		return projectRepository.findProjectTitle(no);
	}

	public void deleteProject(long projectNo) {
		projectRepository.deleteProject(projectNo);
	}

	public void finishProject(long projectNo) {
		projectRepository.finishProject(projectNo);
		
		List<UserVo> member = projectRepository.findProjectMember(projectNo);
		String title = projectRepository.findProjectTitle(projectNo);
		
		NoticeMessage noticeMessage = new NoticeMessage();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		
		noticeMessage.setMessage(title+" 프로젝트가 완료되었습니다.");
		noticeMessage.setType("finished");
		noticeMessage.setProjectNo(projectNo);
		
		for(int i=0;i<member.size();i++) {
			noticeMessage.setTime(dtf.format(LocalDateTime.now()));
			noticeMessage.setUserNo(member.get(i).getNo());
			noticeRepository.insertNotice(noticeMessage);
			sendingOperations.convertAndSend("/topic/notice/"+member.get(i).getNo(), noticeMessage);
		}
	}


	public List<ProjectVo> findProjectMemberByNo(Long userNo) {
		return projectRepository.findProjectMemberByNo(userNo);
	}

	public List<ProjectVo> searchProject(String word, long userNo) {
		return projectRepository.searchProject(word, userNo);
	}

	public void changeOngoing(long userNo, long projectNo) {
		projectRepository.changeOngoing(projectNo);
		
		List<UserVo> member = projectRepository.findProjectMember(projectNo);
		String title = projectRepository.findProjectTitle(projectNo);
		
		NoticeMessage noticeMessage = new NoticeMessage();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		
		noticeMessage.setMessage(title+" 프로젝트가 진행중으로 변경되었습니다.");
		noticeMessage.setType("create");
		noticeMessage.setProjectNo(projectNo);
		noticeMessage.setProjectNo(projectNo);
		
		for(int i=0;i<member.size();i++) {
			noticeMessage.setTime(dtf.format(LocalDateTime.now()));
			noticeMessage.setUserNo(member.get(i).getNo());
			noticeRepository.insertNotice(noticeMessage);
			sendingOperations.convertAndSend("/topic/notice/"+member.get(i).getNo(), noticeMessage);
		}
		
	}
}

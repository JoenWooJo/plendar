package com.jeonwoojo.plendar.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.ChatRepository;
import com.jeonwoojo.plendar.repository.ProjectRepository;
import com.jeonwoojo.plendar.vo.ChatMessage;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private ChatRepository chatRepository;
	
	public List<UserVo> findUser() {
		return projectRepository.findUser();
	}

	public ProjectVo createProject(ProjectVo projectVo, UserVo authUser) {
		return projectRepository.createProject(projectVo, authUser);
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

}

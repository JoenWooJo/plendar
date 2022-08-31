package com.jeonwoojo.plendar.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.ProjectRepository;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
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
		
		List<UserVo> origin = projectRepository.findProjectMember(projectVo.getNo());
		List<UserVo> newMember = projectVo.getMember();
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("projectNo", projectVo.getNo());
		for(int i=0;i<origin.size();i++) {
			map.put("userVo", origin.get(i));
			projectRepository.deleteMember(map);
			map.remove("userVo");
		}
		
		for(int i=0;i<newMember.size();i++) {
			map.put("userVo", newMember.get(i));
			projectRepository.memberUpdate(map);
			map.remove("userVo");
		}
		
		return projectVo;
	}

}

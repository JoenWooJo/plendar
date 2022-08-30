package com.jeonwoojo.plendar.service;

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

	public Object updateProject(ProjectVo projectVo, UserVo authUser) {
		return projectRepository.updateProject(projectVo, authUser);
	}

	public List<UserVo> findProjectMember(long projectNo) {
		return projectRepository.findProjectMember(projectNo);
	}

}

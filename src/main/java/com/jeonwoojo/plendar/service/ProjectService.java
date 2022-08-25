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

}

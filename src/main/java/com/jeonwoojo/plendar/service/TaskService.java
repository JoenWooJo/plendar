package com.jeonwoojo.plendar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.TaskRepository;
import com.jeonwoojo.plendar.vo.TaskVo;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository taskRepository;

	public List<TaskVo> findTask(long cardNo) {
		return taskRepository.findTask(cardNo);
	}

	public boolean createTask(TaskVo taskVo) {
		return taskRepository.createTask(taskVo);
	}

	public boolean clickTask(TaskVo taskVo) {
		return taskRepository.updateTaskStatus(taskVo);
	}

	public boolean deleteTask(long taskNo) {
		return taskRepository.deleteTask(taskNo);
	}

}

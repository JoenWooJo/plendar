package com.jeonwoojo.plendar.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.TaskVo;

@Repository
public class TaskRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<TaskVo> findTask(long cardNo) {
		return sqlSession.selectList("task.findTask", cardNo);
	}

	public boolean createTask(TaskVo taskVo) {
		return sqlSession.insert("task.insertTask", taskVo) == 1;
	}

	public boolean updateTaskStatus(TaskVo taskVo) {
		return sqlSession.update("task.updateTaskStatus", taskVo) == 1;
	}

	public boolean deleteTask(long taskNo) {
		return sqlSession.delete("task.deleteTask", taskNo) == 1;
	}

	public boolean updateTask(TaskVo taskVo) {
		return sqlSession.update("task.updateTask",taskVo) ==1;
	}



}

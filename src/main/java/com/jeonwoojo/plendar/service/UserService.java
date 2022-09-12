package com.jeonwoojo.plendar.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.UserRepository;
import com.jeonwoojo.plendar.vo.UserVo;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public boolean insert(UserVo vo) {
		return userRepository.insert(vo);
	}

	public UserVo findByEmailAndPassword(UserVo vo) {
		return userRepository.findByEmailAndPassword(vo);
	}

	public boolean checkEmail(String email) {
		UserVo vo = userRepository.checkEmail(email);
		if(vo != null) {
			return false;
		}
		return true;
	}

	public UserVo getUser(String email, String password) {
		UserVo vo = new UserVo();
		vo.setEmail(email);
		vo.setPassword(password);
		return userRepository.findByEmailAndPassword(vo);
	}

	public boolean updateUser (UserVo vo) {
		return userRepository.updateUser(vo);
	}

	public boolean updateProfile (Map<?, ?> map) {
		return userRepository.updateProfile(map);
		
	}
	
	public boolean deleteProfile(UserVo vo) {
		return userRepository.deleteProfile(vo);	
	}

	public boolean confirmPassword(UserVo vo) {
		UserVo userVo = userRepository.checkPassword(vo);
		if(userVo != null) {
			return true;
		}
		return false;
	}

	public UserVo findByNo(Long no) {
		return userRepository.findByNo(no);
	}

	public UserVo findByUserProject(long userNo) {
		return userRepository.findByUserProject(userNo);
	}

	public boolean updateName(UserVo vo) {
		return userRepository.updateName(vo);
	}

}
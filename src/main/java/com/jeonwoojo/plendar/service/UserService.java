package com.jeonwoojo.plendar.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jeonwoojo.plendar.repository.UserRepository;
import com.jeonwoojo.plendar.vo.UserVo;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;


	public boolean insert(UserVo vo) {
		System.out.println("Service" + vo);
		return userRepository.insert(vo);
	}
	
	public UserVo getUser(UserVo vo) {
//		UserVo vo = new UserVo();
		System.out.println("Service" + vo);
		vo.setEmail(vo.getEmail());
		vo.setPassword(vo.getPassword());
		return userRepository.findByEmailAndPassword(vo);
	}

	public UserVo getUser(String email, String password) {
		UserVo vo = new UserVo();
		vo.setEmail(vo.getEmail());
		vo.setPassword(vo.getPassword());
		return userRepository.findByEmailAndPassword(vo);
	}

	public UserVo findUser(UserVo vo) {
		return userRepository.findUser(vo);
	}

	public boolean updateUser (UserVo vo) {
		System.out.println("Service" + vo);
		return userRepository.updateUser(vo);
	}

	public boolean updateProfile (UserVo vo) {
		System.out.println("Service" + vo);
		return userRepository.updateProfile(vo);
		
	}
}
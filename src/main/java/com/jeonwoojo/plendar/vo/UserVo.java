package com.jeonwoojo.plendar.vo;

import lombok.Data;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class UserVo {
	private String email;
	private String name;
	private String password;
	private String profile;
	private Long no;
}

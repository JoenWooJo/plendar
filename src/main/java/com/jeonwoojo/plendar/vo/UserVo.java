package com.jeonwoojo.plendar.vo;

import lombok.Data;

@Data
public class UserVo {
	private Long no;
	private String email;
	private String name;
	private String password;
	private String profile;
	private String permission;
	private String projectNo;
}

package com.jeonwoojo.plendar.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserVo {
	private Long no;
	private String email;
	private String name;
	private String password;
	private String profile;
	private String permission;
	private Long projectNo;
	private int projectCount;
	private int leader;
	private int manager;
	private String role;

}

package com.jeonwoojo.plendar.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserVo {
	private long no;
	private String email;
	private String name;
	private String password;
	private String profile;
}

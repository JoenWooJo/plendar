package com.jeonwoojo.plendar.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectMemberVo {
	private long userNo;
	private long projectNo;
	private String permission;
}

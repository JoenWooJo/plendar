package com.jeonwoojo.plendar.vo;

import java.util.List;

import lombok.Data;

@Data
public class ProjectVo {
	private long no;
	private String title;
	private String description;
	private String startDate;
	private String endDate;
	private int priority;
	private String finished;
	private List<UserVo> member; 
}

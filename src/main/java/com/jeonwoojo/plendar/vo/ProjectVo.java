package com.jeonwoojo.plendar.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProjectVo {
	private long no;
	private String title;
	private String description;
	private String startDate;
	private String endDate;
	private int priority;
	private String finished;
}

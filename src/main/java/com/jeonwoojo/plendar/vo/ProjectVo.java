package com.jeonwoojo.plendar.vo;

import java.lang.reflect.Array;
import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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

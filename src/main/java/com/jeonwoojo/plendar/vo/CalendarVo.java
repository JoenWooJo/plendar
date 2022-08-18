package com.jeonwoojo.plendar.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CalendarVo {
	
	private String userName;
	private Long id;
	private String title;
	private String start;
	private String end;
	
}

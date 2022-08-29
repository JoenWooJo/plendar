package com.jeonwoojo.plendar.vo;

import java.util.List;

import lombok.Data;

@Data
public class CardVo {
	
	private long no;
	private long deckNo;
	private String title;
	private String description;
	private String startDate;
	private String endDate;
	private long sequence;
	private String finished;
	private List<UserVo> member;

}

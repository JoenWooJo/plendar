package com.jeonwoojo.plendar.vo;

import lombok.Data;

@Data
public class NoticeMessage {
	private long no;
	private String message;
	private String type;
	private String time;
	private long userNo;
	private long projectNo;
	private long deckNo;
	private long cardNo;
}

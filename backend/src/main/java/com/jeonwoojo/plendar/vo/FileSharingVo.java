package com.jeonwoojo.plendar.vo;

import lombok.Data;

@Data
public class FileSharingVo {
	private String Send_Time;
	private String Url;
	private Long no;
	private Long User_no;
	private Long Project_no;
	private Long Deck_no;// 덱이랑  카드의 경로 까지 그래서 필요한거가?
	private Long Card_no;
	
}

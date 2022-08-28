package com.jeonwoojo.plendar.vo;

import lombok.Data;

@Data
public class CommentVo {
	private Long no;
	private Long cardNo;
	private Long userNo;
	private Long projectNo;
	private String content;
	private String date;
	
}

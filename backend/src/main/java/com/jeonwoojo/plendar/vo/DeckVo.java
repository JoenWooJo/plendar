package com.jeonwoojo.plendar.vo;


import java.util.List;

import lombok.Data;

@Data
public class DeckVo {

	private long no;
	private long projectNo;
	private String title;
	private long sequence;
	private List<CardVo> cards;
}


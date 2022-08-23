package com.jeonwoojo.plendar.vo;

import lombok.Data;

@Data
public class ChatMessage {
    private long no;
	private long roomId;
    private long sender;
    private String message;
    private String sendTime;
}

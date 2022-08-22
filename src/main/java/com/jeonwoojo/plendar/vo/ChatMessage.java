package com.jeonwoojo.plendar.vo;

import lombok.Data;

@Data
public class ChatMessage {
    
	private Long roomId;
    private String sender;
    private Long userNo;
    private String message;
    private String dateTime;
    
    
}

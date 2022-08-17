package com.jeonwoojo.plendar.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessage {
    
	private Long roomId;
    private String sender;
    private Long userNo;
    private String message;
    private String dateTime;
    
    
}

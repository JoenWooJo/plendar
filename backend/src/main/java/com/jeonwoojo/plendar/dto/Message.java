package com.jeonwoojo.plendar.dto;

import org.springframework.stereotype.Component;

import com.jeonwoojo.plendar.dto.status.StatusEnum;

import lombok.Data;

@Data
@Component
public class Message {
   private StatusEnum status;
   private String message;
   private Object data;
   
   public Message() {        
      this.status = StatusEnum.BAD_REQUEST;
       this.data = null;
       this.message = null;
   }
}

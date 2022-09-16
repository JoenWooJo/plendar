package com.jeonwoojo.plendar.vo;

import lombok.Data;

@Data
public class UploadItemVo {
	private Long no;
	private String name;
	private String url;
	private String lastModifiedDate;
	private Long size;
	private String type;
	private Long user_no;
	private String user_name;
	private Long project_no;
	private Long card_no;
	
}

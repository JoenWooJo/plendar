package com.jeonwoojo.plendar.controller;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.UploadItemService;
import com.jeonwoojo.plendar.vo.UploadItemVo;


@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:9090")
public class UploadItemController {

	@Autowired
	private UploadItemService uploadItemService;

	@PostMapping("/UploadItem")
	public ResponseEntity<JsonResult> insertItem(@RequestParam("file") MultipartFile multipartFile, UploadItemVo vo,
			@RequestParam("userNo") long userNo) throws FileUploadException {
		String file = "";
		try {
			file = uploadItemService.restoreImage(multipartFile, vo);
		} catch (FileUploadException e) {
			e.printStackTrace();
		}
		System.out.println("콘중앙1" + file);
		vo.setUrl(file);

		uploadItemService.insertItem(vo);
		System.out.println("콘트롤" + vo);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}

	@GetMapping("/bringItem/{project_no}/{card_no}")
	public ResponseEntity<JsonResult> bringItem(@PathVariable("project_no") Long project_no,
			@PathVariable("card_no") Long card_no) {
		UploadItemVo vo = new UploadItemVo();
		vo.setCard_no(card_no);
		vo.setProject_no(project_no);
		System.out.println("이건 브링2 "+ vo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(uploadItemService.bringItem(vo)));
	}
	
	@GetMapping("/findItem/{no}")
	public ResponseEntity<JsonResult> findItem(@PathVariable("no") Long no) {
		System.out.println("이건 파인드 콘트롤"+ no);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(uploadItemService.findItem(no)));
	}
	
	@DeleteMapping(value="/deleteItem/{no}")
	public ResponseEntity<JsonResult> deleteItem(@PathVariable("no") Long no) {
		System.out.println("deleteItem: 1" + no);
		uploadItemService.deleteItem(no);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(no));
	}
	
	@GetMapping("/downloadItem/{url}")
	public ResponseEntity<JsonResult> downloadItem(@PathVariable("url") String url) {
		System.out.println("이건 다운로드 콘트롤"+ url);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(uploadItemService.downloadItem(url)));
	}
	
	
}

package com.jeonwoojo.plendar.controller;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.security.Auth;
import com.jeonwoojo.plendar.security.AuthUser;
import com.jeonwoojo.plendar.service.DeckService;
import com.jeonwoojo.plendar.vo.DeckVo;
import com.jeonwoojo.plendar.vo.ProjectVo;
import com.jeonwoojo.plendar.vo.UserVo;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/kanban/deck")
public class DeckController {
	
	@Autowired
	private DeckService deckService;
	
	
	@Auth
	@GetMapping("/find/{projectNo}")
	public ResponseEntity<JsonResult> findDeck(@PathVariable("projectNo") Long projectNo) {
		System.out.println("deckfind"+ projectNo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(deckService.findDeck(projectNo)));
	}
	
	@PostMapping("/create")
	public ResponseEntity<JsonResult> create( @RequestBody DeckVo deckVo) {
		System.out.println("data: "+deckVo);
		boolean newVo = deckService.createDeck(deckVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(newVo));
	}
	
	@PostMapping("/update")
	public ResponseEntity<JsonResult> updatDeck(@RequestBody DeckVo deckVo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(deckVo));
	}

}

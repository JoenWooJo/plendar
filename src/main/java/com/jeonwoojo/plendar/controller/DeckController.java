package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.security.Auth;
import com.jeonwoojo.plendar.service.DeckService;
import com.jeonwoojo.plendar.vo.DeckVo;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/kanban/deck")
public class DeckController {
	
	@Autowired
	private DeckService deckService;
	
	
	@Auth
	@GetMapping("/find")
	public ResponseEntity<JsonResult> findDeck(DeckVo deckVo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(deckService.findDeck(deckVo.getProjectNo())));
	}
	

}

package com.jeonwoojo.plendar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.CardService;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/kanban/card")
public class CardController {
	@Autowired
	private CardService cardService;
	
	@GetMapping("/find/{deckNo}")
	public ResponseEntity<JsonResult> findCard(@PathVariable("deckNo") Long deckNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(cardService.findCard(deckNo)));
	}
	
	@GetMapping("/find/carduser/{projectNo}")
	public ResponseEntity<JsonResult> findCardUser() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(cardService.findCardUser()));
	}
	
}

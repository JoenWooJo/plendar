package com.jeonwoojo.plendar.controller;

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
import org.springframework.web.bind.annotation.RequestParam;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.security.Auth;
import com.jeonwoojo.plendar.service.CardService;
import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.DeckVo;

@Auth
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
	public ResponseEntity<JsonResult> findCardUser(@PathVariable("projectNo") Long projectNo) {
		//System.out.println(projectNo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(cardService.findCardUser(projectNo)));
	}
	
	@PostMapping("/create")
	public ResponseEntity<JsonResult> createCard(@RequestBody CardVo cardVo) {
		//System.out.println("CC: " + cardVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(cardService.createCard(cardVo)));
	}
}

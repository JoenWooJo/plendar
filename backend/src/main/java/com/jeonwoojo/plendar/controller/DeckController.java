package com.jeonwoojo.plendar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.CardService;
import com.jeonwoojo.plendar.service.DeckService;
import com.jeonwoojo.plendar.vo.CommentVo;
import com.jeonwoojo.plendar.vo.DeckVo;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/kanban/deck")
public class DeckController {
	
	@Autowired
	private DeckService deckService;
	@Autowired
	private CardService cardService;
	
	@GetMapping("/find/{projectNo}")
	public ResponseEntity<JsonResult> findDeck(@PathVariable("projectNo") Long projectNo) {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(deckService.findDeck(projectNo)));
	}
	
	@PostMapping("/create")
	public ResponseEntity<JsonResult> create( @RequestBody DeckVo deckVo) {
		boolean newVo = deckService.createDeck(deckVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(newVo));
	}
	
	@PostMapping("/update")
	public ResponseEntity<JsonResult> updatDeck(@RequestBody DeckVo deckVo) {
		deckService.updateDeck(deckVo);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(deckVo));
	}
	
	@PostMapping("/comment/insert")
	public ResponseEntity<JsonResult> commentInsert(@RequestBody CommentVo commentVo) {
		cardService.commentInsert(commentVo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success("insert ok")); 
	}
	
	@DeleteMapping("/delete/{projectNo}/{deckNo}")
	public ResponseEntity<JsonResult> deleteDeck(@PathVariable("projectNo") long projectNo,
			@PathVariable("deckNo")long deckNo) {
		deckService.deleteDeck(projectNo,deckNo);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success("delete ok"));
	}
        
	@PostMapping("/update/move")
	public ResponseEntity<JsonResult> moveDeck(@RequestBody List<DeckVo> deckList) {
	System.out.println("컨트롤러덱리스트"+deckList);
	deckService.moveDeck(deckList);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("아직"));

	}

}

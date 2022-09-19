package com.jeonwoojo.plendar.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.CardService;
import com.jeonwoojo.plendar.service.NoticeService;
import com.jeonwoojo.plendar.service.ProjectService;
import com.jeonwoojo.plendar.vo.CardVo;
import com.jeonwoojo.plendar.vo.CommentVo;

@Controller
@CrossOrigin(origins = "http://localhost:9090")
@RequestMapping("/api/kanban/card")
public class CardController {
	@Autowired
	private CardService cardService;
	@Autowired
	private ProjectService projectService;
	@Autowired
	private NoticeService noticeService;

	@GetMapping("/find/{deckNo}")
	public ResponseEntity<JsonResult> findCard(@PathVariable("deckNo") Long deckNo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(cardService.findCard(deckNo)));
	}

	@GetMapping("/find/carduser/{projectNo}")
	public ResponseEntity<JsonResult> findCardUser(@PathVariable("projectNo") Long projectNo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(cardService.findCardUser(projectNo)));
	}

	@PostMapping("/create")
	public ResponseEntity<JsonResult> createCard(@RequestBody CardVo cardVo) {
		CardVo newCardVo = cardService.createCard(cardVo);
		newCardVo.setMember(cardVo.getMember());

		String projectTitle = projectService.findProjectTitle(newCardVo.getProjectNo());

		cardService.cardNotice(newCardVo, projectTitle);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(newCardVo));
	}

	@PostMapping("/comment/insert")
	public ResponseEntity<JsonResult> commentInsert(@RequestBody CommentVo commentVo) {
		cardService.commentInsert(commentVo);
		noticeService.commentNotice(commentVo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("insert ok"));
	}

	@GetMapping("/find/comment/{cardNo}")
	public ResponseEntity<JsonResult> findComment(@PathVariable("cardNo") Long cardNo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(cardService.findComment(cardNo)));
	}

	@GetMapping("/findCurrentCardmember/{cardNo}")
	public ResponseEntity<JsonResult> findCurrentCardMember(@PathVariable(value = "cardNo") Long cardNo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(cardService.findCurrentCardMember(cardNo)));
	}

	@GetMapping("/findCardInfo/{cardNo}")
	public ResponseEntity<JsonResult> findCardInfo(@PathVariable("cardNo") Long cardNo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(cardService.findCardInfo(cardNo)));
	}

	@PostMapping("/updateCard")
	public ResponseEntity<JsonResult> updateCard(@RequestBody CardVo cardVo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(cardService.updateCard(cardVo)));
	}

	@DeleteMapping("/deleteCard/{projectNo}/{cardNo}")
	public ResponseEntity<JsonResult> deleteCard(@PathVariable("projectNo") Long projectNo,
			@PathVariable("cardNo") Long cardNo) {
//			CardVo cardVo = 
		cardService.findCardInfo(cardNo);

//			noticeService.deleteCardNotice(projectNo, cardVo);
		cardService.deleteCard(cardNo);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(cardNo));
	}

	@GetMapping("/findtaskcount/{cardNo}")
	public ResponseEntity<JsonResult> findTaskCount(@PathVariable("cardNo") Long cardNo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(cardService.findTaskCount(cardNo)));
	}

	@GetMapping("/findncount/{cardNo}")
	public ResponseEntity<JsonResult> findNCount(@PathVariable("cardNo") Long cardNo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(cardService.findNCount(cardNo)));
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@PutMapping("/mv")
	public ResponseEntity<JsonResult> updateCard(@RequestBody Map moving) {
		System.out.println(moving);
		cardService.updateCardOrder(moving);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success("ok"));
	}

}

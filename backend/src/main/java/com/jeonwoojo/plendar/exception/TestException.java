package com.jeonwoojo.plendar.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class TestException {
	private static final Log LOGGER = LogFactory.getLog(TestException.class);
			
	@ExceptionHandler(Exception.class)
	public String handlerException(Model model, Exception e) {
		// 404Error
		if(e instanceof NoHandlerFoundException) {
			return "error/404";
		}
		
		
		//1. 로깅(logging)
		StringWriter errors = new StringWriter();
		e.printStackTrace(new PrintWriter(errors));
		LOGGER.error(errors.toString());
		
		//2. 사과 페이지(종료)
		model.addAttribute("exception", errors.toString());
		return "error/exception";
	}
}

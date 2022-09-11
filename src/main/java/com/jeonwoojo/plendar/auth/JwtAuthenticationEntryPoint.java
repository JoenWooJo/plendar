package com.jeonwoojo.plendar.auth;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/* 
 * 적절한 인증 없이 보호된 리소스에 엑세스하려고 하는 클라이언트에
 * 401 무단 오류를 반환하는 데 사용
 * Spring Security의 AuthenticationEntryPoint 인터페이스 구현
 */

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {

		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "UnAuthorized");
		
	}

}

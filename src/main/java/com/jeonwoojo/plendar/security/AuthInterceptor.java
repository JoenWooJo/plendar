package com.jeonwoojo.plendar.security;

import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.vo.UserVo;

public class AuthInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// 1. Handler 종류 확인
		if(handler instanceof HandlerMethod == false) {
			// DefaultServletHandler가 처리하는 정적 자원
			return true;
		}
    
		// 2. casting
		HandlerMethod handlerMethod = (HandlerMethod)handler;
		
		// 3. Handler Method의 @Auth 받아보기
		Auth auth = handlerMethod.getMethodAnnotation(Auth.class);

		// 4. Handler Method에 @Auth가 없으면 Type에 붙어 있는 지 확인
		if(auth == null ) {
			/* 과제 */
			auth = handlerMethod.getBeanType().getAnnotation(Auth.class);
		}
		
		// 5. Type과 Handler Method 모두에 @Auth가 안붙어 있는 경우
		if(auth == null) {
			return true;
		}
		
		// 6. Handler Method에 @Auth가 붙어 있기 때문에 인증(Authentication) 여부 확인
		HttpSession session = request.getSession();
		UserVo authUser = (UserVo)session.getAttribute("authUser");
		
		// 7. @Auth가 적용되어 있지만 인증이 되어 있지 않음
		if(authUser == null) {
//			response.sendRedirect(request.getContextPath()+"/user/login");
			response.setContentType("application/json");
			response.setStatus(HttpServletResponse.SC_OK);

			JsonResult jsonResult = JsonResult.fail("다시 로그인 해주세요.");
			String jsonString = new ObjectMapper().writeValueAsString(jsonResult);
			
			OutputStream os = response.getOutputStream();
			os.flush();
			
			os.write(jsonString.getBytes("UTF-8"));
			os.close();
			return false;
		}
		
//		// 8. 권한체크를 위해서 @Auth의 role 가져오기
//		String role = auth.role();
//		String authUserRole = authUser.getRole();
//		
//		// role -> user 모두 통과, (if) admin 일때는 authUserRole도 admin 이어야함
//		if(role.equals("ADMIN") && authUserRole.equals("USER")) {
//			response.sendRedirect(request.getContextPath());
//			return false;
//		}
		
		// 9. @Auth가 적용되어 있고 인증도 되어 있음 
		return true;
	}

}

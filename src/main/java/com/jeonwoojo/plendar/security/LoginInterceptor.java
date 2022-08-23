package com.jeonwoojo.plendar.security;

import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeonwoojo.plendar.dto.JsonResult;
import com.jeonwoojo.plendar.service.UserService;
import com.jeonwoojo.plendar.vo.UserVo;

public class LoginInterceptor implements HandlerInterceptor {

	@Autowired
	private UserService userService;

	@Override
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String email = request.getParameter("email");
		String password = request.getParameter("password");

		response.setContentType("application/json");
		UserVo authUser = userService.getUser(email, password);
		
		if (authUser == null) {
			// 3. json 응답
			response.setStatus(HttpServletResponse.SC_OK);

			JsonResult jsonResult = JsonResult.fail("이메일 또는 패스워드가 잘못되었습니다.");
			String jsonString = new ObjectMapper().writeValueAsString(jsonResult);
			
			OutputStream os = response.getOutputStream();
			os.flush();
			
			os.write(jsonString.getBytes("UTF-8"));
			os.close();

			return false;
		}
		/* session 처리 */
//		System.out.println(authUser);
		HttpSession session = request.getSession(true);
		session.setAttribute("authUser", authUser);
		
		System.out.println("여기여기"+session.getAttribute("authUser"));
		
		// 3. json 응답
		response.setStatus(HttpServletResponse.SC_OK);

		JsonResult jsonResult = JsonResult.success(authUser);
		String jsonString = new ObjectMapper().writeValueAsString(jsonResult);

		OutputStream os = response.getOutputStream();
		
		os.write(jsonString.getBytes("UTF-8"));
		os.close();

		return false;
	}
}

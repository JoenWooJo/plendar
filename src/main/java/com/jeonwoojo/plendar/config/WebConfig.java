package com.jeonwoojo.plendar.config;

import java.util.List;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.jeonwoojo.plendar.security.AuthInterceptor;
import com.jeonwoojo.plendar.security.AuthUserHandlerMethodArgumentResolver;
import com.jeonwoojo.plendar.security.LoginInterceptor;
import com.jeonwoojo.plendar.security.LogoutInterceptor;

@SpringBootConfiguration
public class WebConfig implements WebMvcConfigurer {

	// Security Interceptors
	@Bean
	public HandlerInterceptor loginInterceptor() {
		return new LoginInterceptor();
	}

	@Bean
	public HandlerInterceptor logoutInterceptor() {
		return new LogoutInterceptor();
	}
	
	@Bean
	public HandlerInterceptor authInterceptor() {
		return new AuthInterceptor();
	}

	// Argument Resolver
	@Bean
	public HandlerMethodArgumentResolver handlerMethodArgumentResolver() {
		return new AuthUserHandlerMethodArgumentResolver();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// Security Interceptor
		registry.addInterceptor(loginInterceptor()).addPathPatterns("/api/user/login");

		registry.addInterceptor(logoutInterceptor()).addPathPatterns("/api/user/logout");

		registry.addInterceptor(authInterceptor()).addPathPatterns("/**").excludePathPatterns("/assets/**")
				.excludePathPatterns("/api/user/login").excludePathPatterns("/api/user/logout");
	}
	
	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(handlerMethodArgumentResolver());
	}

}

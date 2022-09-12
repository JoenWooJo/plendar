package com.jeonwoojo.plendar.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.jeonwoojo.plendar.vo.UserVo;

import lombok.Data;

//시큐리티가 /login 주소 요청이 오면 낚아채서 로그인을 진행
//로그인 진행이 완료가 되면 시큐리티 session을 만들어준다(Security ContextHolder)
//오브젝트 타입 => Authentication 객체
//Authentication 안에 Employee 정보가 있어야 됨
//Employee 타입 => UserDetails 객체

//Security session => Authentication => UserDetails(PrincipalDetails)

@Data // JwtAuthenticationFilter에서 getUserVo 할때 필요
public class PrincipalDetails implements UserDetails {
	
	private UserVo userVo;
	
	public PrincipalDetails(UserVo userVo) {
		this.userVo = userVo;
	}
	
	// 해당 유저의 권한을 리턴하는 곳
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collect = new ArrayList<>();
		
		collect.add(new GrantedAuthority() {
			@Override
			public String getAuthority() {
				return userVo.getRole();
			}
		});
		return collect;
	}

	@Override
	public String getPassword() {
		return userVo.getPassword();
	}

	@Override
	public String getUsername() {
		return userVo.getName();
	}

	// 계정 만료 여부 (true가 만료되지 않음을 의미)
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	// 계정 락 여부 (true가 잠겨있지 않음을 의미)
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	// 계정 패스워드 만료 여부 (true가 만료되지 않음을 의미)
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	// 계정 사용가능 여부 (true가 사용 가능함을 의미)
	@Override
	public boolean isEnabled() {
		return true;
	}

}

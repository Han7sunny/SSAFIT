package com.ssafy.ssafit.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity // Spring Security에 대한 디버깅 모드를 사용하기 위한 어노테이션 (default : false)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public SecurityConfiguration(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.httpBasic().disable() // REST API는 UI를 사용하지 않으므로 기본설정을 비활성화

                .csrf().disable() // REST API는 csrf 보안이 필요 없으므로 비활성화

                .sessionManagement()
                .sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS) // JWT Token 인증방식으로 세션은 필요 없으므로 비활성화

                .and()
                .authorizeRequests() // 리퀘스트에 대한 사용권한 체크
                .antMatchers("/api/mirror/mirror-login/{id}","/api/mirror/get-face-encoding-list","/api/user/check-code","/api/user/create-code","/api/user/find-password","/api/user/password-verification","/api/user/email-check","/api/user/name-check","/api/user/id-check","/api/user/findId","/api/user/join", "/api/user/login", "/api/swagger-ui/**","/api/swagger-ui.html").permitAll() // 가입 및 로그인 주소는 허용 ,"/sign-api/exception"
//                .antMatchers("/**").permitAll() // 가입 및 로그인 주소는 허용 ,"/sign-api/exception"
//                .antMatchers(HttpMethod.GET, "/product/**").permitAll() // product로 시작하는 Get 요청은 허용

//  hasAnyRole()하면 안됨;
                .antMatchers(HttpMethod.GET,"/api/notice/**").permitAll()
                .antMatchers(HttpMethod.POST,"/api/notice/*/regist").permitAll()//.hasRole("USER")
                .antMatchers(HttpMethod.PUT,"/api/notice/*/*").permitAll()//.hasRole("USER")
                .antMatchers(HttpMethod.DELETE,"/api/notice/*/*").permitAll()//.hasRole("USER")
                .antMatchers("/api/notice/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.PUT,"/notice/*").hasRole("ADMIN")

                .antMatchers("/api/**").permitAll()
//                .antMatchers("**exception**").permitAll()

                .anyRequest().denyAll()
                //.hasRole("ADMIN") // 나머지 요청은 인증된 ADMIN만 접근 가능

//                .and()
//                .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())
//                .and()
//                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())

                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class) // JWT Token 필터를 id/password 인증 필터 이전에 추가
                .exceptionHandling()
                .accessDeniedHandler(new AccessDeniedHandler() {
                    @Override
                    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                        // 권한 문제가 발생했을 때 이 부분을 호출한다.
                        response.setStatus(403);
                        response.setCharacterEncoding("utf-8");
                        response.setContentType("text/html; charset=UTF-8");
                        response.getWriter().write("권한이 없는 사용자입니다."); // USER가 ADMIN 접근 가능 페이지에 접근할 경우
                    }
                })
                .authenticationEntryPoint(new AuthenticationEntryPoint() {
                    @Override
                    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                        // 인증문제가 발생했을 때 이 부분을 호출한다.
                        response.setStatus(401);
                        response.setCharacterEncoding("utf-8");
                        response.setContentType("text/html; charset=UTF-8");
                        response.getWriter().write("인증되지 않은 사용자입니다.");
                    }
                });

//        로그인 페이지 지정 및 접근 허용
//        httpSecurity.formLogin().loginPage("/login").permitAll();

//        로그아웃 성공시 이동 페이지
//        httpSecurity.logout().logoutSuccessUrl("/");
    }

    /**
     * Swagger 페이지 접근에 대한 예외 처리
     *
     * @param webSecurity
     */
    @Override
    public void configure(WebSecurity webSecurity) {
        webSecurity.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
                "/swagger-ui.html", "/webjars/**", "/swagger/**", "/swagger-ui/index.html"); // , "/sign-api/exception"
    }
}
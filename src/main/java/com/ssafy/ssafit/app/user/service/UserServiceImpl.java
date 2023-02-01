package com.ssafy.ssafit.app.user.service;

import com.ssafy.ssafit.app.config.JwtTokenProvider;
import com.ssafy.ssafit.app.user.dto.Role;
import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private UserRepository userRepository;

    public JwtTokenProvider jwtTokenProvider;

    public PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        LOGGER.info("[Test] init join data ");
        User joinUser = User.builder()
                .id("test1").password(passwordEncoder.encode("test1pw")).email("test@test")
                .on_off(false).photo("photo").photo_encoding("photo_encoding")
                .name("testName").role(Role.USER).roles(Collections.singletonList("ROLE_USER"))
                .build();
        userRepository.save(joinUser); // join


        LOGGER.info("[Login] findById");

        Optional<User> findUser = userRepository.findById(loginRequestDto.getId());
        if(findUser.isEmpty()){
            LOGGER.info("[Error] can't find id"); // id 정보 없음
            return LoginResponseDto.builder().success(false).msg("회원정보를 찾을 수 없는 아이디입니다.").build();
        }

        User user = findUser.get();

        LOGGER.info("[Login] check password");
        if(!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())){
            LOGGER.info("[Error] no match password"); // password
            return LoginResponseDto.builder().success(false).msg("비밀번호가 틀렸습니다.").build();
        }

        return LoginResponseDto.builder().id(user.getId()).name(user.getName()).token(jwtTokenProvider.createToken(String.valueOf(user.getName()), user.getRoles()))
                .success(true).msg("로그인이 성공적으로 완료되었습니다.")
                .build();
    }

    @Override
    public User findId(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void modifyFaceAuth(User user) {
        userRepository.save(user);
    }

}

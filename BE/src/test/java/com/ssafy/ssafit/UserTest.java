package com.ssafy.ssafit;

import com.ssafy.ssafit.app.config.JwtTokenProvider;
import com.ssafy.ssafit.app.user.controller.UserController;
import com.ssafy.ssafit.app.user.dto.Role;
import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

@SpringBootTest
public class UserTest {

    private final Logger LOGGER = LoggerFactory.getLogger(UserTest.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    public JwtTokenProvider jwtTokenProvider;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @BeforeEach
    @Test
    void join(){

         User joinUser = User.builder()
                 .id("testLoginTest").password(passwordEncoder.encode("testLoginTest1/")).email("testtestLoginTest@test.com")
                 .onOff(false).photo("photo").photoEncoding("photo_encoding")
                 .name("testName").role(Role.USER).roles(Collections.singletonList("ROLE_USER"))
                 .build();
         userRepository.save(joinUser); // join

//        User user = User.builder().id("admin").password("admin").name("admin").email("test@test").photo("photo_path").photoEncoding("photo_encoding").onOff(false).build();
//        userRepository.save(user);

        User joinedUser = userRepository.findById("testLoginTest").get();
        Assertions.assertThat(joinedUser.getId()).isEqualTo(joinedUser.getId());
    }

    @Test
    void findId(){
        String email = "test1@test1.com";
        User result = userRepository.findByEmail(email);
        Assertions.assertThat(result).isNotNull();
    }

    @Test
    void login(){

        LoginRequestDto loginRequestDto = new LoginRequestDto("testLoginTest","testLoginTest1/");
        Optional<User> findUser = userRepository.findById(loginRequestDto.getId());
        if(findUser.isEmpty()){
            LOGGER.info("[Error] can't find id"); // id 정보 없음
        }

        User user = findUser.get();

        LOGGER.info("[Login] check password");
        if(!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())){
            LOGGER.info("[Error] no match password"); // password
        }

        LOGGER.info("[Token] {}",jwtTokenProvider.createToken(String.valueOf(user.getId()), user.getRoles()));
//        return LoginResponseDto.builder().id(user.getId()).name(user.getName()).token(jwtTokenProvider.createToken(String.valueOf(user.getId()), user.getRoles()))
//                .success(true).msg("로그인이 성공적으로 완료되었습니다.")
//                .build();
    }
}

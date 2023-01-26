package com.ssafy.ssafit.controller;

import com.ssafy.ssafit.app.user.controller.UserController;
import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import com.ssafy.ssafit.app.user.service.UserServiceImpl;
import com.ssafy.ssafit.util.Sha256;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    UserServiceImpl userServiceImpl;

    @Test
    @DisplayName("MokMvc를 통한 유저 회원가입 테스트")
    void userJoinTest() throws Exception {
    }
}

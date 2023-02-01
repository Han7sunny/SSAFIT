package com.ssafy.ssafit.app.user.service;

import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.entity.User;

public interface UserService {

    LoginResponseDto login(LoginRequestDto loginRequestDto);

    User findId(String email);

    void modifyFaceAuth(User user);

//    void deleteRefreshToken(String userId);
}

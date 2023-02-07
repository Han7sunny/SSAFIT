package com.ssafy.ssafit.app.user.service;

<<<<<<< HEAD
import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface UserService {
=======
import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.dto.resp.UserMyPageRespDto;
import com.ssafy.ssafit.app.user.entity.User;

import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;

import java.util.Map;

public interface UserService {

    LoginResponseDto login(LoginRequestDto loginRequestDto);

    User findId(String email);

    void modifyFaceAuth(User user);

>>>>>>> dev_kkw
    int idCheck(String id);

    boolean nameCheck(String name);

    boolean emailCheck(String email);

    boolean passwordCheck(String password);

    boolean findPassword(String id, String email);

    void changePassword(Map<String, String> idPwd);

<<<<<<< HEAD
    void userJoin(UserJoinReqDto userJoinReqDto, String encryptPassword);
=======
    void userJoin(UserJoinReqDto userJoinReqDto);
>>>>>>> dev_kkw

    String createCode(String email);

    boolean checkCode(String code, String id);
<<<<<<< HEAD
=======

    void userDelete(String userId);

    UserMyPageRespDto getMyPageInfo(String userId);
>>>>>>> dev_kkw
}

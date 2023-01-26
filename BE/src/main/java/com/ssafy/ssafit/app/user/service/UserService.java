package com.ssafy.ssafit.app.user.service;

import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    int idCheck(String id);

    boolean nameCheck(String name);

    boolean emailCheck(String email);

    boolean passwordCheck(String password);

    void userJoin(UserJoinReqDto userJoinReqDto, String encryptPassword);

    String createCode(String email);

    boolean checkCode(String code, String id);
}

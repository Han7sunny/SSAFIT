package com.ssafy.ssafit.app.user.service;

import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.dto.resp.UserMyPageRespDto;
import com.ssafy.ssafit.app.user.dto.resp.UserInfoResp;
import com.ssafy.ssafit.app.user.entity.User;

import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface UserService {

    LoginResponseDto login(LoginRequestDto loginRequestDto);

    List<UserInfoResp> userList(); // 그룹 모집 및 생성을 위함..?

    User findId(String email);

    void modifyFaceAuth(MultipartFile image, String id) throws Exception;

    int idCheck(String id);

    boolean nameCheck(String name);

    boolean emailCheck(String email);

    boolean passwordCheck(String password);

    boolean findPassword(String id, String email);

    void changePassword(Map<String, String> idPwd);

    void userJoin(UserJoinReqDto userJoinReqDto, MultipartFile file) throws Exception;

    String createCode(String email);

    boolean checkCode(String code, String id);

    void userDelete(String userId);

    UserMyPageRespDto getMyPageInfo(String userId) throws Exception;

    List<UserInfoResp> searchUsers(String name);
}

package com.ssafy.ssafit.app.user.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import com.ssafy.ssafit.app.user.service.UserService;
import com.ssafy.ssafit.util.Sha256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RequestMapping("/user")
@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/id-check")
    public ResponseEntity<?> idCheck(@RequestParam String id) {
        try {
            int res = userService.idCheck(id);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(res)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/name-check")
    public ResponseEntity<?> nameCheck(@RequestParam String name) {
        try {
            boolean existence = userService.nameCheck(name);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(existence)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/email-check")
    public ResponseEntity<?> emailCheck(@RequestParam String email) {
        try {
            boolean existence = userService.emailCheck(email);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(existence)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/password-verification")
    public ResponseEntity<?> passwordCheck(@RequestParam String password) {
        try {
            boolean validation = userService.passwordCheck(password);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(validation)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/find-password")
    public ResponseEntity<?> findPassword(@RequestParam String id, @RequestParam String email) {
        try {
            boolean check = userService.findPassword(id, email);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(check)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> idPwd) {
        try {
            userService.changePassword(idPwd);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("변경 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);

        }
    }

    @PostMapping("/join")
    public ResponseEntity<?> userJoin(@Valid @RequestBody UserJoinReqDto userJoinReqDto) {
        String encryptPassword = Sha256.encrypt(userJoinReqDto.getPassword());
        try {
            userService.userJoin(userJoinReqDto, encryptPassword);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("회원가입 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/create-code")
    private ResponseEntity<?> createCode(@RequestParam("email") String email) {
        try {
            String id = userService.createCode(email);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(id).build(), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping("/check-code")
    private ResponseEntity<?> checkCode(@RequestParam("code") String code,@RequestParam("id") String id) {
        try {
            boolean check = userService.checkCode(code, id);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(check)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
}
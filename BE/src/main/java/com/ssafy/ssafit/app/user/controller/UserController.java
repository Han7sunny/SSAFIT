package com.ssafy.ssafit.app.user.controller;

import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import com.ssafy.ssafit.app.user.service.UserService;
import com.ssafy.ssafit.util.Sha256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/user")
@RestController
public class UserController {

    private UserService userService;

    private final String SUCCESS = "success";
    private final String FAIL = "fail";
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> idCheck(@PathVariable String id) {
        try {
            int res = userService.idCheck(id);
            return new ResponseEntity<Integer>(res, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> nameCheck(@PathVariable String name) {
        try {
            boolean existence = userService.nameCheck(name);
            return new ResponseEntity<Boolean>(existence, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> emailCheck(@PathVariable String email) {
        try {
            boolean existence = userService.emailCheck(email);
            return new ResponseEntity<Boolean>(existence, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{password}")
    public ResponseEntity<?> passwordCheck(@PathVariable String password) {
        try {
            boolean validation = userService.passwordCheck(password);
            return new ResponseEntity<Boolean>(validation, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/join")
    public ResponseEntity<?> userJoin(@Valid @RequestBody UserJoinReqDto userJoinReqDto) {
        String encryptPassword = Sha256.encrypt(userJoinReqDto.getPassword());
        try {
            userService.userJoin(userJoinReqDto, encryptPassword);
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/create-code")
    private ResponseEntity<?> createCode(@RequestParam("email") String email) {
        try {
            String id = userService.createCode(email);
            return new ResponseEntity<String>(id, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/check-code")
    private ResponseEntity<?> checkCode(@RequestParam("code") String code,@RequestParam("id") String id) {
        try {
            boolean check = userService.checkCode(code, id);
        } catch (Exception e) {

        }
    }
}
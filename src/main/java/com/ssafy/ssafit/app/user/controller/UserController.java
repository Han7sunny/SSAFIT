package com.ssafy.ssafit.app.user.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Base64;
import java.util.Map;

@RequestMapping("/user")
@RestController
public class UserController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "아이디와 비밀번호를 입력하여 로그인한다.", response = LoginRequestDto.class)
    public ResponseEntity<LoginResponseDto> login(@RequestBody @ApiParam(value = "아이디 & 비밀번호", required = true) LoginRequestDto loginRequestDto){
        LOGGER.info("[enter] UserController login loginrequestDto _ id : {} ", loginRequestDto.getId());
        LoginResponseDto loginResponseDto = userService.login(loginRequestDto);

        HttpStatus status = HttpStatus.NO_CONTENT;
        if(loginResponseDto.isSuccess())
            status = HttpStatus.OK;
        return new ResponseEntity<>(loginResponseDto, status);
    }


//    @Operation(value = "아이디 찾기", description = "입력한 회원 이메일에 해당하는 아이디를 반환한다.", tags = { "User" })
    //    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK",
//                    content = @Content(schema = @Schema(implementation = String.class))),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
//    })
    @PostMapping("/findId")
    @ApiOperation(value = "아이디 찾기", notes = "입력한 회원 이메일에 해당하는 아이디를 반환한다.", response = String.class)
    public ResponseEntity<String> findId(@PathVariable("email") String email){
        User user = userService.findId(email);
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(user != null)
            status = HttpStatus.OK;
        return new ResponseEntity<String>(user.getId(), status);
    }

    @PutMapping("/modifyFaceAuth")
    @ApiOperation(value = "얼굴 인식 수정", notes = "새로운 사진을 추가하여 얼굴 인식을 위한 데이터를 생성한다", response = Boolean.class)
    public ResponseEntity<Boolean> modifyFaceAuth(@RequestParam MultipartFile newPhoto) throws IOException {

        // 현재 로그인된 사용자 정보
        // 토큰 ?
        // User user =

        // photo
        String photo = null;
        if(newPhoto != null){
            Base64.Encoder encoder = Base64.getEncoder();
            byte[] photoEncode = encoder.encode(newPhoto.getBytes());
            photo = new String(photoEncode, "UTF8");
        }

        // photo_encoding
        // py

//        userService.modifyFaceAuth(user);

        // modify -> save();
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    //    @Operation(value = "로그아웃", description = "회원 정보를 저장하고 있는 Token을 제거하고 결과를 반환한다.", tags = { "User" })
//    @ApiResponses({
//            @ApiResponse(responseCode = "200", description = "OK",
//                    content = @Content(schema = @Schema(implementation = Boolean.class))),
//            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
//            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
//            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
//    })
    @GetMapping("/{userId}/logout")
    @ApiOperation(value = "로그아웃", notes = "회원 정보를 저장하고 있는 Token을 제거하고 결과를 반환한다.", response = Boolean.class)
    public ResponseEntity<Boolean> logout(@PathVariable("userId") String userId) throws Exception {
//        userService.deleteRefreshToken(userId);
        return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
    }

    @GetMapping("/testLogin")
    public ResponseEntity<Boolean> testStillLogin(@AuthenticationPrincipal CustomUserDetails user){

            LOGGER.info("[Enter] testStillLogin");
        // 현재 로그인 된 사용자의 정보 가져오기
        if(user == null) {
            LOGGER.info("[Error] cannot find user information");
            return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
        }
        LOGGER.info("현재 로그인 된 사용자 정보 : {}", user.toString());
        return new ResponseEntity<>(true, HttpStatus.OK);
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
        try {
            userService.userJoin(userJoinReqDto);
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

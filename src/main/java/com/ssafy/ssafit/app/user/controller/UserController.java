package com.ssafy.ssafit.app.user.controller;

import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.dto.resp.UserMyPageRespDto;
import com.ssafy.ssafit.app.user.dto.resp.UserInfoResp;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/user")
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
        LOGGER.info("[Enter] findId email : {} ", email);
        User user = userService.findId(email);
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(user != null)
            status = HttpStatus.OK;
        return new ResponseEntity<String>(user.getId(), status);
    }

    @PutMapping("/modifyFaceAuth")
    @ApiOperation(value = "얼굴 인식 수정", notes = "새로운 사진을 추가하여 얼굴 인식을 위한 데이터를 생성한다", response = Boolean.class)
    public ResponseEntity<?> modifyFaceAuth(@RequestParam MultipartFile image, @AuthenticationPrincipal CustomUserDetails user) throws IOException {
        LOGGER.info("[Enter] modifyFaceAuth ");
        try {
            userService.modifyFaceAuth(image, user.getUser().getId());
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("수정 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
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
        LOGGER.info("[Enter] logout id : {} ", userId);
        return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
    }

//    @GetMapping("/testLoginAnnotation")
//    public ResponseEntity<Boolean> testLoginAnnotation(@AuthenticationPrincipal CustomUserDetails user){
//
//        LOGGER.info("[Enter] testStillLogin");
//        // 현재 로그인 된 사용자의 정보 가져오기
//        if(user == null) {
//            LOGGER.info("[Error] cannot find user information");
//            return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
//        }
//        LOGGER.info("현재 로그인 된 사용자 정보 id: {}", user.getUser().getId()); // id 추출 성공
//        LOGGER.info("현재 로그인 된 사용자 정보 username: {}", user.getUser().getName());
//        LOGGER.info("현재 로그인 된 사용자 정보 role: {}", user.getUser().getRole());
//
//        return new ResponseEntity<>(true, HttpStatus.OK);
//    }

//    @GetMapping("/testStillLogin")
//    public ResponseEntity<Boolean> testStillLogin(@AuthenticationPrincipal CustomUserDetails user){
//
//            LOGGER.info("[Enter] testStillLogin");
//        // 현재 로그인 된 사용자의 정보 가져오기
//        if(user == null) {
//            LOGGER.info("[Error] cannot find user information");
//            return new ResponseEntity<>(false, HttpStatus.NO_CONTENT);
//        }
//
//        LOGGER.info("현재 로그인 된 사용자 정보 id: {}", user.getUsername()); // id 추출 성공
//        LOGGER.info("현재 로그인 된 사용자 정보 id: {}", user.getUser().getId()); // id 추출 성공
//        LOGGER.info("현재 로그인 된 사용자 정보 username: {}", user.getUser().getName());
//        LOGGER.info("현재 로그인 된 사용자 정보 role: {}", user.getUser().getRole());
//
//        return new ResponseEntity<>(true, HttpStatus.OK);
//    }

    @GetMapping("/id-check")
    @ApiOperation(value = "아이디 유효성 검사",
            notes = "아이디가 유효하지 않을 때 : 1, 아이디가 중복되는 것이 있을 때 : 0, 유효한 아이디일 때 : 2\n"+
            "아이디 조건 : 첫문자는 영문자로 시작, 영문자와 숫자, _ 로만 이루어져있는 6~16자리 아이디",
            response = CommonResp.class)
    public ResponseEntity<?> idCheck(@RequestParam String id) {
        LOGGER.info("[Enter] idCheck id : {} ", id);
        try {
            int res = userService.idCheck(id);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(res)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/name-check")
    @ApiOperation(value = "닉네임 중복 검사",
            notes = "중복되는 닉네임이 있을 경우 true, 없을 경우 false 반환",
            response = CommonResp.class)
    public ResponseEntity<?> nameCheck(@RequestParam String name) {
        LOGGER.info("[Enter] nameCheck name : {} ", name);
        try {
            boolean existence = userService.nameCheck(name);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(existence)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/email-check")
    @ApiOperation(value = "이메일 중복 검사",
            notes = "중복되는 이메일이 있을 경우 true, 없을 경우 false 반환",
            response = CommonResp.class)
    public ResponseEntity<?> emailCheck(@RequestParam String email) {
        LOGGER.info("[Enter] emailCheck email : {} ", email);
        try {
            boolean existence = userService.emailCheck(email);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(existence)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/password-verification")
    @ApiOperation(value = "비밀번호 유효성 검사",
            notes = "유효한 비밀번호인 경우 true, 아닐 경우 false 반환\n" +
            "비밀번호 조건 : 영문자, 숫자, 특수기호가 최소한 하나씩 들어간 8 ~ 16자리 비밀번호",
            response = CommonResp.class)
    public ResponseEntity<?> passwordCheck(@RequestParam String password) {
        LOGGER.info("[Enter] passwordCheck password : {} ", password);
        try {
            boolean validation = userService.passwordCheck(password);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(validation)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/find-password")
    @ApiOperation(value = "비밀번호 찾기 기능",
            notes = "입력받은 아이디와 이메일을 통해 일치하는 유저가 있는지 확인합니다." +
                    "있을 경우 true 반환, 없을 경우 false 반환",
            response = CommonResp.class)
    public ResponseEntity<?> findPassword(@RequestParam String id, @RequestParam String email) {
        LOGGER.info("[Enter] findPassword id : {} email : {} ", id, email);
        try {
            boolean check = userService.findPassword(id, email);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(check)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/change-password")
    @ApiOperation(value = "비밀번호 변경 기능",
            notes = "유저의 아이디와 바꿀 비밀번호 정보를 통해 비밀번호를 변경" +
            "{ password : String } 형태의 데이터 필요",
            response = CommonResp.class)
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal CustomUserDetails user, @RequestBody Map<String, String> password) {
        LOGGER.info("[Enter] changePassword");
        try {
            Map<String, String> idPwd = new HashMap<>();
            idPwd.put("id", user.getUser().getId());
            idPwd.put("password", password.get("password"));
            userService.changePassword(idPwd);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("변경 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);

        }
    }

    @PostMapping(value = "/join", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
//    @PostMapping(value = "/join")
    @ApiOperation(value = "회원가입 기능",
            notes = "회원가입 기능",
            response = CommonResp.class)
//    public ResponseEntity<?> userJoin(@Valid @RequestBody UserJoinReqDto userJoinReqDto) {
   public ResponseEntity<?> userJoin(@Valid @RequestPart("join-info") UserJoinReqDto userJoinReqDto, @RequestPart("image") MultipartFile file) {

        LOGGER.info("[Enter] userJoin");

//        MultipartFile file = null;
        try {
            userService.userJoin(userJoinReqDto, file);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("회원가입 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create-code")
    @ApiOperation(value = "이메일 인증 시 이메일로 인증코드 발송 기능",
            notes = "입력받은 이메일로 인증코드를 보냅니다. 반환받은 id값은 입력받은 인증코드를 확인할 때 사용합니다.",
            response = CommonResp.class)
    private ResponseEntity<?> createCode(@RequestBody Map<String, String> info) {
        LOGGER.info("[Enter] createCode");
        try {
            String email = info.get("email");
            String id = userService.createCode(email);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(id).build(), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);

        }
    }

    @PostMapping("/check-code")
    @ApiOperation(value = "이메일 인증 시 인증코드 검증 기능",
            notes = "id값은 이메일을 보낼 때 반환받은 값, 코드는 메일에 입력된 값을 사용합니다.",
            response = CommonResp.class)
    private ResponseEntity<?> checkCode(@RequestBody Map<String, String> info) {
        LOGGER.info("[Enter] checkCode");
        try {
            String code = info.get("code");
            String id = info.get("id");
            boolean check = userService.checkCode(code, id);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg(String.valueOf(check)).build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping
//    @ApiOperation(value = "마이페이지용 회원 정보 반환 기능",
//            notes = "id값을 받아서 마이페이지에 띄울 정보를 반환합니다.",
//            response = CommonResp.class)

    @DeleteMapping("/user_delete")
    @ApiOperation(value = "회원 탈퇴 기능",
            notes = "회원탈퇴입니다.",
            response = CommonResp.class)
    private ResponseEntity<?> userDelete(@AuthenticationPrincipal CustomUserDetails user) {
        LOGGER.info("[Enter] userDelete");
        try {
            String userId = user.getUser().getId();
            userService.userDelete(userId);
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(true).msg("탈퇴 성공").build(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-mypage")
    @ApiOperation(value = "마이페이지 기능",
            notes = "마이페이지에 보여줄 정보를 반환합니다.",
            response = CommonResp.class)
    private ResponseEntity<?> getMyPageInfo(@AuthenticationPrincipal CustomUserDetails user) {
        try {
            String userId = user.getUser().getId();
            UserMyPageRespDto userMyPageRespDto = userService.getMyPageInfo(userId);
            return new ResponseEntity<UserMyPageRespDto>(userMyPageRespDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<CommonResp>(CommonResp.builder().success(false).msg("오류 발생").build(), HttpStatus.BAD_REQUEST);
        }
    }
}

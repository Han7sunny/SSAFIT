package com.ssafy.ssafit.app.user.controller;

import com.ssafy.ssafit.app.config.JwtTokenProvider;
import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

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
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){


        LOGGER.info("[enter] UserController login ");
        LOGGER.info("[enter] UserController login loginrequestDto _ id : {} ", loginRequestDto.getId());
        LoginResponseDto loginResponseDto = userService.login(loginRequestDto);
        LOGGER.info("[notice] After login service ");

        HttpStatus status = HttpStatus.NO_CONTENT;
        if(loginResponseDto != null)
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
    public ResponseEntity<String> findId(@PathVariable("email") String email){
        User user = userService.findId(email);
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(user != null)
            status = HttpStatus.OK;
        return new ResponseEntity<String>(user.getId(), status);
    }

    @PutMapping("/modifyFaceAuth")
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
}

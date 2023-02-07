package com.ssafy.ssafit.app.user.service;

import com.ssafy.ssafit.app.config.JwtTokenProvider;
import com.ssafy.ssafit.app.user.dto.Role;
import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.dto.resp.UserInfoResp;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import com.ssafy.ssafit.app.user.entity.Authentication;
import com.ssafy.ssafit.app.user.repository.AuthenticationRepository;
import com.ssafy.ssafit.util.MailService;
import com.ssafy.ssafit.util.RandomString;
import com.ssafy.ssafit.util.Sha256;

import java.time.LocalDateTime;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService{

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private UserRepository userRepository;

    public JwtTokenProvider jwtTokenProvider;

    public PasswordEncoder passwordEncoder;

    private final AuthenticationRepository authenticationRepository;

    private final MailService mailService;

    public UserServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder, AuthenticationRepository authenticationRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.authenticationRepository = authenticationRepository;
        this.mailService = mailService;
    }

    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        // LOGGER.info("[Test] init join data ");
        // User joinUser = User.builder()
        //         .id("test1").password(passwordEncoder.encode("test1pw")).email("test@test")
        //         .on_off(false).photo("photo").photo_encoding("photo_encoding")
        //         .name("testName").role(Role.USER).roles(Collections.singletonList("ROLE_USER"))
        //         .build();
        // userRepository.save(joinUser); // join

        LOGGER.info("[Login] findById");

        Optional<User> findUser = userRepository.findById(loginRequestDto.getId());
        if(findUser.isEmpty()){
            LOGGER.info("[Error] can't find id"); // id 정보 없음
            return LoginResponseDto.builder().success(false).msg("회원정보를 찾을 수 없는 아이디입니다.").build();
        }

        User user = findUser.get();

        LOGGER.info("[Login] check password");
        if(!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())){
            LOGGER.info("[Error] no match password"); // password
            return LoginResponseDto.builder().success(false).msg("비밀번호가 틀렸습니다.").build();
        }

        // 2023-02-07 10:54 변경
        return LoginResponseDto.builder().id(user.getId()).name(user.getName()).token(jwtTokenProvider.createToken(String.valueOf(user.getId()), user.getRoles()))
                .success(true).msg("로그인이 성공적으로 완료되었습니다.")
                .build();

//        return LoginResponseDto.builder().id(user.getId()).name(user.getName()).token(jwtTokenProvider.createToken(String.valueOf(user.getName()), user.getRoles()))
//                .success(true).msg("로그인이 성공적으로 완료되었습니다.")
//                .build();
    }

    @Override
    public List<UserInfoResp> userList() {

        List<User> getUserList = userRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        List<UserInfoResp> userList = new ArrayList<>();
        for (User user : getUserList) {
            userList.add(UserInfoResp.builder().userId(user.getId()).userName(user.getName()).build());
        }
        return userList;
    }

    @Override
    public User findId(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void modifyFaceAuth(User user) {
        userRepository.save(user);
    }

    @Override
    public int idCheck(String id) {
        if(userRepository.existsById(id))
            return 0;

        Pattern pattern = Pattern.compile("^[a-zA-Z]{1}[a-zA-Z0-9_]{5,15}$");
        Matcher matcher = pattern.matcher(id);

        if(!matcher.find())
            return 1;
        else
            return 2;
    }

    @Override
    public boolean nameCheck(String name) {
        return userRepository.existsByName(name);
    }

    @Override
    public boolean emailCheck(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean passwordCheck(String password) {
        Pattern pattern = Pattern.compile("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}");
        Matcher matcher = pattern.matcher(password);
        return matcher.find();
    }

    @Override
    public void changePassword(Map<String, String> idPwd) {
        String id = idPwd.get("id");
        String password = Sha256.encrypt(idPwd.get("password"));
        userRepository.updatePassword(id, password);
    }

    @Override
    public void userJoin(UserJoinReqDto userJoinReqDto) {
        User user = User.builder()
                .id(userJoinReqDto.getId())
                .password(passwordEncoder.encode(userJoinReqDto.getPassword()))
                .name(userJoinReqDto.getName())
                .email(userJoinReqDto.getEmail())
                .photo("12345")
                .photoEncoding("12345")
                .onOff(false)
                .role(Role.USER).roles(Collections.singletonList("ROLE_USER")) // 회원가입하는 모든 회원 권한 : USER
                .build();

        userRepository.save(user);
    }

    @Override
    public String createCode(String email) {
        String id = RandomString.getRamdomString(45);
        String code = RandomString.getRamdomString(4);
        mailService.sendMail("인증번호입니다.", email, "인증번호는 " + code +"입니다.");

        Authentication authentication = Authentication.builder()
                                        .id(id).code(code).expireTime(LocalDateTime.now()).build();

        authenticationRepository.save(authentication);

        return id;
    }

    @Override
    public boolean checkCode(String code, String id) {
        return authenticationRepository.existsByIdAndCodeAndExpireTimeGreaterThanEqual(id, code, LocalDateTime.now());
    }

    @Override
    public boolean findPassword(String id, String email) {
        return userRepository.existsByIdAndEmail(id, email);
    }

    @Override
    public List<UserInfoResp> searchUsers(String name) {
        List<User> userList = userRepository.findAllByNameContaining(name);
        List<UserInfoResp> userInfoList = new ArrayList<>();
        for (User user : userList) {
            userInfoList.add(UserInfoResp.builder().userId(user.getId()).userName(user.getName()).build());
        }
        return userInfoList;
    }
}

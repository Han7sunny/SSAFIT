package com.ssafy.ssafit.app.user.service;

import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import com.ssafy.ssafit.app.user.entity.Authentication;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.AuthenticationRepository;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import com.ssafy.ssafit.util.MailService;
import com.ssafy.ssafit.util.RandomString;
import com.ssafy.ssafit.util.Sha256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthenticationRepository authenticationRepository;
    private final MailService mailService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, AuthenticationRepository authenticationRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.authenticationRepository = authenticationRepository;
        this.mailService = mailService;
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
        System.out.println(id + " " + password);
        userRepository.updatePassword(id, password);
    }

    @Override
    public void userJoin(UserJoinReqDto userJoinReqDto, String encryptPassword) {
        User user = User.builder()
                .id(userJoinReqDto.getId())
                .password(encryptPassword)
                .name(userJoinReqDto.getName())
                .email(userJoinReqDto.getEmail())
                .photo("12345")
                .photo_encoding("12345")
                .on_off(false)
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
}

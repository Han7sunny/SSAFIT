package com.ssafy.ssafit.app.user.service;

import com.ssafy.ssafit.app.board.repository.BoardRepository;
import com.ssafy.ssafit.app.config.JwtTokenProvider;
import com.ssafy.ssafit.app.group.entity.GroupMember;
import com.ssafy.ssafit.app.group.repository.GroupMemberRepository;
import com.ssafy.ssafit.app.notification.entity.Notification;
import com.ssafy.ssafit.app.notification.repository.NotificationRepository;
import com.ssafy.ssafit.app.record.repository.RecordRepository;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.user.dto.Role;
import com.ssafy.ssafit.app.user.dto.req.LoginRequestDto;
import com.ssafy.ssafit.app.user.dto.resp.LoginResponseDto;
import com.ssafy.ssafit.app.user.dto.resp.UserInfoResp;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import com.ssafy.ssafit.util.FileMultipartFileConverter;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ssafy.ssafit.util.Sha256;

import java.io.*;
import java.nio.file.Files;
import java.util.*;

import com.ssafy.ssafit.app.user.dto.req.UserJoinReqDto;
import com.ssafy.ssafit.app.user.dto.resp.UserMyPageRespDto;
import com.ssafy.ssafit.app.user.entity.Authentication;
import com.ssafy.ssafit.app.user.repository.AuthenticationRepository;
import com.ssafy.ssafit.util.MailService;
import com.ssafy.ssafit.util.RandomString;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
    private final BoardRepository boardRepository;
    private final ReplyRepository replyRepository;
    private final RecordRepository recordRepository;
    private final RoutineRepository routineRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final NotificationRepository notificationRepository;

    public UserServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder, AuthenticationRepository authenticationRepository, MailService mailService,
                           BoardRepository boardRepository,
                           ReplyRepository replyRepository,
                           RecordRepository recordRepository,
                           RoutineRepository routineRepository,
                           GroupMemberRepository groupMemberRepository,
                           NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.authenticationRepository = authenticationRepository;
        this.mailService = mailService;
        this.boardRepository = boardRepository;
        this.replyRepository = replyRepository;
        this.recordRepository = recordRepository;
        this.routineRepository = routineRepository;
        this.groupMemberRepository = groupMemberRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
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

        return LoginResponseDto.builder().id(user.getId()).name(user.getName()).token(jwtTokenProvider.createToken(String.valueOf(user.getId()), user.getRoles()))
                .role(user.getRole().toString())
                .success(true).msg("로그인이 성공적으로 완료되었습니다.")
                .build();

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
    public void modifyFaceAuth(MultipartFile image, String id) throws Exception {
        String path = uploadImage(image);
        String encPath = path.replace("\\", "/");
        String encValue = saveFaceEncoding(encPath);

        User user = userRepository.findById(id).get();

        File file = new File(user.getPhoto());
        file.delete();

        userRepository.updatePhotoAndPhotoEncoding(path, encValue, id);
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
        String password = passwordEncoder.encode(idPwd.get("password"));
        userRepository.updatePassword(id, password);
    }

    @Override
    public void userJoin(UserJoinReqDto userJoinReqDto, MultipartFile file) throws Exception{
//        String path = uploadImage(file);
//        String encPath = path.replace("\\", "/");
//        String encValue = saveFaceEncoding(encPath);

        User user = User.builder()
                .id(userJoinReqDto.getId())
                .password(passwordEncoder.encode(userJoinReqDto.getPassword()))
                .name(userJoinReqDto.getName())
                .email(userJoinReqDto.getEmail())
                .photo("")
                .photoEncoding("")
//                .photo(path)
//                .photoEncoding(encValue)
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
    @Transactional
    public void userDelete(String userId) {
        boardRepository.updateUserIdNull(userId);
        replyRepository.updateUserIdNull(userId);
        groupMemberRepository.updateUserIdNull(userId);
        routineRepository.deleteAllUserRoutine(userId);
        userRepository.deleteById(userId);
    }

    @Override
    public UserMyPageRespDto getMyPageInfo(String userId) throws Exception{
        List<GroupMember> groupMemberList = groupMemberRepository.findByUser_IdAndAcceptInvitation(userId, false);

        List<UserMyPageRespDto.GroupInvitation> groupInvitationList = new ArrayList<UserMyPageRespDto.GroupInvitation>();
        for(GroupMember groupMember : groupMemberList) {
            groupInvitationList.add(new UserMyPageRespDto.GroupInvitation(groupMember.getGroup().getId(),
                    groupMember.getGroup().getGroupName(),
                    groupMember.getGroup().getGroupName() + "그룹에 초대되었습니다."));
        }

        List<Notification> notifications = notificationRepository.findByUser_Id(userId);

        List<UserMyPageRespDto.Notification> notificationList = new ArrayList<UserMyPageRespDto.Notification>();
        for(Notification notification : notifications) {
            UserMyPageRespDto.Notification toAdd = UserMyPageRespDto.Notification.builder()
                    .notification_type(notification.getNotification_type())
                    .notificationId(notification.getId())
                    .notificationMessage(notification.getMessage())
                    .build();

            int type = notification.getNotification_type();

            if(type == 0)
                toAdd.setGroupId(notification.getGroup().getId());

            else if(type == 1 || type == 2)
                toAdd.setBoardId(notification.getBoard().getId());

            else if(type == 3){
                toAdd.setGroupId(notification.getGroup().getId());
                toAdd.setBoardId(notification.getBoard().getId());
            }

            else if(type == 4)
                toAdd.setBoardId(notification.getBoard().getId());

            else
                toAdd.setRecordId(notification.getRecord().getId());

            notificationList.add(toAdd);
        }

        User user = userRepository.findById(userId).get();

        MultipartFile image = FileMultipartFileConverter.FiletoMultipartFile(user.getPhoto());
        String myImage = null;
        if(image != null) {
            Base64.Encoder encoder = Base64.getEncoder();
            byte[] photoEncode = encoder.encode(image.getBytes());
            myImage = new String(photoEncode, "UTF-8");
        }

        UserMyPageRespDto userMyPageRespDto = UserMyPageRespDto.builder()
                .success(true)
                .myImage(myImage)
                .msg("마이페이지 정보입니다.")
                .name(user.getName())
                .groupInvitationList(groupInvitationList)
                .notificationList(notificationList).build();

        return userMyPageRespDto;
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

    public String uploadImage(MultipartFile file) throws Exception{
        UUID uuid = UUID.randomUUID();
        final String FOLDER_PATH = "C:\\SSAFY\\upload_files\\";

        String filePath = FOLDER_PATH + uuid.toString() + "_" + file.getOriginalFilename();
            // 파일 결로
        file.transferTo(new File(filePath));

        String enc_path = filePath.replace("\\", "/");
        String enc_value = saveFaceEncoding(enc_path);

        if (filePath != null) {
                return filePath;
        }

        return null;
    }

    public String saveFaceEncoding(String path) {
        String arg1 = "C:/SSAFY/faceEncoding.py";
        ProcessBuilder builder = new ProcessBuilder("python", arg1, path);

        try {
            builder.redirectErrorStream(true);
            Process process = builder.start();
            int exitval = process.waitFor();
            BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));

            StringBuilder sb = new StringBuilder();

            String line;
            while((line = br.readLine()) != null) {
                sb.append(line);
            }

            if(exitval != 0) {
                System.out.println("비정상 종료");
            }

            return sb.toString();

        } catch (Exception e) {
            System.out.println("오류");
            return "오류";
        }
    }
}

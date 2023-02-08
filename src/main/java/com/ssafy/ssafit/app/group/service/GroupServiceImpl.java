package com.ssafy.ssafit.app.group.service;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.entity.Category;
import com.ssafy.ssafit.app.board.entity.Likes;
import com.ssafy.ssafit.app.board.repository.BoardRepository;
import com.ssafy.ssafit.app.board.repository.CategoryRepository;
import com.ssafy.ssafit.app.board.repository.LikesRepository;
import com.ssafy.ssafit.app.board.service.BoardService;
import com.ssafy.ssafit.app.group.controller.GroupController;
import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.dto.req.GroupReqDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupMemberRespDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRecruitRespDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.entity.GroupMember;
import com.ssafy.ssafit.app.group.repository.GroupMemberRepository;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import com.ssafy.ssafit.app.notification.entity.Notification;
import com.ssafy.ssafit.app.notification.repository.NotificationRepository;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import com.ssafy.ssafit.app.record.dto.req.RecordRegisterReqDto;
import com.ssafy.ssafit.app.record.service.RecordService;
import com.ssafy.ssafit.app.reply.dto.resp.ReplyRespDto;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import com.ssafy.ssafit.app.routine.dto.resp.RoutineInfoRespDto;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.routine.repository.RoutineRepository;
import com.ssafy.ssafit.app.routine.service.RoutineService;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;

@Service
public class GroupServiceImpl implements GroupService{

    private final Logger LOGGER = LoggerFactory.getLogger(GroupServiceImpl.class);

    private GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    private CategoryRepository categoryRepository;

    private BoardRepository boardRepository;

    private ReplyRepository replyRepository;

    private RoutineRepository routineRepository;

    private RecordService recordService;

    private LikesRepository likesRepository;

    @Autowired
    public GroupServiceImpl(GroupRepository groupRepository, NotificationRepository notificationRepository,GroupMemberRepository groupMemberRepository, UserRepository userRepository, CategoryRepository categoryRepository, BoardRepository boardRepository, ReplyRepository replyRepository, RoutineRepository routineRepository, RecordService recordService, LikesRepository likesRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.groupMemberRepository = groupMemberRepository;
        this.categoryRepository = categoryRepository;
        this.boardRepository = boardRepository;
        this.replyRepository = replyRepository;
        this.routineRepository = routineRepository;
        this.recordService = recordService;
        this.likesRepository = likesRepository;
    }

    @Override
//    public Group regist(GroupReqDto groupReqDto) {
    public Group regist(Group group, List<String> routineList) {
//        Group group = new Group(groupReqDto);
        String groupRoutine = "";
        int groupRoutineSize = routineList.size();
        for(int i = 0; i < groupRoutineSize; i++){
            groupRoutine += routineList.get(i);
            if(i != groupRoutineSize - 1)
                groupRoutine += ",";
        }
        group.setGroupRoutine(groupRoutine); // routine id list to String

        // groupMemberRepository에 넣는게 아니라 group에 넣어서 자동으로 넣어지도록? 근데 groupID가 없는디
//        List<GroupMember> groupMemberList = new ArrayList<>();
//        // groupMember
//        List<String> getGroupMemberIdList = groupReqDto.getGroupMemberId();
//        for (String groupMemberId : getGroupMemberIdList) {
//            User user = userRepository.findById(groupMemberId).get();
//            groupMemberList.add(GroupMember.builder().user(user).build());
//        }
//        group.setGroupMember(groupMemberList);

        return groupRepository.save(group);
//        Group resultGroup = groupRepository.save(group);
//        return resultGroup;
    }

    public void registGroupRecruit(Group group, BoardReqDto board) {
        User user = userRepository.findById(board.getUserId()).get();
        Category category = categoryRepository.findById(board.getCategoryId()).get();
        boardRepository.save(Board.builder().user(user).category(category).group(group).title(board.getTitle()).registeredTime(board.getRegisteredTime()).content(board.getContent()).sharePost(board.isSharePost()).build());
    }

    // 그룹 현황 보기
    @Override
    public GroupRespDto view(long groupId) { // 그룹 생성자 아이디 ..?
        Optional<Group> getGroup = groupRepository.findById(groupId);
        if(getGroup.isEmpty()) {
            return GroupRespDto.builder().success(false).msg("해당 그룹을 찾을 수 없습니다.").build();
        }
        Group group = getGroup.get();

        GroupRespDto groupRespDto = new GroupRespDto(group);
        groupRespDto.setSuccess(true);
//        List<GroupMember> getGroupMemberList = groupMemberRepository.findByGroupId(groupId);
        List<GroupMember> getGroupMemberList = group.getGroupMember();
        List<GroupMemberRespDto> groupMemberList = new ArrayList<>();
        for (GroupMember groupMember : getGroupMemberList) {
            // userId, groupId
            User user = groupMember.getUser();
            groupMemberList.add(GroupMemberRespDto.builder().userId(user.getId()).groupMemberId(groupMember.getId()).groupId(groupId)
                            .acceptInvitation(groupMember.isAcceptInvitation()).achievementRate(groupMember.getAchievementRate())
                            .userName(user.getName()).on_off(user.isOnOff())
                    .build());
        }
        groupRespDto.setGroupMemberList(groupMemberList);

        List<String> routineIdList = Arrays.asList(group.getGroupRoutine().split(","));
        List<RoutineInfoRespDto> routineList = new ArrayList<>();
        for (String routineId : routineIdList) {
            Routine routine =  routineRepository.findById(Long.valueOf(routineId)).get();
            routineList.add(RoutineInfoRespDto.builder().routineId(routine.getRoutineId()).name(routine.getName()).build());
        }
        groupRespDto.setRoutineList(routineList);

        return groupRespDto;
    }

    @Override
    public void modifyGroupRecruit(GroupReqDto group, long groupId) {

        Group getGroup = groupRepository.findById(groupId).get();
        Board getBoard = boardRepository.findByGroupId(groupId);
        getBoard.setTitle(group.getTitle());
        getBoard.setContent(group.getContent());
        getBoard.setModifiedTime(LocalDateTime.now());
        getBoard.setSharePost(group.isSharePost());

        int routineSize = group.getGroupRoutineId().size();
        String groupRoutine = "";
        for(int i = 0; i < routineSize; i++){
            groupRoutine += group.getGroupRoutineId().get(i);
            if(i != routineSize - 1)
                groupRoutine += ",";
        }
        getGroup.setGroupRoutine(groupRoutine); // routine id list to String

        List<String> groupMemberIdList = group.getGroupMemberId(); // 이번에 입력된 멤버

        List<GroupMember> originGroup = getGroup.getGroupMember();
        for (GroupMember orgGroupMember:
             originGroup) {
            groupMemberRepository.delete(orgGroupMember);
        }

//        for (String groupMemberId : groupMemberIdList) {
//            User user = userRepository.findById(groupMemberId).get();
//
//            groupMemberRepository.save(GroupMember.builder().group(getGroup).user(user).build());
//        }

        // groupmember에 넣어주는게 아니라 list에 넣어주면 알아서 넣어주는거 아냐?
//        getGroup.setGroupMember(); -> 여기에 넣어주는 거 아냐?
        List<GroupMember> groupMemberList = new ArrayList<>();
        for (String groupMemberId : group.getGroupMemberId()) {
            User user = userRepository.findById(groupMemberId).get();
            GroupMember groupMember = GroupMember.builder().group(getGroup).user(user).build();
            groupMemberRepository.save(groupMember);
            groupMemberList.add(groupMember);
//            groupMemberList.add(GroupMember.builder().group(getGroup).user(user).build());
        }
        User registerUser = userRepository.findById(group.getUserId()).get();
        GroupMember groupRegister = GroupMember.builder().user(registerUser).group(getGroup).acceptInvitation(true).build();
        groupMemberList.add(groupRegister);
        getGroup.setGroupMember(groupMemberList);

        groupMemberRepository.save(groupRegister);
        groupRepository.save(getGroup); // 여기서 에러 삭제된 값을 가져올 수 없어서
        boardRepository.save(getBoard);

    }

    // scheduler annotation
    @Override
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul") // 매일 0시 0분 0초 그룹 멤버 확정
    public void startGroupConfirm() {
        List<Group> groupList = groupRepository.findAllByStartDate(LocalDate.now());
        for (Group group : groupList) {
            List<GroupMember> confirmGroupMember = new ArrayList<>();
            List<String> routineIdList = Arrays.asList(group.getGroupRoutine().split(","));
            for (GroupMember groupMember : group.getGroupMember()) {
                if(!groupMember.isAcceptInvitation()){
                    groupMemberRepository.deleteById(groupMember.getId()); // delete?
                }else {
                    confirmGroupMember.add(groupMember);
                    int period = group.getPeriod();
                    if (period < routineIdList.size()) {
                        for (int i = 0; i < period; i++){
                            LocalDate recordDate = group.getStartDate().plusDays(i);
                            recordService.registerExercise(RecordRegisterReqDto.builder().userId(groupMember.getUser().getId()).routineId(Long.valueOf(routineIdList.get(i))).build(), recordDate);
                        }
                    }
                    else {
                        int routineSize = routineIdList.size();
                        int routineIdx = 0;
                        for (int i = 0; i < period; i++) {
//                          // 기간 내에 루틴 Id를 1 2 3 1 2 3 1 ..  이런식으로
                            LocalDate recordDate = group.getStartDate().plusDays(i);
//                            recordDate = recordDate.plusDays(1);
                            LOGGER.info("{} {} {} ",recordDate.getYear(), recordDate.getMonthValue(), recordDate.getDayOfMonth());
                            recordService.registerExercise(RecordRegisterReqDto.builder().userId(groupMember.getUser().getId()).routineId(Long.valueOf(routineIdList.get(routineIdx++))).build(),recordDate);
                            if(routineIdx == routineSize)
                                routineIdx = 0;
                        }
                    }
                }
            }
            group.setGroupMember(confirmGroupMember);
            group.setCurrentMember(confirmGroupMember.size());
            groupRepository.save(group);
        }

    }

    @Override
//    public void clickLikesGroupRecruit(GroupRecruitRespDto groupRecruit) {
    public boolean clickLikesGroupRecruit(String userId, long groupId) {

        boolean isClicked;
        Board board = boardRepository.findByGroupId(groupId);
        Likes getLikes = likesRepository.findByUserIdAndBoardId(userId, board.getId());
        if(getLikes == null) {
            // 좋아요 아직 안 누른 상태
            board.setLikes(board.getLikes() + 1);
            User user = userRepository.findById(userId).get();
            likesRepository.save(Likes.builder().user(user).board(board).build());
            isClicked = true;
        }else{
            // 좋아요 이미 누른 상태
            board.setLikes(board.getLikes() - 1);
            likesRepository.deleteById(getLikes.getId());
            isClicked = false;
        }
        boardRepository.save(board);
        return isClicked;
//        GroupRecruitRespDto groupRecruit =  new GroupRecruitRespDto(board.getGroup());
//        groupRecruit.setTitle(board.getTitle());
//        groupRecruit.setContent(board.getContent());
//        groupRecruit.setRegisteredTime(board.getRegistered_time());
//        groupRecruit.setModifiedTime(board.getModified_time());
//        groupRecruit.setSharePost(board.isSharePost());
//        groupRecruit.setHits(board.getHits() + 1);
//        groupRecruit.setLikes(board.getLikes());
//
//        // 그룹에 포함되어있는지
//        List<Reply> getReplyList = replyRepository.findByBoard_Id(boardId);
//        List<ReplyRespDto> replyRespDtoList = new ArrayList<>();
//        for (Reply reply:
//                getReplyList) {
//            ReplyRespDto replyRespDto = new ReplyRespDto(reply);
//            if(groupMemberRepository.findByGroupIdAndUserId(board.getGroup().getId(), reply.getUser().getId()) == null)
//                replyRespDto.setIncludedGroup(false);
//            else
//                replyRespDto.setIncludedGroup(true);
//            replyRespDtoList.add(replyRespDto);
//        }
//        groupRecruit.setGroupRecruitReplyList(replyRespDtoList);

//        return groupRecruit;
    }

    @Override
    public GroupRecruitRespDto getGroupRecruit(long groupId) {
        Optional<Group> getGroup = groupRepository.findById(groupId);
        if(getGroup.isEmpty()){
            return GroupRecruitRespDto.builder().success(false).msg("해당 게시글을 찾을 수 없습니다.").build();
        }

        Group group = getGroup.get();

        Board board = boardRepository.findByGroupId(groupId);
        board.setHits(board.getHits() + 1);
        boardRepository.save(board);

        GroupRecruitRespDto groupRecruitRespDto = new GroupRecruitRespDto(group);
        groupRecruitRespDto.setSuccess(true);
        groupRecruitRespDto.setTitle(board.getTitle());
        groupRecruitRespDto.setBoardId(board.getId());
        groupRecruitRespDto.setContent(board.getContent());
        groupRecruitRespDto.setUserId(board.getUser().getId());
        groupRecruitRespDto.setRegisteredTime(board.getRegisteredTime());
        groupRecruitRespDto.setModifiedTime(board.getModifiedTime());
        groupRecruitRespDto.setSharePost(board.isSharePost());
        groupRecruitRespDto.setHits(board.getHits());
        groupRecruitRespDto.setLikes(board.getLikes());
        // 그룹 운동 루틴 목록
        // 만약에 1만 들어있으면?
        List<String> routineIdList = Arrays.asList(group.getGroupRoutine().split(","));
        LOGGER.info("routineList size : {}", routineIdList.size());
        List<RoutineInfoRespDto> routineList = new ArrayList<>();
        for (String routineId : routineIdList) {
            Routine routine =  routineRepository.findById(Long.valueOf(routineId)).get();
            routineList.add(RoutineInfoRespDto.builder().routineId(routine.getRoutineId()).name(routine.getName()).build());
        }
        groupRecruitRespDto.setRoutineList(routineList);

        //  그룹 멤버 목록
        List<GroupMember> getgroupMemberList = group.getGroupMember();
        List<GroupMemberRespDto> groupMemberList = new ArrayList<>();
        for (GroupMember groupMember: getgroupMemberList) {
            User user = groupMember.getUser();
            groupMemberList.add(GroupMemberRespDto.builder().userId(user.getId()).groupMemberId(groupMember.getId()).groupId(groupId)
                    .acceptInvitation(groupMember.isAcceptInvitation()).achievementRate(groupMember.getAchievementRate())
                    .userName(user.getName()).on_off(user.isOnOff())
                    .build());
        }
        groupRecruitRespDto.setGroupMemberList(groupMemberList);

        // 그룹 모집글에 달린 댓글
        List<Reply> getReplyList = replyRepository.findByBoard_Id(board.getId());
        if(!getReplyList.isEmpty()) {
            List<ReplyRespDto> replyRespDtoList = new ArrayList<>();
            for (Reply reply :
                    getReplyList) {
                ReplyRespDto replyRespDto = new ReplyRespDto(reply, true);
                if (groupMemberRepository.findByGroupIdAndUserId(group.getId(), reply.getUser().getId()) == null)
                    replyRespDto.setIncludedGroup(false);
                else
                    replyRespDto.setIncludedGroup(true);
                replyRespDtoList.add(replyRespDto);
            }
            groupRecruitRespDto.setGroupRecruitReplyList(replyRespDtoList);
            groupRecruitRespDto.setReplySize(replyRespDtoList.size());
        }
        return groupRecruitRespDto;
    }

    @Override
    public List<GroupRecruitRespDto> getGroupRecruitList() {
        List<Group> getGroupRecruitList =  groupRepository.findAllByEndRecruitDateGreaterThanEqual(LocalDate.now());

        //empty
        List<GroupRecruitRespDto> groupRecruitList = new ArrayList<>();
        for (Group groupRecruit : getGroupRecruitList) {
            Board board = boardRepository.findByGroupId(groupRecruit.getId());
            if(board != null) {
                GroupRecruitRespDto groupRecruitResp = new GroupRecruitRespDto(groupRecruit);
                groupRecruitResp.setTitle(board.getTitle());
                groupRecruitResp.setContent(board.getContent());
                groupRecruitResp.setBoardId(board.getId());
                groupRecruitResp.setUserId(board.getUser().getId());
                groupRecruitResp.setRegisteredTime(board.getRegisteredTime());
                groupRecruitResp.setModifiedTime(board.getModifiedTime());
                groupRecruitResp.setStartRecruitDate(groupRecruit.getStartRecruitDate());
                groupRecruitResp.setEndRecruitDate(groupRecruit.getEndRecruitDate());
                groupRecruitResp.setHits(board.getHits());
                groupRecruitResp.setLikes(board.getLikes());
                groupRecruitResp.setReplySize(replyRepository.countByBoard_Id(board.getId()));
                groupRecruitList.add(groupRecruitResp);
            }
        }
        return groupRecruitList;
    }

    @Override
    public List<GroupRespDto> getMyGroupList(String userId) {

        List<GroupRespDto> myGroupList = new ArrayList<>();

        List<Group> groupList = groupRepository.findAllByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate.now(), LocalDate.now());
        if(groupList.isEmpty())
            return myGroupList;

        for (Group group : groupList) {
            if(groupMemberRepository.findByGroupIdAndUserId(group.getId(), userId) != null) { // 있으면
                myGroupList.add(new GroupRespDto(group));
            }
        }

        return myGroupList;
    }

    @Scheduled(cron = "10 0 0 1/1 * ?", zone = "Asia/Seoul")
    public void findStartGroup() {
        List<Group> groupList = groupRepository.findByStartDate(LocalDate.now(ZoneId.of("Asia/Seoul")));
        makeGroupNotificationMessage("시작", groupList);
    }

    @Scheduled(cron = "0 0 0 1/1 * ?", zone = "Asia/Seoul")
    public void findEndGroup() {
        List<Group> groupList = groupRepository.findByEndDate(LocalDate.now(ZoneId.of("Asia/Seoul")).minusDays(1));
        makeGroupNotificationMessage("종료", groupList);
    }

    @Transactional
    public void makeGroupNotificationMessage(String se, List<Group> groupList) {

        for (Group group : groupList) {
            List<GroupMember> groupMemberList = groupMemberRepository.findByGroup_Id(group.getId());

            for(GroupMember groupMember : groupMemberList) {
                Notification notification = Notification.builder()
                        .group(group)
                        .user(groupMember.getUser())
                        .message(group.getGroupName() + " 그룹이 " + se + "되었습니다.")
                        .notification_type(0)
                        .build();

                notificationRepository.save(notification);
            }
        }
    }
}

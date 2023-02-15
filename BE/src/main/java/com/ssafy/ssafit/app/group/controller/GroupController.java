package com.ssafy.ssafit.app.group.controller;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.service.BoardService;
import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.dto.req.GroupReqDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRecruitRespDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.service.GroupMemberService;
import com.ssafy.ssafit.app.group.service.GroupService;
import com.ssafy.ssafit.app.reply.dto.req.ReplyReqDto;
import com.ssafy.ssafit.app.reply.service.ReplyService;
import com.ssafy.ssafit.app.user.controller.UserController;
import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import com.ssafy.ssafit.app.user.dto.resp.UserInfoResp;
import com.ssafy.ssafit.app.user.service.UserService;
import com.ssafy.ssafit.app.user.service.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.juli.logging.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/group")
@Api("Group Controller API v1")
// 그룹 생성 및 그룹 모집글 관련
public class GroupController {

    private final Logger LOGGER = LoggerFactory.getLogger(GroupController.class);

    private static final long GROUP_RECRUIT = 4; // 그룹 모집글

    private static final long GROUP_STATUS = 5; // 그룹 현황

    private GroupService groupService;

    private GroupMemberService groupMemberService;

    private BoardService boardService;

    private UserService userService;

    private ReplyService replyService;

    @Autowired
    public GroupController(GroupService groupService, GroupMemberService groupMemberService, BoardService boardService, UserService userService, ReplyService replyService) {
        this.groupService = groupService;
        this.groupMemberService = groupMemberService;
        this.boardService = boardService;
        this.userService = userService;
        this.replyService = replyService;
    }

    @GetMapping("/myGroupList")
    @ApiOperation(value = "나의 운동 그룹 목록", notes = "로그인한 회원의 운동 그룹 목록을 조회한다.", response = GroupRespDto.class)
    public ResponseEntity<List<GroupRespDto>> getMyGroupList(@AuthenticationPrincipal CustomUserDetails user){
        LOGGER.info("[Enter] getMyGroupList");

        List<GroupRespDto> myGroupList = groupService.getMyGroupList(user.getUsername());
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(!myGroupList.isEmpty())
            status = HttpStatus.OK;
        return new ResponseEntity<List<GroupRespDto>>(myGroupList, status);
    }


        //  그룹 현황 보기
    //  그룹 초대 받았을 때 확인 가능
    @GetMapping("/{groupId}")
    @ApiOperation(value = "그룹 ID로 그룹 현황 조회", notes = "입력한 그룹 ID(groupId)에 해당하는 그룹(Group)을 조회한다.", response = GroupRespDto.class)
    public ResponseEntity<GroupRespDto> getBoard(@PathVariable("groupId") @ApiParam(value = "그룹 ID", required = true) long groupId, @AuthenticationPrincipal CustomUserDetails user) throws Exception {
        LOGGER.info("[Enter] getBoard");
        GroupRespDto group = groupService.view(groupId);
        HttpStatus status = HttpStatus.NO_CONTENT;

        boolean checkGroupMember = groupMemberService.findGroupMember(groupId, user.getUsername());
        if(group.isSuccess() && checkGroupMember)
            status = HttpStatus.OK;

        return new ResponseEntity<GroupRespDto>(group, status);
    }

    //  그룹 모집글 목록 보기
    @GetMapping("/recruit")
    @ApiOperation(value = "그룹 모집글 목록 조회 ", notes = "그룹 모집글 목록을 조회한다.", response = GroupRespDto.class)
    public ResponseEntity<List<GroupRecruitRespDto>> getGroupRecruitList(){
        LOGGER.info("[Enter] getGroupRecruitList");
        return new ResponseEntity<List<GroupRecruitRespDto>>(groupService.getGroupRecruitList(), HttpStatus.OK);
    }

    // 그룹 모집글 하나 보기
    @GetMapping("/recruit/{groupId}")
    @ApiOperation(value = "그룹 모집글 조회 ", notes = "입력한 그룹 ID(groupId)에 해당하는 그룹 모집글을 조회한다.", response = GroupRespDto.class)
    public ResponseEntity<GroupRecruitRespDto> getGroupRecruit(@PathVariable("groupId") @ApiParam(value = "그룹 ID", required = true) long groupId){
        LOGGER.info("[Enter] getGroupRecruit");
        GroupRecruitRespDto groupRecruit = groupService.getGroupRecruit(groupId); // 그룹 초대된 멤버들 정보
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(groupRecruit.isSuccess())
            status = HttpStatus.OK;
        return new ResponseEntity<GroupRecruitRespDto>(groupRecruit, status);
    }

    @GetMapping("/recruit/{groupId}/likes")
    @ApiOperation(value = "그룹 모집글 좋아요 누르기", notes = "게시글 ID의 좋아요 클릭시 게시글의 좋아요 수가 증가한다.", response = Boolean.class)
//    public ResponseEntity<GroupRecruitRespDto> clickLike(@PathVariable("boardId") long groupId){
    public ResponseEntity<Boolean> clickLike(@PathVariable("groupId") long groupId, @AuthenticationPrincipal CustomUserDetails user){
        LOGGER.info("[Enter] clickLike");
        String userId = user.getUsername();
//        return new ResponseEntity<GroupRecruitRespDto>(groupService.clickLikesGroupRecruit(userId, groupId), HttpStatus.OK);

//        boolean isClicked = groupService.clickLikesGroupRecruit(userId, groupId);
        return new ResponseEntity<Boolean>(groupService.clickLikesGroupRecruit(userId, groupId), HttpStatus.OK);
    }

    // 그룹 생성 -> 그룹 모집글 작성 시 그룹 생성됨
    @Transactional
    @PostMapping(value = "/regist")
    @ApiOperation(value = "그룹 생성", notes = "입력한 정보로 새로운 그룹을 생성한다. 그룹 모집글의 경우 자동으로 그룹 생성")
    public ResponseEntity<Boolean> registGroup(@ApiParam(value = "그룹 정보", required = true) @RequestBody GroupReqDto group, @AuthenticationPrincipal CustomUserDetails user) throws Exception {
        LOGGER.info("[Enter] registGroup");
        String userId = user.getUsername();
        group.setUserId(userId);
        Group newGroup = new Group(group);
        newGroup.setPeriod(Period.between(group.getStartDate(), group.getEndDate()).getDays() + 1);
        newGroup.setCurrentMember(group.getGroupMemberId().size() + 1);

        // 그룹 생성  ( + 루틴 설정)
//        Group registedGroup = groupService.regist(group);
        Group registedGroup = groupService.regist(newGroup, group.getGroupRoutineId());

        // FE에서 로그인된 계정 userId도 추가하면 여기서 할 필요 없음 ... 근데 JWT 관련해서 알고난 뒤에 처리해야할 듯
        // 그리고 따로 groupMemberService에 넣어주는게 아니라 group에 set하면 알아서 넣어주는 거 아닌가?

        // 로그인 된 사용자 아이디, 즉 그룹 모집글 또는 그룹 생성을 한 작성자
        // 그룹 모집글 작성자 userId -> 바로 수락으로 변경
        groupMemberService.addGroupMember(GroupMemberReqDto.builder().groupId(registedGroup.getId()).userId(userId).acceptInvitation(true).build());

//        그룹 요청 메시지 알람 보내기 (Firebase ? )
        // groupmemberservice에 따로 넣어주는게 아니라 .. 근ㄷ ㅔ groupId를 모르는데 일단 해보자 -> test해보자
        groupMemberService.addGroupMembers(newGroup, group.getGroupMemberId());

        if (group.getCategoryId() == GROUP_RECRUIT) { // 그룹 모집글
            BoardReqDto board = BoardReqDto.builder().categoryId(group.getCategoryId()).userId(group.getUserId()).title(group.getTitle()).content(group.getContent()).registeredTime(LocalDateTime.now()).sharePost(group.isSharePost()).build();
            // board.user(userId) 추가 : 현재 로그인된 계정
            groupService.registGroupRecruit(registedGroup, board);
        }

        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    // 그룹 모집글 수정
    @PutMapping("/recruit/{groupId}")
    @ApiOperation(value = "그룹 모집글 수정", notes = "입력한 정보로 기존 그룹 모집글을 수정한다.")
    public ResponseEntity<Boolean> modifyGroupRecruit(@RequestBody @ApiParam(value = "게시글 정보", required = true) GroupReqDto board, @PathVariable("groupId") long groupId) throws Exception {
        LOGGER.info("Called modifyGroupRecruit. board: {}", board);
//        board.setUserId(user.getName());
        groupService.modifyGroupRecruit(board, groupId);

        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/recruit/{groupId}")
    @ApiOperation(value = "그룹 모집글 삭제 ", notes = "그룹 ID(groupId)에 해당하는 그룹 모집글을 삭제한다.", response = Boolean.class)
    public ResponseEntity<Boolean> deleteGroupRecruit(@PathVariable @ApiParam(value = "그룹 ID", required = true) long groupId){
        LOGGER.info("[Enter] deleteGroupRecruit");
        boardService.deleteGroupRecruit(groupId);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping("/recruit/{groupId}/regist")
    @ApiOperation(value = "그룹 모집글 댓글 작성", notes = "입력한 정보로 그룹 모집글에 새로운 댓글을 생성한다.")
    public ResponseEntity<Boolean> postReply(@RequestBody @ApiParam(value = "새로운 댓글", required = true) ReplyReqDto reply, @AuthenticationPrincipal CustomUserDetails user) throws Exception {
        LOGGER.info("Called postReply. reply: {}", reply);
        reply.setUser_id(user.getUsername());
        replyService.regist(reply);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PutMapping("/recruit/{groupId}/{replyId}")
    @ApiOperation(value = "그룹 모집글 댓글 수정", notes = "입력한 정보로 기존 댓글을 수정한다.")
    public ResponseEntity<Boolean> modifyReply(@RequestBody @ApiParam(value = "수정 댓글", required = true) ReplyReqDto reply) throws Exception {
        LOGGER.info("Called modifyReply. reply: {}", reply);
//        reply.setUser_id(user.getUsername());
        replyService.modify(reply);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/recruit/{groupId}/{replyId}")
    @ApiOperation(value = "그룹 모집글 댓글 삭제", notes = "입력한 댓글 ID(replyId)에 해당하는 댓글을 삭제한다.")
    public ResponseEntity<Boolean> deleteReply(@PathVariable("replyId") @ApiParam(value = "댓글 ID", required = true) long replyId) throws Exception {
        LOGGER.info("Called deleteReply. replyId: {}", replyId);
        replyService.delete(replyId);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping("/recruit/{groupId}/{replyId}/add")
    @ApiOperation(value = "그룹원 추가", notes = "해당 댓글의 회원을 그룹원에 추가한다. acceptInvitation = true", response = Boolean.class)
    public ResponseEntity<Boolean> addToGroup(@RequestBody @ApiParam(value = "댓글 정보", required = true) GroupMemberReqDto groupMember) throws Exception {
        LOGGER.info("Called addToGroup. ");
        groupMemberService.addGroupMember(groupMember); //  ReplyRespDto의 includedGroup (그룹 포함 여부) true로 변경됨
        // groupRequestStatus : true(그룹 포함 상태 : 그룹 초대 요청 수락함), false (그룹 초대 요청 수락 아직 안 함)
        boolean groupRequestStatus = groupMemberService.groupInvitationRequestStatus(groupMember.getGroupId(), groupMember.getUserId());
        return new ResponseEntity<Boolean>(groupRequestStatus, HttpStatus.OK);
    }

    @PostMapping("/recruit/{groupId}/{replyId}/delete")
    @ApiOperation(value = "그룹원 제외", notes = "해당 댓글의 회원을 그룹원에서 제외한다. acceptInvitation = false", response = Boolean.class)
    public ResponseEntity<Boolean> deleteFromGroup(@RequestBody @ApiParam(value = "댓글 정보", required = true) GroupMemberReqDto groupMember) throws Exception {
        LOGGER.info("Called deleteFromGroup. ");
        groupMemberService.deleteGroupMember(groupMember);
        //  ReplyRespDto의 includedGroup (그룹 포함 여부) false로 변경됨
        return new ResponseEntity<Boolean>(false, HttpStatus.OK);
    }

    @GetMapping("/search")
    @ApiOperation(value = "그룹원 검색", notes = "입력한 회원의 닉네임이 포함된 회원 조회", response = GroupRespDto.class)
    public ResponseEntity<List<UserInfoResp>> searchGroupCrew(@RequestParam("name") @ApiParam(value = "검색할 닉네임", required = true) String name){
        LOGGER.info("[Enter] searchGroupCrew");
        List<UserInfoResp> userInfoList = userService.searchUsers(name);
        HttpStatus status = HttpStatus.NO_CONTENT; // 204
        if(!userInfoList.isEmpty())
            status = HttpStatus.OK;
        return new ResponseEntity<List<UserInfoResp>>(userInfoList, status);
    }

    // 그룹 탈퇴
    @DeleteMapping("/{groupId}")
    @ApiOperation(value = "그룹 탈퇴 ", notes = "그룹 ID(groupId)에 해당하는 그룹을 탈퇴한다.", response = Boolean.class)
    public ResponseEntity<Boolean> quitGroup(@PathVariable("groupId") @ApiParam(value = "그룹 ID", required = true) long groupId, @AuthenticationPrincipal CustomUserDetails user){
        LOGGER.info("[Enter] quitGroup");
        String userId = user.getUsername();
        // 해당 그룹에서 본인을 삭제
        groupMemberService.deleteGroupMember(GroupMemberReqDto.builder().groupId(groupId).userId(userId).build());
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @GetMapping("/invitation/accept/{groupId}")
    @ApiOperation(value = "그룹 초대 요청 수락", notes = "그룹 초대 요청을 수락한다.", response = Boolean.class)
    public ResponseEntity<Boolean> acceptInvitation(@PathVariable("groupId") @ApiParam(value = "그룹 ID", required = true) long groupId, @AuthenticationPrincipal CustomUserDetails user) throws Exception {
        LOGGER.info("Called acceptInvitation. ");
        groupMemberService.acceptInvitation(groupId, user.getUsername());
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @GetMapping("/invitation/deny/{groupId}")
    @ApiOperation(value = "그룹 초대 요청 거절", notes = "그룹 초대 요청을 거절한다.", response = Boolean.class)
    public ResponseEntity<Boolean> denyInvitation(@PathVariable("groupId") @ApiParam(value = "그룹 ID", required = true) long groupId, @AuthenticationPrincipal CustomUserDetails user) throws Exception {
        LOGGER.info("Called acceptInvitation. ");
        groupMemberService.deleteGroupMember(GroupMemberReqDto.builder().userId(user.getUsername()).groupId(groupId).build());
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}

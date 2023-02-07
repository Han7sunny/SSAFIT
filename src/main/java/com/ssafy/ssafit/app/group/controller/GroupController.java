package com.ssafy.ssafit.app.group.controller;

<<<<<<< HEAD
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GroupController {
=======
import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.service.BoardService;
import com.ssafy.ssafit.app.group.dto.req.GroupReqDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRecruitRespDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.service.GroupMemberService;
import com.ssafy.ssafit.app.group.service.GroupService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/group")
@Api("Group Controller API v1")
// 그룹 생성 및 그룹 모집글 관련
public class GroupController {

    private final Logger LOGGER = LoggerFactory.getLogger(GroupController.class);

    private static final long GROUP_RECRUIT = 4; // 그룹 모집글

    private static final long GROUP_STATUS = 5; // 그룹 현황

    private GroupService groupService;

    private GroupMemberService groupMemberService;

    private BoardService boardService;

    @Autowired
    public GroupController(GroupService groupService, GroupMemberService groupMemberService, BoardService boardService) {
        this.groupService = groupService;
        this.groupMemberService = groupMemberService;
        this.boardService = boardService;
    }

    //  그룹 현황 보기
    //  그룹 초대 받았을 때 확인 가능
    @GetMapping("/{groupId}")
    @ApiOperation(value = "그룹 ID로 그룹 조회", notes = "입력한 그룹 ID(groupId)에 해당하는 그룹(Group)을 조회한다.", response = GroupRespDto.class)
    public ResponseEntity<GroupRespDto> getBoard(@PathVariable("groupId") @ApiParam(value = "그룹 ID", required = true) long groupId) throws Exception {
        LOGGER.info("[Enter] getBoard");
        GroupRespDto group = groupService.view(groupId);
        HttpStatus status = HttpStatus.NO_CONTENT;

        //  로그인 된 정보 가져오기 userId

//        boolean checkGroupMember = groupMemberService.findGroupMember(groupId, userId);
//        if(group.isSuccess() && checkGroupMember)
//            status = HttpStatus.OK;

        return new ResponseEntity<GroupRespDto>(group, status);
    }

    //  그룹 모집글 목록 보기
    @GetMapping("/recruit")
    @ApiOperation(value = "그룹 모집글 목록 조회 ", notes = "그룹 모집글 목록을 조회한다.", response = GroupRespDto.class)
    public ResponseEntity<List<GroupRecruitRespDto>> getGroupRecruitList(){
        LOGGER.info("[Enter] getGroupRecruitList");
        return new ResponseEntity<List<GroupRecruitRespDto>>(boardService.getGroupRecruitList(),HttpStatus.OK);
    }

    // 그룹 모집글 하나 보기
    //  또는 그룹 초대받은 모집글 .. ?
    @GetMapping("/recruit/{groupId}")
    @ApiOperation(value = "그룹 모집글 조회 ", notes = "입력한 그룹 ID(boardId)에 해당하는 그룹 모집글을 조회한다.", response = GroupRespDto.class)
    public ResponseEntity<GroupRecruitRespDto> getGroupRecruit(@ApiParam(value = "그룹 ID", required = true) long groupId){
        LOGGER.info("[Enter] getGroupRecruit");
        GroupRecruitRespDto groupRecruit = boardService.getGroupRecruit(groupId);
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(groupRecruit.isSuccess())
            status = HttpStatus.OK;
        return new ResponseEntity<GroupRecruitRespDto>(groupRecruit, status);
    }

    // 그룹 생성 -> 그룹 모집글 작성 시 그룹 생성됨
    @PostMapping(value = "/regist")
    @ApiOperation(value = "그룹 생성", notes = "입력한 정보로 새로운 그룹을 생성한다.")
    public ResponseEntity<Boolean> registGroup(@ApiParam(value = "그룹 정보", required = true) @RequestBody GroupReqDto group) throws Exception {
        LOGGER.info("[Enter] registGroup");

        Group newGroup = new Group(group);
        newGroup.setCurrentMember(group.getGroupMemberId().size());

        // 작성자 항상 첫번째 그룹원 (눈에 보이지 않아도)
        long groupId = groupService.regist(newGroup);
//        groupMemberService.addGroupMember(GroupMemberReqDto.builder().groupId(groupId).userId(로그인 된 계정 아이디).acceptInvitation(true).build()); // userId true

//        그룹 요청 메시지 알람 보내기 (Firebase ? )
        groupMemberService.addGroupMembers(newGroup, group.getGroupMemberId());

        if (group.getRegistGroupTypeId() == GROUP_RECRUIT) {
            BoardReqDto board = BoardReqDto.builder().groupId(groupId).title(group.getTitle()).content(group.getContent()).registeredTime(LocalDateTime.now()).build();
            boardService.regist(board);

            // 그룹 id 엮어주기
            // 그룹 모집글 작성

        }


        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

//    그룹 운동 시작 전에 (startDate에 해당하는 날)
//        group_member 중 요청 수락을 한 사람들로만 정보를 갱신

    //  그룹 모집글 삭제 ?
    //  모집 기한 지났으면 삭제해버리기...?
    //  근데 group_id로 묶여있어서 같이 날라가는 거 아냐?

>>>>>>> dev_kkw
}

package com.ssafy.ssafit.app.group.controller;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.service.BoardService;
import com.ssafy.ssafit.app.group.dto.req.GroupReqDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRecruitRespDto;
import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.service.GroupService;
import com.ssafy.ssafit.app.user.controller.UserController;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/group")
public class GroupController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private static final long GROUP_RECRUIT = 4; // 그룹 모집글

    private static final long GROUP_STATUS = 5; // 그룹 현황

    private GroupService groupService;

    private BoardService boardService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/{groupId}")
    @ApiOperation(value = "그룹 ID로 그룹 조회", notes = "입력한 그룹 ID(boardId)에 해당하는 그룹(Group)을 조회한다.", response = GroupRespDto.class)
    public ResponseEntity<GroupRespDto> getBoard(@PathVariable("groupId") @ApiParam(value = "그룹 ID", required = true) long groupId) throws Exception {
        LOGGER.info("[Enter] getBoard");
        GroupRespDto group = groupService.view(groupId);
        if(group.isSuccess())
        return new ResponseEntity<Group>(groupService.);
    }

    // 그룹 현황 보기 (확정됐을때만 볼 수 있도록)

    //  그룹 모집글 목록 보기
    @GetMapping("/recruit")
    public ResponseEntity<List<GroupRecruitRespDto>> getGroupRecruitList(){
        LOGGER.info("[Enter] getGroupRecruitList");
        return new ResponseEntity<List<GroupRecruitRespDto>>(boardService.getGroupRecruitList(),HttpStatus.OK);
    }

    // 그룹 모집글 하나 보기
    @GetMapping("/recruit/{groupId}")
    public ResponseEntity<GroupRecruitRespDto> getGroupRecruit(long groupId){
        LOGGER.info("[Enter] getGroupRecruit");
        return new ResponseEntity<GroupRecruitRespDto>(boardService.getGroupRecruit(groupId), HttpStatus.OK);
    }

    // 그룹 생성 -> 그룹 모집글 작성 시 그룹 생성됨
    @PostMapping(value = "/post")
    @ApiOperation(value = "그룹 생성", notes = "입력한 정보로 새로운 그룹을 생성한다.")
//    public ResponseEntity<Boolean> postPost(@RequestBody BoardReqDto board) throws Exception {
    public ResponseEntity<Boolean> registGroup(@ApiParam(value = "그룹 정보", required = true) @RequestBody GroupReqDto group) throws Exception {
        LOGGER.info("[Enter] registGroup");
        Group newGroup = Group.builder().name(group.getGroupName()).goal(group.getGoal()).penalty(group.getPenalty()).start_date(group.getStart_date()).end_date(group.getEnd_date())
//                그룹 멤버
                .maximum_member(group.getMaximum_member())
                .current_member(group.getGroupMemberId().size())
                .build();

        if (group.getRegistGroupTypeId() == GROUP_RECRUIT) {

            BoardReqDto board = BoardReqDto.builder().title(group.getTitle()).content(group.getContent()).registered_time(LocalDateTime.now()).build();
            boardService.regist(board);

            // 그룹 모집글 작성

        }

//        group_member에 저장

      // 작성자 항상 첫번째 그룹원 (눈에 보이지 않아도)
        groupService.regist(newGroup);
//        그룹 요청 메시지 알람 보내기
        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);

    }

//    그룹 운동 시작 전에 (startDate에 해당하는 날)
//        group_member 중 요청 수락을 한 사람들로만 정보를 갱신


}

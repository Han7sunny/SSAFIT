package com.ssafy.ssafit.app.board.controller;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.service.BoardService;
import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.service.GroupMemberService;
import com.ssafy.ssafit.app.reply.dto.req.ReplyReqDto;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.service.ReplyService;
import com.ssafy.ssafit.app.routine.dto.req.RoutineAddReqDto;
import com.ssafy.ssafit.app.routine.service.RoutineService;
import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import net.coobird.thumbnailator.Thumbnails;
@RestController
@RequestMapping("/board")
@Api("Board Controller API v1")
public class BoardController {

    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    private static final int RECENT_BOARD_SIZE = 4; // 최근 게시글 조회 개수

    private BoardService boardService;
    private ReplyService replyService;
    private GroupMemberService groupMemberService;

    private RoutineService routineService;

    @Autowired
    public BoardController(BoardService boardService, ReplyService replyService, GroupMemberService groupMemberService, RoutineService routineService) {
        this.boardService = boardService;
        this.replyService = replyService;
        this.groupMemberService = groupMemberService;
        this.routineService = routineService;
    }

    @GetMapping("/")
    @ApiOperation(value = "커뮤니티 글 목록", notes = "커뮤니티에 등록된 게시글(질문글, 운동 루틴 공유글) 중 최근 작성된 각각 4개의 게시글들을 조회한다.(앞에서부터 차례대로 질문글 4,운동 루틴 공유글 4)", response = List.class)
    public ResponseEntity<List<BoardRespDto>> getBoardList() throws Exception {
        logger.info("Called getBoardList");

        //  기존 데이터 RECENT_BOARD_SIZE 이상 있다는 가정 하에 (더미 데이터)
        List<BoardRespDto> boardList = new ArrayList<>();

//        List<BoardRespDto> QAList = boardService.getQAList().subList(0,RECENT_BOARD_SIZE);
//        List<BoardRespDto> shareRoutine = boardService.getShareRoutineList();

        boardList.addAll(boardService.getQAList().subList(0,RECENT_BOARD_SIZE));
        boardList.addAll(boardService.getShareRoutineList().subList(0, RECENT_BOARD_SIZE));

        HttpStatus status = HttpStatus.NO_CONTENT;

        if(!boardList.isEmpty())
            status = HttpStatus.OK;

        return new ResponseEntity<List<BoardRespDto>>(boardList, status);
    }

    @GetMapping("/QA")
    @ApiOperation(value = "커뮤니티 내부의 질문글 목록 조회", notes = "커뮤니티 내부의 질문글 페이지에 등록된 모든 게시글을 조회한다.", response = List.class)
    public ResponseEntity<List<BoardRespDto>> getQAList() throws Exception {
        logger.info("Called getQAList ");

        List<BoardRespDto> QAList = boardService.getQAList();
        HttpStatus status = HttpStatus.NO_CONTENT;

        if(!QAList.isEmpty())
            status = HttpStatus.OK;

        return new ResponseEntity<List<BoardRespDto>>(QAList, status);
    }

    @GetMapping("/shareRoutine")
    @ApiOperation(value = "커뮤니티 내부의 운동 루틴 공유 목록 조회", notes = "커뮤니티 내부의 운동 루틴 공유 페이지에 등록된 모든 게시글을 조회한다.", response = List.class)
    public ResponseEntity<List<BoardRespDto>> getShareRoutine() throws Exception {
        logger.info("Called getShareRoutine ");

        List<BoardRespDto> shareRoutine = boardService.getShareRoutineList();
        HttpStatus status = HttpStatus.NO_CONTENT;

        if(!shareRoutine.isEmpty())
            status = HttpStatus.OK;

        return new ResponseEntity<List<BoardRespDto>>(shareRoutine, status);
    }

//    질문글, 운동 루틴 공유글이라면 Board
    @GetMapping("/{boardId}")
    @ApiOperation(value = "게시글 ID로 게시글 조회", notes = "입력한 게시글 ID(boardId)에 해당하는 게시글(Board) 1개를 조회한다.", response = BoardRespDto.class)
    public ResponseEntity<BoardRespDto> getBoard(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) long boardId) throws Exception {
        logger.info("Called getBoard. boardId: {}", boardId);
        BoardRespDto board = boardService.view(boardId);
        HttpStatus status = HttpStatus.NO_CONTENT;
        if(board.isSuccess())
            status = HttpStatus.OK;
        return new ResponseEntity<BoardRespDto>(board, status);
    }

    //    imagePath 확인 필요
    //    게시글 생성시 -> 공지사항(관리자) 커뮤니티(질문글, 운동 루틴 공유), 그룹 페이지(그룹 현황, 그룹 모집글)
    @PostMapping(value = "/regist")
    @ApiOperation(value = "게시글 생성", notes = "입력한 정보로 새로운 게시글을 생성한다. 게시글의 카테고리(categoryId)가 3(운동 루틴 공유글)일 경우 루틴과 함께 저장(루틴 ID 1개 필수)")
//    public ResponseEntity<Boolean> registBoard(@ApiParam(value = "게시글 정보", required = true) @RequestBody BoardReqDto board, @RequestParam(value = "files", required = false) List<MultipartFile> files, @Value("${file.path.upload-images}") String imagePath) throws Exception {
    public ResponseEntity<Boolean> registBoard(@ApiParam(value = "게시글 정보", required = true) @RequestBody BoardReqDto board, @AuthenticationPrincipal CustomUserDetails user) throws Exception {
        logger.info("Called registBoard. board: {}", board);
        board.setUserId(user.getUsername());
        Board registedBoard = boardService.regist(board);

//        List<String> imgSrcList = new ArrayList<>();
//        if (!files.isEmpty()) { // 질문글
////            String today = new SimpleDateFormat("yyMMdd").format(new Date());
//
//            String saveFolder = imagePath; // + File.separator + today;
//            logger.debug("저장 폴더 : {}", saveFolder);
//            File folder = new File(saveFolder);
//            if (!folder.exists())
//                folder.mkdirs();
//
//            for (MultipartFile mfile : files) {
//                String originalFileName = mfile.getOriginalFilename();
//                if (!originalFileName.isEmpty()) {
//                    String saveFileName = UUID.randomUUID().toString()
//
//                            + originalFileName.substring(originalFileName.lastIndexOf('.'));
//                    logger.debug("원본 파일 이름 : {}, 실제 저장 파일 이름 : {}", mfile.getOriginalFilename(), saveFileName);
//
//                    File saveFile = new File(folder, saveFileName);
//                    mfile.transferTo(saveFile);
//
//                    File thumbnailFile = new File(saveFolder, "s_" + saveFileName);
//                    BufferedImage bo_img = ImageIO.read(saveFile);
//                    double ratio = 3;
//                    int width = (int) (bo_img.getWidth() / ratio);
//                    int height = (int) (bo_img.getHeight() / ratio);
//
//                    Thumbnails.of(saveFile).size(width, height).toFile(thumbnailFile);
////                    file 저장
//                    imgSrcList.add(saveFileName);
////                    boardService.regist();
////                    boardService.saveFile();
////                      아휴 그냥 이미지 하나만 올릴 수 있게 할까?;;
//                }
//            }
//            boardService.registFile(registedBoard, imgSrcList);
//        }
        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @PutMapping("/{boardId}")
    @ApiOperation(value = "게시글 수정", notes = "입력한 정보로 기존 게시글을 수정한다.")
    public ResponseEntity<Boolean> modifyBoard(@RequestBody @ApiParam(value = "게시글 정보", required = true) BoardReqDto board) throws Exception {
        logger.info("Called modifyBoard. board: {}", board);
        boardService.modify(board);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    @ApiOperation(value = "게시글 삭제", notes = "입력한 게시글 ID에 해당하는 게시글을 삭제한다. 게시판의 종류와 상관 없이 게시글에 대해 작성된 모든 댓글도 함께 삭제된다.")
    public ResponseEntity<Boolean> deleteBoard(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) long boardId) throws Exception {
        logger.info("Called deleteBoard. boardId: {}", boardId);
        boardService.delete(boardId);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    //    루틴 다운로드
    @GetMapping("/{boardId}/downloads")
    @ApiOperation(value = "운동 루틴 다운로드", notes = "게시글 ID에 첨부된 운동 루틴을 로그인 계정의 운동 루틴 목록에 추가한다.")
    public ResponseEntity<BoardRespDto> downloadRoutine(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) long boardId){
        logger.info("Called downloadRoutine. boardId: {}", boardId);

        BoardRespDto board = boardService.increaseDownload(boardId);
        routineService.addUserRoutine(new RoutineAddReqDto(board.getRoutineId()));

        return new ResponseEntity<BoardRespDto>(board,HttpStatus.OK);
    }

    @GetMapping("/{boardId}/likes")
    @ApiOperation(value = "좋아요 누르기", notes = "게시글 ID의 좋아요 클릭시 게시글의 좋아요 수가 증가한다.", response = Boolean.class)
    public ResponseEntity<Boolean> clickLike(@PathVariable("boardId") long boardId, @AuthenticationPrincipal CustomUserDetails user){
        String userId = user.getUsername();
        boolean isClicked = boardService.clickLikes(userId, boardId); // boolean값으로 변경
        // return false : 좋아요 아직 안 눌렀거나 이미 좋아요 눌렀는데 한 번 더 눌러서 취소시킴
        // return true : 좋아요 이번에 새로 누름
        logger.info("[clickLikes] likes return : {}", isClicked);
        return new ResponseEntity<Boolean>(isClicked, HttpStatus.OK);
    }



    @PostMapping("/{boardId}/regist")
    @ApiOperation(value = "댓글 작성", notes = "입력한 정보로 새로운 댓글을 생성한다.")
    public ResponseEntity<Boolean> postReply(@RequestBody @ApiParam(value = "새로운 댓글", required = true) ReplyReqDto reply, @AuthenticationPrincipal CustomUserDetails user) throws Exception {
        logger.info("Called postReply. reply: {}", reply);
        reply.setUser_id(user.getUsername());
        replyService.regist(reply);
        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @PutMapping("/{boardId}/{replyId}")
    @ApiOperation(value = "댓글 수정", notes = "입력한 정보로 기존 댓글을 수정한다.")
    public ResponseEntity<Boolean> modifyReply(@RequestBody @ApiParam(value = "수정 댓글", required = true) ReplyReqDto reply, @AuthenticationPrincipal CustomUserDetails user) throws Exception {
        logger.info("Called modifyReply. reply: {}", reply);
        reply.setUser_id(user.getUsername());
        replyService.modify(reply);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}/{replyId}")
    @ApiOperation(value = "댓글 삭제", notes = "입력한 댓글 ID(replyId)에 해당하는 댓글을 삭제한다.")
    public ResponseEntity<Boolean> deleteReply(@PathVariable("replyId") @ApiParam(value = "댓글 ID", required = true) long replyId) throws Exception {
        logger.info("Called deleteReply. replyId: {}", replyId);
        replyService.delete(replyId);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}

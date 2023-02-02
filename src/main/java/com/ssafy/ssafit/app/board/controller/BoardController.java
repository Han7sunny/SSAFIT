package com.ssafy.ssafit.app.board.controller;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.board.service.BoardService;
import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.group.dto.req.GroupMemberReqDto;
import com.ssafy.ssafit.app.group.service.GroupMemberService;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.service.ReplyService;
import io.swagger.annotations.Api;
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

    private BoardService boardService;
    private ReplyService replyService;
    private GroupMemberService groupMemberService;

    @Autowired
    public BoardController(BoardService boardService, ReplyService replyService, GroupMemberService groupMemberService) {
        this.boardService = boardService;
        this.replyService = replyService;
        this.groupMemberService = groupMemberService;
    }





//    @GetMapping("/{boardId}")
////    @ApiOperation(value = "게시판 ID로 게시글 조회", notes = "입력한 게시판 ID(boardId)에 해당하는 모든 게시글(Post)을 조회한다.", response = Post.class)
//    public ResponseEntity<List<BoardRespDto>> getBoardListByBoardId(@PathVariable("boardId") long boardId) throws Exception {
////    public ResponseEntity<List<Post>> getPostListByBoardId(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) int boardId) throws Exception {
//        logger.info("Called getBoardListByBoardId. boardId: {}", boardId);
//
//        PostSearchCriteria criteria = new PostSearchCriteria();
//        if (boardId == 0) boardId = 1;
//        criteria.setBoardId(boardId);
//        return new ResponseEntity<List<BoardRespDto>>(boardService.search(criteria), HttpStatus.OK);
//    }

//    만약 공지사항, 질문글, 운동 루틴 공유글이라면 Board ,, 그룹 페이지 (그룹 모집글, 그룹 현황)은 별도로 ...?
    @GetMapping("/{boardId}")
    @ApiOperation(value = "게시글 ID로 게시글 조회", notes = "입력한 게시글 ID(boardId)에 해당하는 게시글(Board) 1개를 조회한다.", response = BoardRespDto.class)
    public ResponseEntity<BoardRespDto> getBoard(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) long boardId) throws Exception {
//    public ResponseEntity<List<Post>> getBoard(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) int boardId, @PathVariable("postId") @ApiParam(value = "게시글 ID", required = true) int postId) throws Exception {

//        logger.info("Called getBoard. boardId: {}", boardId);
//        BoardRespDto board = boardService.view(boardId, category_id);
        HttpStatus status = HttpStatus.NO_CONTENT;
//        if(board.isSuccess())
//            status = HttpStatus.OK;
//        return new ResponseEntity<BoardRespDto>(board, status);
        return new ResponseEntity<>(status);
    }

    //    imagePath 확인 필요
    //    게시글 생성시 -> 공지사항(관리자) 커뮤니티(질문글, 운동 루틴 공유), 그룹 페이지(그룹 현황, 그룹 모집글)
    @PostMapping(value = "/regist")
    @ApiOperation(value = "게시글 생성", notes = "입력한 정보로 새로운 게시글을 생성한다.")
    public ResponseEntity<Boolean> registBoard(@ApiParam(value = "게시글 정보", required = true) @RequestBody BoardReqDto board, @RequestParam(value = "files", required = false) List<MultipartFile> files, @Value("${file.path.upload-images}") String imagePath) throws Exception {
        logger.info("Called registBoard. board: {}, files: {}", board, files);
        Board registedBoard = boardService.regist(board);

        List<String> imgSrcList = new ArrayList<>();
        if (!files.isEmpty()) {
//            String today = new SimpleDateFormat("yyMMdd").format(new Date());

            String saveFolder = imagePath; // + File.separator + today;
            logger.debug("저장 폴더 : {}", saveFolder);
            File folder = new File(saveFolder);
            if (!folder.exists())
                folder.mkdirs();

            for (MultipartFile mfile : files) {
                String originalFileName = mfile.getOriginalFilename();
                if (!originalFileName.isEmpty()) {
                    String saveFileName = UUID.randomUUID().toString()

                            + originalFileName.substring(originalFileName.lastIndexOf('.'));
                    logger.debug("원본 파일 이름 : {}, 실제 저장 파일 이름 : {}", mfile.getOriginalFilename(), saveFileName);

                    File saveFile = new File(folder, saveFileName);
                    mfile.transferTo(saveFile);

                    File thumbnailFile = new File(saveFolder, "s_" + saveFileName);
                    BufferedImage bo_img = ImageIO.read(saveFile);
                    double ratio = 3;
                    int width = (int) (bo_img.getWidth() / ratio);
                    int height = (int) (bo_img.getHeight() / ratio);

                    Thumbnails.of(saveFile).size(width, height).toFile(thumbnailFile);
//                    file 저장
                    imgSrcList.add(saveFileName);
//                    boardService.regist();
//                    boardService.saveFile();
//                      아휴 그냥 이미지 하나만 올릴 수 있게 할까?;;
                }
            }
            boardService.registFile(registedBoard, imgSrcList);
        }
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
    public ResponseEntity<CommonResp> downloadRoutine(@RequestBody BoardReqDto board){

        // board에 포함된 routine_id 추출

        // routine_in_user에 추가

        // 해당 게시글의 downloads 증가

        return new ResponseEntity<CommonResp>(HttpStatus.OK);
    }

    @PostMapping("/{boardId}/likes")
    @ApiOperation(value = "좋아요 누르기", notes = "게시글 ID의 좋아요 클릭시 게시글의 좋아요 수가 증가한다.", response = BoardRespDto.class)
    public ResponseEntity<BoardRespDto> clickLike(@PathVariable("boardId") long boardId){
        return new ResponseEntity<BoardRespDto>(boardService.increaseLike(boardId), HttpStatus.OK);
    }

    @PostMapping("/{boardId}/{replyId}/add")
    @ApiOperation(value = "그룹원 추가", notes = "해당 댓글의 회원을 그룹원에 추가한다.", response = Boolean.class)
    public ResponseEntity<Boolean> addToGroup(@RequestBody @ApiParam(value = "댓글 정보", required = true) GroupMemberReqDto groupMember) throws Exception {
        logger.info("Called addToGroup. ");
        groupMemberService.addGroupMember(groupMember);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @PostMapping("/{boardId}/{replyId}/delete")
    @ApiOperation(value = "그룹원 제외", notes = "해당 댓글의 회원을 그룹원에서 제외한다.", response = Boolean.class)
    public ResponseEntity<Boolean> deleteFromGroup(@RequestBody @ApiParam(value = "댓글 정보", required = true) GroupMemberReqDto groupMember) throws Exception {
        logger.info("Called deleteFromGroup. ");
        groupMemberService.deleteGroupMember(groupMember);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

}

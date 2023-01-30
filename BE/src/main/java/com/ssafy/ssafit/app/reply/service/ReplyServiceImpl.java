package com.ssafy.ssafit.app.reply.service;

import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.reply.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyServiceImpl implements ReplyService{

    private ReplyRepository replyRepository;

    @Autowired
    public ReplyServiceImpl(ReplyRepository replyRepository) {
        this.replyRepository = replyRepository;
    }

    @Override
    public void regist(Reply reply) {
        replyRepository.save(reply);
    }

    @Override
    public List<Reply> getListByBoardId(long boardId) {
        return replyRepository.findByBoard_Id(boardId); // 해당 게시글에 댓글 없으면 null 반환 ?
    }

    @Override
    public void modify(Reply reply) {

    }

    @Override
    public void delete(long replyId) {
        replyRepository.deleteById(replyId);
    }

    @Override
    public void deleteByBoardId(long boardId) {
//        boardId에 해당하는 모든 댓글 삭제?

    }
}

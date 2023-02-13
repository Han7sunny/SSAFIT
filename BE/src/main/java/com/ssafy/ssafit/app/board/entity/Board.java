package com.ssafy.ssafit.app.board.entity;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.notification.entity.Notification;
import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.routine.entity.Routine;
import com.ssafy.ssafit.app.user.dto.resp.UserMyPageRespDto;
import com.ssafy.ssafit.app.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder

public class Board {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
//    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "`group_id`")
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id")
    private Routine routine;

    @Builder.Default
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
//    @OneToMany(mappedBy = "board", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true) // 07:14pm reply에서
    private List<Reply> replyList = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Notification> notificationList = new ArrayList<>();

    private String title;

    private String content;

//    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime registeredTime;

//    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedTime;

    private int hits;

    private int likes;

    private int downloads;

    private boolean sharePost;

    public Board(BoardReqDto boardReqDto){
        this.title = boardReqDto.getTitle();
        this.content = boardReqDto.getContent();
        this.sharePost = boardReqDto.isSharePost();
    }

}

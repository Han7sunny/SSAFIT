package com.ssafy.ssafit.app.board.entity;

import com.ssafy.ssafit.app.reply.entity.Reply;
import com.ssafy.ssafit.app.user.entity.User;
import lombok.*;

import javax.persistence.*;
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

    @Builder.Default
    @OneToMany(mappedBy = "board", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Reply> replyList = new ArrayList<>();

    private String title;

    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date registered_time;

    @Temporal(TemporalType.TIMESTAMP)
    private Date modified_time;

    private int hits;

    private int likes;

    private int downloads;

    private boolean share;

}

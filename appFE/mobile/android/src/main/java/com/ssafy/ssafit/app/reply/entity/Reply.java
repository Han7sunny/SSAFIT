package com.ssafy.ssafit.app.reply.entity;

import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String content;

//    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime registeredTime;

//    @Temporal(TemporalType.TIMESTAMP)
//    private Date modified_time;

}

package com.ssafy.ssafit.app.notification.entity;

import com.ssafy.ssafit.app.board.entity.Board;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String message;

    private int notification_type; // 0은 그룹 시작, 종료 알림 & 1은 댓글 작성 알림 & 2는 운동 안했을 경우 알림

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "record_id")
    private Record record;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Builder
    public Notification(Long id, User user, String message, int notification_type, Group group, Record record, Board board) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.notification_type = notification_type;
        this.group = group;
        this.record = record;
        this.board = board;
    }
}

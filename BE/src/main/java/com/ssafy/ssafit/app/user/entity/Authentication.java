package com.ssafy.ssafit.app.user.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class Authentication {

    @Id @Column(length = 45, name = "authentication_id", nullable = false)
    private String id;

    @Column(length = 5, nullable = false)
    private String code;

    @Column(name = "expire_time")
    private LocalDateTime expireTime;

    @Builder
    public Authentication(String id, String code, LocalDateTime expireTime) {
        this.id = id;
        this.code = code;
        this.expireTime = expireTime.plusMinutes(5);
    }
}

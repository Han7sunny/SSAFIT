package com.ssafy.ssafit.app.user.entity;

import com.ssafy.ssafit.app.exercise.entity.Exercise;
import com.ssafy.ssafit.app.record.entity.Record;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class User {

    @Id  @Column(length = 20, name = "user_id", nullable = false)
    private String id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 64, nullable = false)
    private String password;

    @Column(length = 40, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String photo;

    @Column(columnDefinition = "MEDIUMTEXT", nullable = false)
    private String photo_encoding;

    @Column(nullable = false)
    private boolean on_off;

    @OneToMany(mappedBy = "user")
    private List<Record> record;

    @Builder
    public User(String id, String name, String password, String email, String photo, String photo_encoding, boolean on_off) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.photo = photo;
        this.photo_encoding = photo_encoding;
        this.on_off = on_off;
    }
}
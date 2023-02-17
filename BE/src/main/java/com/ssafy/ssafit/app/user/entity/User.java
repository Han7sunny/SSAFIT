package com.ssafy.ssafit.app.user.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.ssafit.app.notification.entity.Notification;
import com.ssafy.ssafit.app.record.entity.Record;
import com.ssafy.ssafit.app.user.dto.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Builder
public class User {

    @Id  @Column(length = 20, name = "user_id", nullable = false)
    private String id;

    @Column(length = 20, unique = true, nullable = false)
    private String name;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false) // length = 64,
    private String password;

    @Column(length = 40, nullable = false)
    private String email;

//    @Column(length = 100, nullable = false, columnDefinition = "MEDIUMTEXT")
    @Column(length = 100, nullable = true, columnDefinition = "MEDIUMTEXT")
    private String photo;

//    @Column(columnDefinition = "MEDIUMTEXT", nullable = false)
    @Column(columnDefinition = "MEDIUMTEXT", nullable = true)
    private String photoEncoding;

    @Column(nullable = false)
    private boolean onOff;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

//    public void setRoles(List<Authority> role) {
//        this.roles = role;
//        role.forEach(o -> o.setUser(this));
//    }

    private long mileage;

    @Column(name = "challenge_record_time")
    private Long challengeRecordTime;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Record> record;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notification> notification;

    @Builder

    public User(String id, String name, String password, String email, String photo, String photoEncoding, boolean onOff, Role role, List<String> roles, long mileage, Long challengeRecordTime, List<Record> record, List<Notification> notification) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.photo = photo;
        this.photoEncoding = photoEncoding;
        this.onOff = onOff;
        this.role = role;
        this.roles = roles;
        this.mileage = mileage;
        this.challengeRecordTime = challengeRecordTime;
        this.record = record;
        this.notification = notification;
    }
}

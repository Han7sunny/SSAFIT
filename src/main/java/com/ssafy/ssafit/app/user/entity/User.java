package com.ssafy.ssafit.app.user.entity;

<<<<<<< HEAD
=======
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.ssafit.app.user.dto.Role;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
>>>>>>> dev_kkw
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
<<<<<<< HEAD
@NoArgsConstructor(access= AccessLevel.PROTECTED)
=======
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@Builder
>>>>>>> dev_kkw
public class User {

    @Id  @Column(length = 20, name = "user_id", nullable = false)
    private String id;

<<<<<<< HEAD
    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 64, nullable = false)
=======
    @Column(length = 20, unique = true, nullable = false)
    private String name;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false) // length = 64,
>>>>>>> dev_kkw
    private String password;

    @Column(length = 40, nullable = false)
    private String email;

<<<<<<< HEAD
    @Column(length = 100, nullable = false)
=======
    @Column(length = 100, nullable = false, columnDefinition = "MEDIUMTEXT")
>>>>>>> dev_kkw
    private String photo;

    @Column(columnDefinition = "MEDIUMTEXT", nullable = false)
    private String photo_encoding;

    @Column(nullable = false)
    private boolean on_off;

<<<<<<< HEAD
    @OneToMany(mappedBy = "user")
=======
//    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
//    @Builder.Default
//    private List<Authority> roles = new ArrayList<>();

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
>>>>>>> dev_kkw
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
<<<<<<< HEAD
}
=======
}
>>>>>>> dev_kkw

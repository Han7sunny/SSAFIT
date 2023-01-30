package com.ssafy.ssafit.app.user.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.ssafit.app.user.dto.Role;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
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

    @Column(length = 100, nullable = false, columnDefinition = "MEDIUMTEXT")
    private String photo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String photo_encoding;

    @Column(nullable = false)
    private boolean on_off;

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

}

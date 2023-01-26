package com.ssafy.ssafit.app.user.repository;

import com.ssafy.ssafit.app.user.entity.Authentication;
import com.ssafy.ssafit.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepository extends JpaRepository<Authentication, String> {
}

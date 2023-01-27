package com.ssafy.ssafit.app.user.repository;

import com.ssafy.ssafit.app.user.entity.Authentication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface AuthenticationRepository extends JpaRepository<Authentication, String> {
    boolean existsByIdAndCodeAndExpireTimeGreaterThanEqual(String id, String code, LocalDateTime now);
}

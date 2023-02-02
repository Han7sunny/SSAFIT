package com.ssafy.ssafit.app.user.repository;

import com.ssafy.ssafit.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

    
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, String> {

    User findByIdAndPassword(String id, String password);
    User findByEmail(String email);
    
    boolean existsByName(String name);

    boolean existsByEmail(String email);

    boolean existsByIdAndEmail(String id, String email);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.password = :password where u.user_id = :id", nativeQuery = true)
    void updatePassword(@Param("id") String id, @Param("password") String password);
}

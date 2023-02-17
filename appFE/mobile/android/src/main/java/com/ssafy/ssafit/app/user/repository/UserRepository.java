package com.ssafy.ssafit.app.user.repository;

import com.ssafy.ssafit.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

    
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {

    User findByIdAndPassword(String id, String password);
    User findByEmail(String email);

    List<User> findAllByNameContaining(String name);

    boolean existsByName(String name);

    boolean existsByEmail(String email);

    boolean existsByIdAndEmail(String id, String email);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.password = :password where u.user_id = :id", nativeQuery = true)
    void updatePassword(@Param("id") String id, @Param("password") String password);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.mileage = :mileage + :mileage2 where u.user_id = :id", nativeQuery = true)
    void updateMileage(@Param("id") String id, @Param("mileage") long mileage, @Param("mileage2") Long mileage2);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.on_off = :b where u.user_id = :id", nativeQuery = true)
    void updateOnOff(@Param("id") String id, @Param("b") boolean b);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.photo = :photo, u.photo_encoding = :encValue where u.user_id = :id", nativeQuery = true)
    void updatePhotoAndPhotoEncoding(@Param("photo") String path, @Param("encValue") String encValue, @Param("id") String id);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.challenge_record_time = :time where u.user_id = :id", nativeQuery = true)
    void updateChallengeTime(@Param("id") String id, @Param("time") long time);
}

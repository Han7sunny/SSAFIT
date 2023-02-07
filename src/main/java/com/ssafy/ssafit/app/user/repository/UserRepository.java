package com.ssafy.ssafit.app.user.repository;

import com.ssafy.ssafit.app.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
=======

    
>>>>>>> dev_kkw
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, String> {

<<<<<<< HEAD
=======
    User findByIdAndPassword(String id, String password);
    User findByEmail(String email);
    
>>>>>>> dev_kkw
    boolean existsByName(String name);

    boolean existsByEmail(String email);

    boolean existsByIdAndEmail(String id, String email);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.password = :password where u.user_id = :id", nativeQuery = true)
    void updatePassword(@Param("id") String id, @Param("password") String password);
<<<<<<< HEAD
=======

    @Transactional
    @Modifying
    @Query(value = "update user u set u.mileage = :mileage + :mileage2 where u.user_id = :id", nativeQuery = true)
    void updateMileage(@Param("id") String id, @Param("mileage") long mileage, @Param("mileage2") Long mileage2);

    @Transactional
    @Modifying
    @Query(value = "update user u set u.on_off = :b where u.user_id = :id", nativeQuery = true)
    void updateOnOff(@Param("id") String id, @Param("b") boolean b);
>>>>>>> dev_kkw
}

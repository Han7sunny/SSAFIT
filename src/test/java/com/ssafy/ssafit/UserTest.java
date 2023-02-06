package com.ssafy.ssafit;

import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserTest {

    @Autowired
    UserRepository userRepository;

    @BeforeEach
    @Test
    void join(){

        User user = User.builder().id("admin").password("admin").name("admin").email("test@test").photo("photo_path").photoEncoding("photo_encoding").onOff(false).build();
        userRepository.save(user);

        User joinedUser = userRepository.findById("admin").get();
        Assertions.assertThat(joinedUser.getId()).isEqualTo(user.getId());
    }

    @Test
    void findId(){
        String email = "test1@test1.com";
        User result = userRepository.findByEmail(email);
        Assertions.assertThat(result).isNotNull();
    }
}

package com.ssafy.ssafit.app.user.service;

import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import com.ssafy.ssafit.app.user.entity.User;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username){
        User user = userRepository.findById(username).orElseThrow(
                () -> new UsernameNotFoundException("Invalid authentication!")
        );
        return new CustomUserDetails(user);
    }
}

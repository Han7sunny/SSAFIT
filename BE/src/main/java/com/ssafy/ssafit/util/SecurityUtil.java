package com.ssafy.ssafit.util;

import com.ssafy.ssafit.app.board.controller.BoardController;
import com.ssafy.ssafit.app.user.dto.CustomUserDetails;
import com.ssafy.ssafit.app.user.dto.resp.UserInfoResp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.util.Optional;

public class SecurityUtil {

    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    public static Optional<UserInfoResp> getCurrentUserId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            logger.info("Security Context에 인증 정보가 없습니다.");
            return Optional.empty();
        }

        UserInfoResp user = new UserInfoResp();
        if (authentication.getPrincipal() instanceof UserDetails) {
            CustomUserDetails customerUser = (CustomUserDetails) authentication.getPrincipal();
            user.setUserId(customerUser.getUsername());
            user.setUserName(customerUser.getUser().getName());
        }
        return Optional.ofNullable(user);
    }
}

package com.ssafy.ssafit.app.notification.service;

import org.springframework.stereotype.Service;

@Service
public interface NotificationService {
    void deleteNotification(Long id);
}

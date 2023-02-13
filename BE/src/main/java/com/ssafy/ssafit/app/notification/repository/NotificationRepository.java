package com.ssafy.ssafit.app.notification.repository;

import com.ssafy.ssafit.app.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser_Id(String userId);
}

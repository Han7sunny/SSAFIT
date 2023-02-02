package com.ssafy.ssafit.util;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private static JavaMailSender javaMailSender;

    @Autowired
    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendMail(String subject, String email, String content) {

        ArrayList<String> toUserList = new ArrayList<>();

        toUserList.add(email);

        int toUserSize = toUserList.size();

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));

        mailMessage.setSubject(subject);

        mailMessage.setText(content);

        javaMailSender.send(mailMessage);

    }
}

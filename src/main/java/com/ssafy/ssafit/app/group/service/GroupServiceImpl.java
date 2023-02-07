package com.ssafy.ssafit.app.group.service;

import com.ssafy.ssafit.app.group.dto.resp.GroupRespDto;
import com.ssafy.ssafit.app.group.entity.Group;
import com.ssafy.ssafit.app.group.entity.GroupMember;
import com.ssafy.ssafit.app.group.repository.GroupMemberRepository;
import com.ssafy.ssafit.app.group.repository.GroupRepository;
import com.ssafy.ssafit.app.notification.entity.Notification;
import com.ssafy.ssafit.app.notification.repository.NotificationRepository;
import com.ssafy.ssafit.app.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
public class GroupServiceImpl implements GroupService{

    private GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Autowired
    public GroupServiceImpl(GroupRepository groupRepository,
                            GroupMemberRepository groupMemberRepository,
                            NotificationRepository notificationRepository,
                            UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.groupMemberRepository = groupMemberRepository;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public long regist(Group group) {
        return groupRepository.save(group).getId();
    }

    @Override
    public GroupRespDto view(long groupId) {
        Optional<Group> getGroup = groupRepository.findById(groupId);
        if(getGroup.isEmpty()) {
            return GroupRespDto.builder().success(false).msg("해당 그룹을 찾을 수 없습니다.").build();
        }
        return new GroupRespDto(getGroup.get());
    }

    @Scheduled(cron = "10 0 0 1/1 * ?", zone = "Asia/Seoul")
    public void findStartGroup() {
        List<Group> groupList = groupRepository.findByStartDate(LocalDate.now(ZoneId.of("Asia/Seoul")));
        makeGroupNotificationMessage("시작", groupList);
    }

    @Scheduled(cron = "0 0 0 1/1 * ?", zone = "Asia/Seoul")
    public void findEndGroup() {
        List<Group> groupList = groupRepository.findByEndDate(LocalDate.now(ZoneId.of("Asia/Seoul")).minusDays(1));
        makeGroupNotificationMessage("종료", groupList);
    }

    @Transactional
    public void makeGroupNotificationMessage(String se, List<Group> groupList) {

        for (Group group : groupList) {
            List<GroupMember> groupMemberList = groupMemberRepository.findByGroup_Id(group.getId());

            for(GroupMember groupMember : groupMemberList) {
                Notification notification = Notification.builder()
                        .group(group)
                        .user(groupMember.getUser())
                        .message(group.getGroupName() + " 그룹이 " + se + "되었습니다.")
                        .notification_type(0)
                        .build();

                notificationRepository.save(notification);
            }
        }
    }
}

package com.ssafy.ssafit.mirror.dto.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MirrorChallengeTimeRespDto {

    private long myRecordTime;
    private List<RankInfo> rankInfoList;
    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RankInfo {
        private String userName;
        private long recordTime;
    }
}

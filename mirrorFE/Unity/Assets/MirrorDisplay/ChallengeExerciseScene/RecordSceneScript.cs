using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.SceneManagement;
using Unity.VisualScripting.Antlr3.Runtime;
using UnityEngine.Networking;
using UnityEngine.Profiling;
using System;

public class RecordSceneScript : MonoBehaviour
{
    [Serializable]
    public class RankingInfo
    {
        public long myRecordTime;
        public RankList[] rankInfoList;
    }

    [Serializable]
    public class RankList
    {
        public string userName;
        public long recordTime;
    }
    public TMP_Text ID;
    public TMP_Text Record;
    public TMP_Text Ranking;
    private string token;

    // Start is called before the first frame update
    void Start()
    {
        token = GameManager.Instance.user.accessToken;
        ID.text = GameManager.Instance.user.userName + " 님의 이번 기록!!";
        Debug.Log(PlayerPrefs.GetString("MyRecord"));
        Record.text = PlayerPrefs.GetString("MyRecord");

        //내 기록 API POST -> 종합순위 API GET 후에 Ranking 채우기
        long time = long.Parse(PlayerPrefs.GetString("H")) * 3600 + long.Parse(PlayerPrefs.GetString("M")) * 60 + long.Parse(PlayerPrefs.GetString("S"));
        Debug.Log(time);
        StartCoroutine(updateTime("update-challenge-time?time=" + time, "PUT"));
        StartCoroutine(getRankList("get-challenge-time", "GET"));
    }
    IEnumerator updateTime(string url, string method)
    {
        string sendURL = $"{PlayerPrefs.GetString("baseUrl")}/{url}";

        var uwr = new UnityWebRequest(sendURL, method);

        uwr.downloadHandler = new DownloadHandlerBuffer();

        uwr.SetRequestHeader("Content-Type", "application/json");
        uwr.SetRequestHeader("Authorization", "Bearer " + token);
        uwr.SetRequestHeader("X-AUTH-TOKEN", token);

        yield return uwr.SendWebRequest();

        if (uwr.isNetworkError || uwr.isHttpError)
        {
            Debug.Log(uwr.error);
        }

        else
        {
            string str = uwr.downloadHandler.text;

            Debug.Log(uwr.downloadHandler.text);
        }
    }
    // Update is called once per frame

    IEnumerator getRankList(string url, string method)
    {
        string sendURL = $"{PlayerPrefs.GetString("baseUrl")}/{url}";

        var uwr = new UnityWebRequest(sendURL, method);

        uwr.downloadHandler = new DownloadHandlerBuffer();

        uwr.SetRequestHeader("Content-Type", "application/json");
        uwr.SetRequestHeader("Authorization", "Bearer " + token);
        uwr.SetRequestHeader("X-AUTH-TOKEN", token);

        yield return uwr.SendWebRequest();

        if (uwr.isNetworkError || uwr.isHttpError)
        {
            Debug.Log(uwr.error);
        }

        else
        {
            string str = uwr.downloadHandler.text;

            Debug.Log(uwr.downloadHandler.text);

            RankingInfo rankingInfo = JsonUtility.FromJson<RankingInfo>(str);

            Ranking.text = "";


            long idx = 1;
            foreach (RankList rankList in rankingInfo.rankInfoList)
            {
                Ranking.text += idx + "위 " + rankList.userName + "님 " + rankList.recordTime / 3600 + "시간 " + (rankList.recordTime % 3600) / 60 + "분 " + ((rankList.recordTime % 3600) % 60) + "초\n";
                idx++;
            }
        }
    }

    public void Enter()
    {
        SceneManager.LoadScene("MainMenuScene");
    }
    void Update()
    {
        if (Input.GetKeyUp(KeyCode.Return)) Enter();
    }
}
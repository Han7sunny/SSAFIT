using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
using static ChoiceRoutineScene;

public class StartBasicRoutine : MonoBehaviour // 예약한 루틴이 없어서 기본 루틴 3개 중에 하나를 실행하는 경우 (recordId가 음수인 경우 기본 루틴을 실행하는 경우이다.)
{
    [Serializable]
    public class StartBasicRoutineInfo // 레코드를 생성하기 위한 클래스
    {
        public long routineId;

        public StartBasicRoutineInfo()
        {

        }

        public StartBasicRoutineInfo(long routineId)
        {
            this.routineId = routineId;
        }
    }


    public long recordId; // 생성된 레코드의 id값을 저장함

    [Serializable]
    public class RecordInfo // 레코드를 생성하기 위한 클래스
    {
        public string success;
        public string msg;
        public long recordId;
        public long routineId;
        public string routineName;
        public RecordDetailInfo[] recordDetailInfoList;
    }

    [Serializable]
    public class RecordDetailInfo
    {
        public long recordDetailId;
        public long exerciseId;
        public long exerciseTypeId;
        public string exerciseTypeName;
        public string exerciseArea;
        public long exerciseSet;
        public long reps;
        public long restTimeMinutes;
        public long restTimeSeconds;
        public string name;
    }



    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(startBasicRoutine("start-basic-routine", "POST", new StartBasicRoutineInfo((long)2))); // 2는 임시로 넣은 숫자 (routineId)
    }
    IEnumerator startBasicRoutine(string url, string method, object o)
    {
        string sendURL = $"{PlayerPrefs.GetString("baseUrl")}/{url}";

        byte[] jsonBytes = null;
        if (o != null)
        {
            string jsonStr = JsonUtility.ToJson(o);
            jsonBytes = Encoding.UTF8.GetBytes(jsonStr);
        }


        var uwr = new UnityWebRequest(sendURL, method);

        uwr.uploadHandler = new UploadHandlerRaw(jsonBytes);
        uwr.downloadHandler = new DownloadHandlerBuffer();

        uwr.SetRequestHeader("Content-Type", "application/json");
        uwr.SetRequestHeader("Authorization", "Bearer " + PlayerPrefs.GetString("accessToken"));
        uwr.SetRequestHeader("X-AUTH-TOKEN", PlayerPrefs.GetString("accessToken"));

        yield return uwr.SendWebRequest();

        if (uwr.isNetworkError || uwr.isHttpError)
        {
            Debug.Log(uwr.error);
        }

        else
        {
            string str = uwr.downloadHandler.text;

            Debug.Log(uwr.downloadHandler.text);

            long recordId = long.Parse(str);

            StartCoroutine(getRecordInfo("get-record-info/" + recordId, "GET"));
        }
    }

    IEnumerator getRecordInfo(string url, string method)
    {
        string sendURL = $"{PlayerPrefs.GetString("baseUrl")}/{url}";

        var uwr = new UnityWebRequest(sendURL, method);

        uwr.downloadHandler = new DownloadHandlerBuffer();

        uwr.SetRequestHeader("Content-Type", "application/json");
        uwr.SetRequestHeader("Authorization", "Bearer " + PlayerPrefs.GetString("accessToken"));
        uwr.SetRequestHeader("X-AUTH-TOKEN", PlayerPrefs.GetString("accessToken"));

        yield return uwr.SendWebRequest();

        if (uwr.isNetworkError || uwr.isHttpError)
        {
            Debug.Log(uwr.error);
        }

        else
        {
            string str = uwr.downloadHandler.text;

            Debug.Log(uwr.downloadHandler.text);

            RecordInfo recordInfo = JsonUtility.FromJson<RecordInfo>(str);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

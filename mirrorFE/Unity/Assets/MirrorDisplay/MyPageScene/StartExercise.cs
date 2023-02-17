using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using static ChoiceRoutineScene;
using UnityEngine.Networking;
using System.Text;
using System;
using UnityEngine.Profiling;

public class StartExercise : MonoBehaviour // 예약한 운동 루틴을 시작할 때 실행하는 httpRequest
{

    public long recordId;

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
    public class RecordDetailInfo // 레코드를 생성하기 위한 클래스
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

    [Serializable]
    public class StartExerciseInfo
    {
        public long recordId;

        public StartExerciseInfo()
        {
            
        }

        public StartExerciseInfo(long recordId)
        {
            this.recordId = recordId;
        }
    }



    // Start is called before the first frame update
    void Start()
    {
        recordId = 113; // 임시 레코드 번호
        StartCoroutine(startExercise("start-exercise", "POST", new StartExerciseInfo(recordId)));
    }

    IEnumerator startExercise(string url, string method, object o)
    {
        string sendURL = $"{PlayerPrefs.GetString("baseUrl")}/{url}";

        byte[] jsonBytes = null;
        if(o != null)
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

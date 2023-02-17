using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
using static StartBasicRoutine;

public class EndExercise : MonoBehaviour
{
    [Serializable]
    public class EndExerciseInfo // 운동 종료시 보내는 요청
    {
        public long mileage;
        public long recordId;
        public EndExerciseInfo()
        {
        }
        public EndExerciseInfo(long mileage, long recordId)
        {
            this.mileage = mileage;
            this.recordId = recordId;
        }
    }

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(endExercise("end-exercise", "POST", new EndExerciseInfo(1000, 119)));
    }
    IEnumerator endExercise(string url, string method, object o)
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
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

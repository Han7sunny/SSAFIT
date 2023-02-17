using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using static EndExercise;
using UnityEngine.Networking;

public class StartOutOfRoutine : MonoBehaviour
{
    [Serializable]
    public class OutOfRoutineInfo // 레코드를 생성하기 위한 클래스
    {
        public long exerciseTypeId;

        public OutOfRoutineInfo()
        {

        }

        public OutOfRoutineInfo(long exerciseTypeId)
        {
            this.exerciseTypeId = exerciseTypeId;
        }
    }
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(startOutOfRoutine("start-out-of-routine", "POST", new OutOfRoutineInfo(1))); // 시작하는 운동의 ExerciseTypeId, 3은 임시로 넣은 숫자
    }
    IEnumerator startOutOfRoutine(string url, string method, object o)
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

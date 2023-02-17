using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using static StartOutOfRoutine;
using UnityEngine.Networking;

public class UpdateRecord : MonoBehaviour
{
    [Serializable]
    public class UpdateRecordInfo // 운동 하나 종료 시 카운트 업데이트 하는 요청
    {
        public long count;
        public long recordDetailId;
        public UpdateRecordInfo()
        {
        }
        public UpdateRecordInfo(long count, long recordDetailId)
        {
            this.count = count;
            this.recordDetailId = recordDetailId;
        }
    }
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(updateRecord("update-record", "POST", new UpdateRecordInfo(100, 180))); // 시작하는 운동의 ExerciseTypeId, 3은 임시로 넣은 숫자
    }
    IEnumerator updateRecord(string url, string method, object o)
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

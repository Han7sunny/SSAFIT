using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
using TMPro;
using UnityEngine.SceneManagement;

public class ExerciseResultScript : MonoBehaviour
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
    private long set = GameManager.Instance.exerciseInfo.exerciseSet;
    private long reps = GameManager.Instance.exerciseInfo.reps;
    public TMP_Text Now;
    public TMP_Text Goal;
    public TMP_Text Next;
    public TMP_Text RestTime;
    
    private float restTime;
    private string token;
    private bool flag;
    float min, sec;
    // Start is called before the first frame update
    void Start()
    {
        flag = false;
        token = GameManager.Instance.user.accessToken;
        min = GameManager.Instance.exerciseInfo.restTimeMinutes;
        sec = GameManager.Instance.exerciseInfo.restTimeSeconds;
        if(GameManager.Instance.IsSkip)
        {
            min = 0;
            sec = 10;
        }
        Goal.text = "목표 : " + set + "세트 * " + reps + "회 / 총 " + set * reps + "회";
        Now.text = GameManager.Instance.exerciseInfo.exerciseTypeName + "    " + GameManager.Instance.totalCnt.ToString() + "회 완료";
        RestTime.text = (min < 10 ? "0" : "") + ((int)min).ToString() + ":" + (sec < 10 ? "0" : "") + ((int)sec).ToString();
        if (GameManager.Instance.exerciseBox.exerciseData.Count > 0 && !GameManager.Instance.IsSkip)
            Next.text = "다음 운동 : " + GameManager.Instance.exerciseBox.exerciseData.Peek().exerciseTypeName;

        else
            Next.text = "운동이 완료되었습니다.";
            
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

            if (GameManager.Instance.exerciseBox.exerciseData.Count == 0 || GameManager.Instance.IsSkip)
            {
                StartCoroutine(endExercise("end-exercise", "POST", new EndExerciseInfo(500, GameManager.Instance.exerciseBox.recordId)));
            }                
            else if(GameManager.Instance.exerciseBox.exerciseData.Count > 0 && !GameManager.Instance.IsSkip)
                SceneManager.LoadScene("ChangeExerciseScene");

        }
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
            SceneManager.LoadScene("MainMenuScene");
        }
    }

    // Update is called once per frame
    void Update()
    {
        //restTime -= Time.deltaTime;
        //if (restTime < 0 && !flag)
        //{
        //    flag = true;
        //    StartCoroutine(updateRecord("update-record", "POST", new UpdateRecordInfo(GameManager.Instance.totalCnt, GameManager.Instance.exerciseInfo.recordDetailId)));
        //}
        sec -= Time.deltaTime;
        if(sec <= 0 && min > 0)
        {
            min--;
            sec = 59;
        }
        else if(sec <= 0 && min <= 0 ) {
            flag = true;
            StartCoroutine(updateRecord("update-record", "POST", new UpdateRecordInfo(GameManager.Instance.totalCnt, GameManager.Instance.exerciseInfo.recordDetailId)));
        }

        RestTime.text = (min < 10 ? "0" : "" ) + ((int)min).ToString() + ":" + (sec < 10 ? "0" : "") + ((int)sec).ToString();


    }
}

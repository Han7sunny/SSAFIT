using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using System;
using UnityEngine.XR;
using TMPro;
using System.Text;
using UnityEngine.Profiling;
using UnityEngine.Analytics;

public class ChoiceRoutineScene : MonoBehaviour
{
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
    public class Routine
    {
        public long recordId;
        public long routineId;
        public string routineName;
        public string[] exerciseName;

        public void printContent()
        {
            Debug.Log("���ڵ� ���̵� : " + this.recordId);
            Debug.Log("��ƾ ���̵� : " + this.routineId);
            Debug.Log("��ƾ �̸� : " + this.routineName);
            foreach (String s in this.exerciseName) { 
                Debug.Log("� ��� : " + s);
            }
        }
    }
    
    [Serializable]
    public class RoutineList
    {
        public Routine[] items;
    }

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

    [Serializable]
    public class StartExerciseInfo // 루틴의 상세 정보를 요청하기 위한 클래스
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
    string token;
    public GameObject ChoiceRoutineButton;
    public RectTransform Content;
    public int focusIdx = 0;
    string[] SceneName = { "", "", "", "" };
    public int N;
    private bool isScroll = false;
    RoutineList routineList;

    // Start is called before the first frame update
    void Start()
    {
        token = GameManager.Instance.user.accessToken;
        StartCoroutine(getSchedule("get-schedule", "GET"));
        

    }

    public void CreateBtn(string Text, string[] List)
    {
        N++;
        GameObject button = Instantiate(ChoiceRoutineButton);
        RectTransform btnpos = button.GetComponent<RectTransform>();
        btnpos.SetParent(gameObject.transform);
        button.GetComponent<ButtonContent>().SetRoutineName(Text);
        foreach (string Exercise in List)
        {
            button.GetComponent<ButtonContent>().AddExercise(Exercise);
        }


    }

    public void Right()
    {
        if (!isScroll && focusIdx < N-1)
        {
            focusIdx++;
            isScroll = true;
            StartCoroutine(Scroll(Content.localPosition.x - 360f));
        }
        GameObject.Find("Description").GetComponent<TMP_Text>().text = $"{focusIdx + 1} / {N}";

    }
    public void Left()
    {
        if (!isScroll && focusIdx > 0)
        {
            focusIdx--;
            isScroll = true;
            StartCoroutine(Scroll(Content.localPosition.x + 360f));
        }
        GameObject.Find("Description").GetComponent<TMP_Text>().text = $"{focusIdx + 1} / {N}";
    }
    public void Enter()
    {
        long recordId = routineList.items[focusIdx].recordId;
        if (recordId > 0)
            StartCoroutine(startExercise("start-exercise", "POST", new StartExerciseInfo(recordId)));
        else
        {
            long routineId = routineList.items[focusIdx].routineId;
            StartCoroutine(startBasicRoutine("start-basic-routine", "POST", new StartBasicRoutineInfo(routineId)));
        }
    }
    public void Back()
    {
        SceneManager.LoadScene("MainMenuScene");
    }
    IEnumerator Scroll(float movepos)
    {
        while (isScroll)
        {
            Content.localPosition = Vector2.Lerp(Content.localPosition, new Vector2(movepos, 0), Time.deltaTime * 50);
            if (Vector2.Distance(Content.localPosition, new Vector2(movepos, 0)) < 0.1f)
            {
                isScroll = false;
            }
            yield return null;
        }
    }

    IEnumerator getSchedule(string url, string method)
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

            string jsonArrayStr = "{\"items\" :" + str + "}";

            routineList = JsonUtility.FromJson<RoutineList>(jsonArrayStr);

            foreach (Routine rout in routineList.items)
            {
                CreateBtn(rout.routineName, rout.exerciseName);
                GameObject.Find("Description").GetComponent<TMP_Text>().text = $"{focusIdx + 1} / {N}";
            }
        }
    }

    IEnumerator startExercise(string url, string method, object o)
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

            long recordId = routineList.items[focusIdx].recordId;
            StartCoroutine(getRecordInfo("get-record-info/" + recordId, "GET"));
        }
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

            long recordId = long.Parse(str);

            StartCoroutine(getRecordInfo("get-record-info/" + recordId, "GET"));
        }
    }

    IEnumerator getRecordInfo(string url, string method)
    {
        string sendURL = $"{PlayerPrefs.GetString("baseUrl")}/{url}";

        Debug.Log(url);

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

            RecordInfo recordInfo = JsonUtility.FromJson<RecordInfo>(str);

            GameManager.Instance.exerciseBox = new GameManager.RecordInfo();

            GameManager.Instance.exerciseBox.recordId = recordInfo.recordId;

            foreach (RecordDetailInfo rdi in recordInfo.recordDetailInfoList)
            {
                GameManager.Instance.exerciseBox.exerciseData.Enqueue(
                    new GameManager.RecordDetailInfo(rdi.recordDetailId, rdi.exerciseTypeName, rdi.exerciseArea, rdi.exerciseSet, rdi.reps, rdi.restTimeMinutes, rdi.restTimeSeconds)
                );
            }

            SceneManager.LoadScene("ChangeExerciseScene");
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Return))
        {
            Enter();
        }
        if (Input.GetKeyDown(KeyCode.Backspace))
        {
            Back();
        }
        if (Input.GetKeyDown(KeyCode.RightArrow)) Right();
        if (Input.GetKeyDown(KeyCode.LeftArrow)) Left();
    }
}

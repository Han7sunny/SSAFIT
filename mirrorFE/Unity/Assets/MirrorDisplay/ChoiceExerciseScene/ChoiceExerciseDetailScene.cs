using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using System;
using System.Text;
using TMPro;
using static ChoiceExerciseScene;

public class ChoiceExerciseDetailScene : MonoBehaviour
{
    public GameObject ChoiceExerciseButton;
    public RectTransform Content;
    public int focusIdx = 0;
    public int N;
    private bool isScroll = false;
    ExerciseTypeList exerciseTypeList;
    string token;

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

    [Serializable]
    public class OutOfRoutineRespInfo // 운동 부위별 운동 목록
    {
        public long recordId;
        public long recordDetailId;
    }


    [Serializable]
    public class ExerciseTypeList // 운동 부위별 운동 목록
    {
        public ExerciseType[] items;
    }

    [Serializable]
    public class ExerciseType
    {
        public long exerciseTypeId;
        public string exerciseTypeName;
        public string exerciseArea;
    }


    // Start is called before the first frame update
    void Start()
    {
        GameManager.Instance.exerciseBox = new GameManager.RecordInfo();
        token = GameManager.Instance.user.accessToken;
        GameObject.Find("Title").GetComponent<TMP_Text>().text = PlayerPrefs.GetString("DetailToView")+" 운동 목록";
        StartCoroutine(getExerciseType());

    }



    IEnumerator getExerciseType()
    {
        string sendURL = $"{PlayerPrefs.GetString("baseUrl")}/{"get-exercise-type?area=" + PlayerPrefs.GetString("DetailToView")}";

        var uwr = new UnityWebRequest(sendURL, "GET");

        uwr.downloadHandler = new DownloadHandlerBuffer();

        //       uwr.SetRequestHeader("Content-Type", "application/json");
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

            string jsonStr = "{\"items\" : " + str + "}";

            exerciseTypeList = JsonUtility.FromJson<ExerciseTypeList>(jsonStr);

            foreach (ExerciseType et in exerciseTypeList.items)
            {
                CreateBtn(et.exerciseTypeName);
            }
        }
        SetDescription();
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

            OutOfRoutineRespInfo outOfRoutineRespInfo = JsonUtility.FromJson<OutOfRoutineRespInfo>(str);

            GameManager.Instance.exerciseBox.recordId = outOfRoutineRespInfo.recordId;
            GameManager.Instance.exerciseBox.exerciseData.Enqueue(new GameManager.RecordDetailInfo(
                outOfRoutineRespInfo.recordDetailId, 
                exerciseTypeList.items[focusIdx].exerciseTypeName,
                exerciseTypeList.items[focusIdx].exerciseArea,
                long.MaxValue,
                long.MaxValue,
                long.MaxValue,
                long.MaxValue
                ));

            SceneManager.LoadScene("ChangeExerciseScene");
        }
    }

    public void CreateBtn(string name)
    {
        N++;
        GameObject button = Instantiate(ChoiceExerciseButton);
        RectTransform btnpos = button.GetComponent<RectTransform>();
        btnpos.SetParent(gameObject.transform);
        btnpos.GetChild(0).GetComponent<TMP_Text>().text = name;
        btnpos.GetChild(1).GetComponent<RawImage>().material = Resources.Load<Material>($"Icon_{name}");
    }

    public void Right()
    {
        if (!isScroll && focusIdx < N - 1)
        {
            focusIdx++;
            isScroll = true;
            StartCoroutine(Scroll(Content.localPosition.x - 360f));
            SetDescription();
        }

    }
    public void Left()
    {
        if (!isScroll && focusIdx > 0)
        {
            focusIdx--;
            isScroll = true;
            StartCoroutine(Scroll(Content.localPosition.x + 360f));
            SetDescription();
        }
    }
    public void Enter()
    {
        StartCoroutine(startOutOfRoutine("start-out-of-routine", "POST", new OutOfRoutineInfo(exerciseTypeList.items[focusIdx].exerciseTypeId)));     
    }
    public void Back()
    {
        SceneManager.LoadScene("ChoiceExerciseScene");
    }

    public void SetDescription()
    {
        GameObject.Find("Description").GetComponent<TMP_Text>().text = $"{focusIdx+1} / {N}";
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


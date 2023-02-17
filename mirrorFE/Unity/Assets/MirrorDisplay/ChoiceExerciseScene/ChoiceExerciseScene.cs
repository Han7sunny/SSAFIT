using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;
using System;
using System.Text;
using TMPro;

public class ChoiceExerciseScene : MonoBehaviour
{
    public GameObject ChoiceExerciseButton;
    public RectTransform Content;
    public int focusIdx = 0;
    string[] SceneName = { "", "", "", "" ,""};
    public int N;
    private bool isScroll = false;
    ExerciseArea exerciseArea;

    [Serializable]
    public class ExerciseArea
    {
        public String[] exerciseAreaList; // 운동 부위 목록
    }



    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(getExerciseArea("get-exercise-type-area", "GET"));


    }

    IEnumerator getExerciseArea(string url, string method)
    {
        string sendURL = $"{PlayerPrefs.GetString("baseUrl")}/{url}";

        var uwr = new UnityWebRequest(sendURL, method);

        uwr.downloadHandler = new DownloadHandlerBuffer();

 //       uwr.SetRequestHeader("Content-Type", "application/json");
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
            exerciseArea = JsonUtility.FromJson<ExerciseArea>(str);
            for  (int i=0; i<exerciseArea.exerciseAreaList.Length; ++i) {
                CreateBtn(exerciseArea.exerciseAreaList[i]);
            }
            
        }
        SetDescription();
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
        PlayerPrefs.SetString("DetailToView", exerciseArea.exerciseAreaList[focusIdx]);
        SceneManager.LoadScene("ChoiceExerciseDetailScene");
    }
    public void Back()
    {
        SceneManager.LoadScene("MainMenuScene");
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


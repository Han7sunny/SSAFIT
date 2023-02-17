using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using TMPro;

public class ChangeExercise_Script : MonoBehaviour
{
    public GameObject GameButton;
    public RectTransform Content;
    public string this_Exercise="";
    public int focusIdx = 0;
    public int N=1;
    public Material GameImage;
    private bool isScroll = false;


    // Start is called before the first frame update
    void Start()
    {
        GameManager.Instance.exerciseCnt = 0;
        GameManager.Instance.totalCnt = 0;
        GameManager.Instance.exerciseInfo = new GameManager.RecordDetailInfo(GameManager.Instance.exerciseBox.exerciseData.Dequeue());
        CreateBtn();
    }

    public void CreateBtn()
    {
        N++;
        GameObject button = Instantiate(GameButton);
        RectTransform btnpos = button.GetComponent<RectTransform>();
        btnpos.SetParent(gameObject.transform);
        btnpos.GetChild(1).GetComponent<Image>().material = GameImage;
    }

    public void Right()
    {
        if (!isScroll && focusIdx < N - 1)
        {
            focusIdx++;
            isScroll = true;
            GameObject.Find("Description").GetComponent<ChangeExercise_Description>().SetDescription(1);
            StartCoroutine(Scroll(Content.localPosition.x - 360f));
        }

    }
    public void Left()
    {
        if (!isScroll && focusIdx > 0)
        {
            focusIdx--;
            isScroll = true;
            GameObject.Find("Description").GetComponent<ChangeExercise_Description>().SetDescription(0);
            StartCoroutine(Scroll(Content.localPosition.x + 360f));
        }
    }

    public void Enter()
    {
        if (focusIdx == 0)
            SceneManager.LoadScene("NormalExerciseScene");

        else if (focusIdx == 1)
            SceneManager.LoadScene("ChallengeExerciseScene");
    }

    public void Back()
    {
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
        if (Input.GetKeyDown(KeyCode.Return)) Enter();
        if (Input.GetKeyUp(KeyCode.Backspace)) Back();
        if (Input.GetKeyDown(KeyCode.RightArrow)) Right();
        if (Input.GetKeyDown(KeyCode.LeftArrow)) Left();
    }

}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.Diagnostics;
using System.IO;

public class MainMenuScene : MonoBehaviour
{
    
    public GameObject MainButton;
    public RectTransform Content;
    public int focusIdx=0;
    string[] SceneName = { "ChoiceRoutineScene", "ChoiceExerciseScene", "ChallengeGameScene","MyPageScene","LogOutScene"};
    GameObject logOutPopUp;
    public int N = 5;
    private bool isScroll = false;


    // Start is called before the first frame update
    void Start()
    {

        PlayerPrefs.SetString("baseUrl", "http://i8a204.p.ssafy.io:8080/api/mirror");
        GameManager.Instance.IsSkip = false;
    }

    public void CreateBtn()
    {
        for (int i = 0; i < 3; ++i)
        {
            N++;
            GameObject button = Instantiate(MainButton);
            RectTransform btnpos = button.GetComponent<RectTransform>();
            btnpos.SetParent(gameObject.transform);
        }
    }

    public void Right()
    {
        if (!isScroll && focusIdx < N - 1) {
            focusIdx++;
            isScroll = true;
            StartCoroutine(Scroll(Content.localPosition.x - 360f));


        }
        
    }
    public void Left()
    {
        if (!isScroll && focusIdx > 0)
        {
            focusIdx--;
            isScroll = true;
            StartCoroutine(Scroll(Content.localPosition.x + 360f));
        }
    }
    public void Enter()
    {
        SceneManager.LoadScene(SceneName[focusIdx]);
    }

    IEnumerator Scroll(float movepos)
    {
        while (isScroll)
        {
            Content.localPosition = Vector2.Lerp(Content.localPosition, new Vector2(movepos, 0), Time.deltaTime * 50);
            if (Vector2.Distance(Content.localPosition, new Vector2(movepos,0)) < 0.1f)
            {
                isScroll = false;
            }
            yield return null;
        }
    }


    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Return) && SceneName[focusIdx]!="")
        {
            Enter();
        }
        if (Input.GetKeyDown(KeyCode.Backspace))
        {

            SceneManager.LoadScene("");
        }
        if (Input.GetKeyDown(KeyCode.RightArrow)) Right();
        if (Input.GetKeyDown(KeyCode.LeftArrow)) Left();

    }

}

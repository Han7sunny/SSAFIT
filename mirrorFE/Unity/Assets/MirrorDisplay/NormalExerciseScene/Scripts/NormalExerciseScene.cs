using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System;
using UnityEngine.SceneManagement;
using UnityEngine.SceneManagement;

public class NormalExerciseScene : MonoBehaviour
{
    public TMP_Text Exercise_name;
    public TMP_Text Goal_sets;
    public TMP_Text Now_count;
    public TMP_Text RestTime;
    private long reps;
    private long set;
    private long cnt;
    private long nowSet;
    GameObject PopUp;
    GameObject RestTimePopUp;
    public bool PopUpOn = false;
    float min, sec;
    public bool Rest = false;

    // Start is called before the first frame update
    void Start()
    {

        min = GameManager.Instance.exerciseInfo.restTimeMinutes;
        sec = GameManager.Instance.exerciseInfo.restTimeSeconds;

        GameManager.Instance.IsFinish = false;
        nowSet = 1;
        cnt = 0;
        reps = GameManager.Instance.exerciseInfo.reps;
        set = GameManager.Instance.exerciseInfo.exerciseSet;

        Exercise_name.text = GameManager.Instance.exerciseInfo.exerciseTypeName;
        Goal_sets.text = nowSet.ToString() + ((set == long.MaxValue) ? "" : " / " + set.ToString());
        Now_count.text = GameManager.Instance.exerciseCnt.ToString() + ((reps == long.MaxValue) ? "" : " / " + reps.ToString());

        RestTimePopUp = GameObject.Find("RestTimePopUp");
        RestTimePopUp.SetActive(false);
        PopUp = GameObject.Find("PopupCanvas 1");
        PopUp.SetActive(false);
       
    }

    // Update is called once per frame
    void Update()
    {
        if (Rest)
        {
            RestTimeCounter();
        }
        else
        {
            if (PopUpOn)
            {
                if (Input.GetKeyDown(KeyCode.Return))
                {
                    Enter();
                }
                if (Input.GetKeyDown(KeyCode.Backspace))
                {
                    Back();
                }
                return;
            }
            if (Input.GetKeyDown(KeyCode.Return))
            {
                GameManager.Instance.exerciseCnt++;
                GameManager.Instance.totalCnt++;
            }
            if (Input.GetKeyDown(KeyCode.Backspace))
            {
                Debug.Log("menuOn");
                ActivePopUp();
            }
            if (GameManager.Instance.exerciseCnt == reps && nowSet == set)
            {
                GameManager.Instance.IsFinish = true;
                SceneManager.LoadScene("ExerciseResult");
            }

            if (GameManager.Instance.exerciseCnt == reps)
            {
                GameManager.Instance.exerciseCnt = 0;
                Rest = true;
                RestTimePopUp.SetActive(true);
                nowSet++;
                Goal_sets.text = nowSet.ToString() + " / " + set.ToString();
                min = GameManager.Instance.exerciseInfo.restTimeMinutes;
                sec = GameManager.Instance.exerciseInfo.restTimeSeconds;
            }

            if (cnt != GameManager.Instance.exerciseCnt)
            {
                cnt = GameManager.Instance.exerciseCnt;
                Now_count.text = GameManager.Instance.exerciseCnt.ToString() + ((reps == long.MaxValue) ? "" : " / " + reps.ToString());
            }
        }
    }
    public void Enter()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene("ExerciseResult");
    }
    public void Back()
    {
        Time.timeScale = 1f;
        PopUp.SetActive(false);
        PopUpOn = false;
    }
    public void ActivePopUp()
    {      
        PopUpOn = true;
        PopUp.SetActive(true);
        Time.timeScale = 0;
    }
    void RestTimeCounter()
    {
       
        sec -= Time.deltaTime;
        if (sec <= 0 && min > 0)
        {
            min--;
            sec = 59;
        }
        else if (sec <= 0 && min <= 0)
        {
            Rest = false;
            RestTimePopUp.SetActive(false);
        }

        RestTime.text = (min < 10 ? "0" : "") + ((int)min).ToString() + ":" + (sec < 10 ? "0" : "") + ((int)sec).ToString();
    }

}

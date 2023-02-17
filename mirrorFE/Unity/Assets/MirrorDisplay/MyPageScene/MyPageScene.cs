using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using static ChoiceExerciseScene;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;
using TMPro;
using UnityEngine.UI;

public class MyPageScene : MonoBehaviour
{
    public RawImage RawImage;
    public TMP_Text Text_ID;
    public TMP_Text Text_Mileage;
    public TMP_Text Text_Days;
    public TMP_Text Text_List;

    [Serializable]
    public class MyPageInfo
    {
        public long continuousExercisePeriod;
        public long mileage;
        public string photo;
        public ExerciseInfo[] exerciseInfoList;
    }

    [Serializable]
    public class ExerciseInfo
    {
        public long exerciseTypeId;
        public string exerciseTypeName;
        public long exerciseTypeCount;
    }

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(getMyPageInfo("get-mypage", "GET"));
        //Text_ID.text = PlayerPrefs.GetString("NickName") + "\n(" + PlayerPrefs.GetString("ID") + ")";

    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Backspace))
        {
            Back();
        }
    }
    public void Back()
    {
        SceneManager.LoadScene("MainMenuScene");
    }
    IEnumerator getMyPageInfo(string url, string method)
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
            Debug.Log(uwr.downloadHandler.text);
        }

        else
        {
            string str = uwr.downloadHandler.text;

            MyPageInfo myPageInfo = JsonUtility.FromJson<MyPageInfo>(str);

            /*Texture2D newPhoto = new Texture2D(1, 1);
            newPhoto.LoadImage(Convert.FromBase64String(myPageInfo.photo));
            newPhoto.Apply();
            RawImage.texture = newPhoto;
*/
            Debug.Log("연속 운동 기간 : " + myPageInfo.continuousExercisePeriod);
            Text_Days.text = $"{myPageInfo.continuousExercisePeriod}일 연속 운동 중!!";
            Debug.Log("마일리지 : " + myPageInfo.mileage);
            Text_Mileage.text = $"{myPageInfo.mileage} 마일리지";
            Debug.Log("사진 정보 : " + myPageInfo.photo);
            Debug.Log("리스트 사이즈" + myPageInfo.exerciseInfoList.Length);

            Text_List.text = "";
            foreach(ExerciseInfo exerciseInfo in myPageInfo.exerciseInfoList)
            {
                Text_List.text += $"- {exerciseInfo.exerciseTypeName} 운동 {exerciseInfo.exerciseTypeCount} 회\n";
                Debug.Log("운동 id : " + exerciseInfo.exerciseTypeId);
                Debug.Log("운동 이름 : " + exerciseInfo.exerciseTypeName);
                Debug.Log("운동 횟수 : " + exerciseInfo.exerciseTypeCount);
            }

        }
    }
}

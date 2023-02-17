using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using static ChoiceRoutineScene;
using UnityEngine.Networking;

public class GetExerciseType : MonoBehaviour
{
    [Serializable]
    public class ExerciseType
    {
        public long exerciseTypeId;
        public string exerciseTypeName;
        public string exerciseArea;
    }

    [Serializable]
    public class ExerciseTypeList
    {
        public ExerciseType[] items;
    }

    // Start is called before the first frame update
    void Start()
    {
        string area = "하체";
        StartCoroutine(getExerciseType("get-exercise-type?area=" + area, "GET"));
    }

    IEnumerator getExerciseType(string url, string method)
    {
        string sendURL = $"{PlayerPrefs.GetString("baseUrl")}/{url}";

        var uwr = new UnityWebRequest(sendURL, method);

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

            string jsonArrayStr = "{\"items\" :" + str + "}";

            ExerciseTypeList exerciseTypeList = JsonUtility.FromJson<ExerciseTypeList>(jsonArrayStr);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

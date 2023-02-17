using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ChangeExercise_Description : MonoBehaviour
{
    TMP_Text T;
    string[] text = { "일반 모드", "게임 모드" };

    // Start is called before the first frame update
    void Start()
    {
        T = GetComponent<TMP_Text>();
    }


    public void SetDescription(int n)
    {
        T.text = text[n];
    }



    // Update is called once per frame
    void Update()
    {
        
    }
}

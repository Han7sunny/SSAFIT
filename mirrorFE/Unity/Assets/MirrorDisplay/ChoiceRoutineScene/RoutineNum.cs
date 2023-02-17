using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;


public class RoutineNum : MonoBehaviour
{
    public TMP_Text Routine_Description;
    // Start is called before the first frame update
    
    void Start()
    {
        Routine_Description = GetComponent<TMP_Text>();
        ChangeNum(GameObject.Find("Content").GetComponent<ChoiceRoutineScene>().focusIdx+1, GameObject.Find("Content").GetComponent<ChoiceRoutineScene>().N);
    }
    public void ChangeNum(int a, int b)
    {
        Routine_Description.text = $"{a} / {b}";
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ButtonContent : MonoBehaviour
{
    public TMP_Text RoutineName;
    public TMP_Text ExerciseList;
    bool is_grown = false;
    
    public void SetRoutineName(string text)
    {
        RoutineName.text = "* "+text;
    }
    public void AddExercise(string text)
    {
        ExerciseList.text += "- "+text + "\n";
    }


    // Start is called before the first frame update
    void Start()
    {
        
    }


    // Update is called once per frame
    void Update()
    {
        float now_posx = this.gameObject.transform.position.x;
        if (!is_grown && 539f < now_posx && now_posx < 541f)
        {
            this.transform.localScale = new Vector3(1.5f, 1.5f, 1f);
            is_grown = true;

        }
        else if (is_grown && (539f >= now_posx || now_posx >= 541f))
        {
            is_grown = false;
            this.transform.localScale = new Vector3(1.0f, 1.0f, 1f);
        }
    }
}

using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class TimeScript : MonoBehaviour
{
    // Start is called before the first frame update
    public TMP_Text T;
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        T.text = DateTime.Now.ToString("yyyy-MM-dd  HH:mm");
    }
}

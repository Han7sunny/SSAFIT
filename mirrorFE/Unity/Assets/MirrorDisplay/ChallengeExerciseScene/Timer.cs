using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System.Diagnostics.CodeAnalysis;

public class Timer : MonoBehaviour
{
    TMP_Text time;
    float H, M, S;
    public string _H, _M, _S;
    // Start is called before the first frame update
    void Start()
    {
        time = GetComponent<TMP_Text>();

    }

    // Update is called once per frame
    void Update()
    {
        S += Time.deltaTime;
        if (S > 60)
        {
            M += 1;
            S -= 60;
        }
        if (M > 60)
        {
            S += 1;
            M -= 60;
        }
        _S = Mathf.Ceil(S).ToString();
        _M = M.ToString();
        _H = H.ToString();

        if (_S.Length < 2) _S = "0" + _S;
        if (M < 10) _M = "0" + _M;
        if (H < 10) _H = "0" + _H;

        time.text = _H+":"+_M+":"+_S;


    }
}

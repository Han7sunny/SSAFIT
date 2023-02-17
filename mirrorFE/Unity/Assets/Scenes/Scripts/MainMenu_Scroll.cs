using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MainMenu_Scroll : MonoBehaviour
{
    public Button btn1, btn2, btn3, btn4;
    public RectTransform Content;
    private float pos;
    private bool isScroll = false;


    // Start is called before the first frame update
    void Start()
    {
        pos = Content.localPosition.x;
    }
    
    public void Right()
    {
        if (!isScroll && Mathf.Abs(Content.localPosition.x+2400f) > 1f) {
            isScroll = true;
            StartCoroutine(Scroll(Content.localPosition.x - 480f));


        }
        
    }
    public void Left()
    {
        if (!isScroll && Mathf.Abs(Content.localPosition.x) > 1f)
        {
            isScroll = true;
            StartCoroutine(Scroll(Content.localPosition.x + 480f));
        }
    }

    IEnumerator Scroll(float movepos)
    {
        Debug.Log(movepos);
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
        
    }
}

using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using UnityEngine;

public class moving_left_right : MonoBehaviour
{

    private RectTransform rectTransform;
    // Start is called before the first frame update
    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
    }

    // Update is called once per frame
    void Update()
    {

        if (Input.GetKeyDown(KeyCode.LeftArrow)) {
            rectTransform.anchoredPosition = new Vector2(rectTransform.anchoredPosition.x + 720f, 0);
        }
        if (Input.GetKeyDown(KeyCode.RightArrow))
        {
            StartCoroutine(FadeMove());
        }
    }

    IEnumerator FadeMove()
    {
        Vector2 nowPos = rectTransform.anchoredPosition;
        Vector2 nextPos = new Vector2(rectTransform.anchoredPosition.x - 720f, rectTransform.anchoredPosition.y);
        UnityEngine.Debug.Log(nowPos);
        UnityEngine.Debug.Log(nextPos);
        rectTransform.anchoredPosition = Vector2.MoveTowards(nowPos, nextPos, 1f * Time.deltaTime);
        yield return null;
    }

}

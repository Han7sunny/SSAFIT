using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ButtonScale : MonoBehaviour
{
    bool is_grown = false;
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

    //IEnumerator Grow()
    //{
    //    while ()
    //    {
    //        this.transform.localScale = Vector3.Lerp(new Vector3(1.0f, 1.0f, 1.0f), new Vector3(1.5f, 1.5f, 1.0f), Time.deltaTime * 50);
    //        if (Vector3.Distance(this.transform.localScale, new Vector3(1.5f, 1.5f, 1.0f)) < 0.01f)
    //        {
    //            is_Grow = false;
    //        }
    //    }
    //    yield return null;
    //}
    //IEnumerator Reduce()
    //{
    //    is_Reduce = true;
    //    while (is_Reduce)
    //    {
    //        this.transform.localScale = Vector3.Lerp(new Vector3(1.5f, 1.5f, 1.0f), new Vector3(1.0f, 1.0f, 1.0f), Time.deltaTime * 50);
    //        if (Vector3.Distance(this.transform.localScale, new Vector3(1.0f, 1.0f, 1.0f)) < 0.01f)
    //        {
    //            is_Reduce = false;
    //        }
    //    }
    //    yield return null;
    //}
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CreateButton : MonoBehaviour
{
    public GameObject btnPrefab;
    public Transform panelPos;
    


    // Start is called before the first frame update
    void Start()
    {
        //btnPrefab = Resources.Load<GameObject>("ButtonPrefab");

        //if (btnPrefab == null)
        //{
        //    Debug.Log("null !!");
        //}
        CreateBtn();

    }



    public void CreateBtn()
    {
        for(int i = 0; i < 4; ++i)
        {
            GameObject button = Instantiate(btnPrefab);
            RectTransform btnpos = button.GetComponent<RectTransform>();
            btnpos.SetParent(gameObject.transform);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

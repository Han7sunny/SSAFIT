using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;


public class DetailText : MonoBehaviour
{
    TMP_Text T;
    string[] detailText = {"나의 운동 루틴 보러가기","부위 별 운동 고르기","챌린지게임 도전하기","내 정보 보러가기","로그아웃" };

    // Start is called before the first frame update
    void Start()
    {
        T = GetComponent<TMP_Text>();
    }

    // Update is called once per frame
    void Update()
    {
        T.text = detailText[GameObject.Find("Content").GetComponent<MainMenuScene>().focusIdx];
    }
}

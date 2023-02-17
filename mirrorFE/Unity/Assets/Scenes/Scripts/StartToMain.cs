using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
public class StartToMain : MonoBehaviour
{

    public void SceneCtrl()
    {
        SceneManager.LoadScene("MainMenu");
    }
}

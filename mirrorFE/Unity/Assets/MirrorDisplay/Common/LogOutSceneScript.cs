using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LogOutSceneScript : MonoBehaviour
{
    Animator animator;
    private AudioSource audioSource;
    public AudioClip clip;

    private void Start()
    {
        audioSource = GetComponent<AudioSource>();
        animator = GetComponent<Animator>();
    }
    public void Enter()
    {
        animator.SetBool("Bye", true);
        SoundManager.instance.SFXPlay("Bye", clip);
        StartCoroutine(WaitForIt());
    }
    public void Back()
    {
        SceneManager.LoadScene("MainMenuScene");
    }
    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Return))
        {
            Enter();
        }
        if (Input.GetKeyDown(KeyCode.Backspace))
        {
            Back();
        }
    }
    IEnumerator WaitForIt()
    {
        yield return new WaitForSeconds(4.0f);
        SceneManager.LoadScene("InitialScene");
    }
}

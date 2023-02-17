using JetBrains.Annotations;
using System.Collections;
using System.Collections.Generic;
using Unity.Collections.LowLevel.Unsafe;
using UnityEngine;
using UnityEngine.SceneManagement;

public class InitAnimationCtr : MonoBehaviour
{
    Animator animator;
    public float runSpeed = 1.0f;
    private int cnt = 0;
    float processTime = 0.0f;
    private AudioSource audioSource;
    public AudioClip clip;
    // Start is called before the first frame update
    void Start()
    {
        audioSource = GetComponent<AudioSource>();
        animator = GetComponent<Animator>();

    }

    // Update is called once per frame
    void Update()
    {

        if (GameManager.Instance.IsDance)
        {
            animator.SetBool("IsDance", true);
            SoundManager.instance.SFXPlay("Dance", clip);
            GameManager.Instance.IsDance = false;
            StartCoroutine(WaitForIt());
        }
        else
        {
            audioSource.Stop();
        }
        if (GameManager.Instance.IsMember & cnt == 0)
        {
            cnt++;
            animator.SetBool("IsMember", true);
        }
        else if (GameManager.Instance.IsLogin)
        {

            processTime += 1.0f * Time.deltaTime;
            animator.SetBool("IsGo", true);
            if (processTime > 3)
            {
                cnt = 0;
                GameManager.Instance.IsMember = false;
                animator.SetBool("IsMember", false);
                animator.SetBool("IsGo", false);
                SceneManager.LoadScene("MainMenuScene");
            }
        }
    }

    public void SSafitOn()
    {
        animator.SetBool("IsOn", true);
    }
    IEnumerator WaitForIt()
    {
        yield return new WaitForSeconds(3.0f);
        animator.SetBool("IsDance", false);
    }
    //else if (GameManager.Instance.IsLogin & cnt2 >= 1)
    //{

    //    transform.Translate(Vector3.forward * runSpeed * Time.deltaTime);     

    //}

}

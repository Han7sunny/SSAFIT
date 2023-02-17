using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SoundManager : MonoBehaviour
{
    public AudioSource bgSound;
    public static SoundManager instance;
    public AudioClip[] bglist;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void Awake()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(instance);
            SceneManager.sceneLoaded += OnSceneLoaded;
        }
        else
        {
            Destroy(gameObject);
        }
    }
    private void OnSceneLoaded(Scene arg0, LoadSceneMode arg1)
    {
        
        if (arg0.name == "ChallengeGameScene")
        {
            BgSoundPlay(bglist[0]);
        }
        else if(arg0.name == "NormalExerciseScene")
        {
            BgSoundPlay(bglist[1]);
        }
        else
        {
            BgSoundPlay(null);
        }
    }
    public void SFXPlay(string sfxName, AudioClip clip)
    {
        GameObject go = new GameObject(sfxName + "Sound");
        AudioSource audioSource = go.AddComponent<AudioSource>();
        audioSource.clip = clip;
        audioSource.Play();
        audioSource.volume= 0.7f;
        Destroy(go, 7f);
    }
    public void BgSoundPlay(AudioClip clip)
    {
        bgSound.clip= clip;
        bgSound.loop = true;
        bgSound.volume = 0.5f;
        bgSound.Play();
        if (clip == null)
        {
            bgSound.Stop();
        }
    }

  
}

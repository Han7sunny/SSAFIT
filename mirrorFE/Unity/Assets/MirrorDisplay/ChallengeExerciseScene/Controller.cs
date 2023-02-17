using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Controller : MonoBehaviour
{

    public bool isGrounded;
    public int dir;
    public float velocity, jumpvelocity, duration, durlimit, bounce;
    Rigidbody rigidBody;
    Transform trans;
    bool charging = false;
    private GameObject Charging_bar;
    Transform Player;
    GameObject PopUp;
    public bool PopUpOn = false;
    GameObject Menual;
    public bool MenualOn = false;
    bool GameFinish = false;
    private AudioSource audioSource;
    public AudioClip clip;
    // Start is called before the first frame update

    void Start()
    {
        audioSource= GetComponent<AudioSource>();
        Player = GameObject.Find("Player").GetComponent<Transform>();
        isGrounded = true;
        rigidBody = GetComponent<Rigidbody>();
        trans = GetComponent<Transform>();
        velocity = 50f;
        jumpvelocity = 75f;
        durlimit = 2.5f;
        Charging_bar = GameObject.Find("Canvas/Slider");
        Charging_bar.SetActive(false);
        PopUp = GameObject.Find("PopupCanvas 1");
        PopUp.SetActive(false);
        Menual = GameObject.Find("Menual");
        Menual.SetActive(true);
        MenualOn = true;
        Time.timeScale = 0f;
    }


    public void ActivePopUp()
    {
        PopUpOn = true;
        PopUp.SetActive(true);
        Time.timeScale = 0;
    }


    public void Enter()
    {
        if (GameFinish)
        {
            string temp = GameObject.Find("TimeRecord").GetComponent<Timer>()._H +"시간 "+ GameObject.Find("TimeRecord").GetComponent<Timer>()._M +"분 "+ GameObject.Find("TimeRecord").GetComponent<Timer>()._S+"초";
            PlayerPrefs.SetString("MyRecord", temp);
            SceneManager.LoadScene("RecordScene");
        }

        else
        {
            Time.timeScale = 1f;
            SceneManager.LoadScene("MainMenuScene");
        }
        
    }

    public void Back()
    {
        Time.timeScale = 1f;
        PopUp.SetActive(false);
        PopUpOn = false;
    }
    public void GameStart()
    {
        Time.timeScale = 1f;
        MenualOn = false;
        Menual.SetActive(false);
    }
    public void ChargingDown()
    {
        if (isGrounded)
        {
            charging = true;
            if (dir == 1) trans.rotation = Quaternion.Euler(0, 90, 0);
            else if (dir == -1) trans.rotation = Quaternion.Euler(0, 270, 0);
            Player.localScale = new Vector3(1f, 0.5f, 1f);
        }
    }
    public void SuperJump()
    {
        if (charging)
        {

            SoundManager.instance.SFXPlay("Jumping", clip);
            Player.localPosition = new Vector3(Player.localPosition.x, Player.localPosition.y + 0.25f, Player.localPosition.z);
            Player.localScale = new Vector3(1f, 1f, 1f);

            isGrounded = false;
            rigidBody.AddForce(Vector3.right * dir * velocity + Vector3.up * jumpvelocity * (0.2f + (duration > durlimit ? durlimit : duration)), ForceMode.Impulse);
            duration = 0;
            charging = false;
            Charging_bar.SetActive(false);
        }
    }
    public void Cheat()
    {
        Player.localPosition = new Vector3(25,100,5);
    }

    // Update is called once per frame
    void Update()
    {
        if (MenualOn) {
            if (Input.GetKeyDown(KeyCode.Return))
            {
                GameStart();
            }
            return;
            
        }
        Charging_bar.transform.position = Camera.main.WorldToScreenPoint(transform.position + new Vector3(0, -1.5f, 0));
        Charging_bar.GetComponent<Slider>().value = duration / 2.5f;
        if (charging) duration += Time.deltaTime;
        if (PopUpOn)
        {
            if (Input.GetKeyDown(KeyCode.Return))
            {
                Enter();
            }
            if (Input.GetKeyDown(KeyCode.Backspace))
            {
                Back();
            }
            return;
        }
        if (Input.GetKeyDown(KeyCode.Backspace))
        {
            ActivePopUp();
        }

            if (Input.GetKeyDown(KeyCode.D))
        {
            dir = 1;
            trans.rotation = Quaternion.Euler(0, 105, 0);
        }
        if (Input.GetKeyDown(KeyCode.A))
        {
            dir = -1;
            trans.rotation = Quaternion.Euler(0, 255, 0);
        }
        if (Input.GetKeyDown(KeyCode.Q) && isGrounded)
        {
            charging = true;
            if (dir==1) trans.rotation = Quaternion.Euler(0, 90, 0);
            else if (dir==-1) trans.rotation = Quaternion.Euler(0, 270, 0);
            Player.localScale = new Vector3(1f, 0.5f, 1f);

            Charging_bar.SetActive(true);
        }
        if (Input.GetKeyDown(KeyCode.W) && charging)
        {
            Player.localPosition = new Vector3(Player.localPosition.x, Player.localPosition.y+0.25f, Player.localPosition.z);
            Player.localScale = new Vector3(1f, 1f, 1f);

            isGrounded = false;
            rigidBody.AddForce( Vector3.right * dir * velocity + Vector3.up * jumpvelocity* (0.2f+(duration > durlimit ? durlimit : duration)),ForceMode.Impulse);
            duration = 0;
            charging = false;
            Charging_bar.SetActive(false);

            
        }

    }


    void OnCollisionEnter(Collision collision)
    {
        Vector3 colnormal = collision.contacts[0].normal;
        if (collision.gameObject.tag == "Finish")
        {
            GameFinish = true;
            Enter();
        }
   
        if (colnormal == Vector3.up)
        {

            if (!charging) rigidBody.velocity = Vector3.zero;
            isGrounded = true;
        }
        //if (colnormal == Vector3.right || colnormal == Vector3.left) rigidBody.velocity = new Vector3(rigidBody.velocity.x, rigidBody.velocity.y * bounce * (-1), 0);
    }


}

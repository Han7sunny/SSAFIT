using System.Collections;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerCtrl : MonoBehaviour
{
    public float moveSpeed = 5.0f;
    public float moveDir;
    public bool dirRight = true;
    public float jumpSpeed = 500.0f;
    public bool isFloor = false;
    public bool isDoubleJump = false;

    GameObject PopUp;
    public bool PopUpOn = false;

    private Rigidbody playerRB;

    private void Start()
    {
        PopUp = GameObject.Find("PopupCanvas 1");
        PopUp.SetActive(false);
    }
    // Start is called before the first frame update
    void Awake()
    {
        playerRB = this.GetComponent<Rigidbody>();
        
    }

    // Update is called once per frame
    void Update()
    {
        moveDir = Input.GetAxis("Horizontal");

        if ((isFloor || !isDoubleJump ) && Input.GetButtonDown("Jump"))
        {
            playerRB.AddForce(new Vector2(0, jumpSpeed));
            
            if(!isDoubleJump && !isFloor)
            {
                isDoubleJump = true;
            }
        }

    }

    private void FixedUpdate()
    {
        playerRB.velocity = new Vector2(moveDir * moveSpeed, playerRB.velocity.y);

        if (isFloor) isDoubleJump = false;

        if (moveDir > 0.0f && !dirRight) ChangeDir();
        else if (moveDir < 0.0f && dirRight) ChangeDir();

    }

    void ChangeDir()
    {
        dirRight = !dirRight;
        transform.Rotate(Vector3.up, 180.0f, Space.World);
    }
    public void Enter()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene("MainMenuScene");
    }
    public void Back()
    {
        Time.timeScale = 1f;
        PopUp.SetActive(false);
        PopUpOn = false;
    }
    public void ActivePopUp()
    {
        PopUpOn = true;
        PopUp.SetActive(true);
        Time.timeScale = 0;
    }

}

using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using UnityEngine;
using System.Text;
using System;
using System.IO;
using System.Runtime.InteropServices;
using UnityEngine.SceneManagement;
using System.Threading;
using System.Runtime.CompilerServices;
using Unity.VisualScripting;
using UnityEditor;

public class GameManager : MonoBehaviour
{

    private static GameManager instance = null;
    private Thread thread;
    public Queue<string> msgbox = new Queue<string>();
    TcpClient client;
    //public GameObject MainMenu_Scroll;
    string serverIP = "127.0.0.1";
    int port = 9999;
    NetworkStream stream;
    bool socketReady = false;
    byte[] receivedBuffer;
    byte[] sendData;
    public string data = null;
    public int focusIdx = 0;
    public bool IsConnect = false;
    public bool IsLogin = false;
    public bool IsFinish = false;
    public bool IsMember = false;
    public bool MenuOn;
    public bool PopUpOn = false;
    public bool IsSkip= false;
    bool IsGesture = false;
    bool IsPose = false;
    int mode, sceneIdx;
    int logincnt;
    int sportStart = 0;
    string sceneName = null;

    [Serializable]
    public class User
    {
        public string userId;
        public string userName;
        public string accessToken;
    }

    public class RecordInfo
    {
        public long recordId;
        public Queue<RecordDetailInfo> exerciseData;

        public RecordInfo()
        {
            this.exerciseData = new Queue<RecordDetailInfo>();
        }

        public RecordInfo(long recordId)
        {
            this.recordId = recordId;
            this.exerciseData = new Queue<RecordDetailInfo>();
        }
    }

    public class RecordDetailInfo // 레코드를 생성하기 위한 클래스
    {
        public long recordDetailId;
        public string exerciseTypeName;
        public string exerciseArea;
        public long exerciseSet;
        public long reps;
        public long restTimeMinutes;
        public long restTimeSeconds;

        public RecordDetailInfo()
        {
        }

        public RecordDetailInfo(long recordDetailId, string exerciseTypeName, string exerciseArea, long exerciseSet, long reps, long restTimeMinutes, long restTimeSeconds)
        {
            this.recordDetailId = recordDetailId;
            this.exerciseTypeName = exerciseTypeName;
            this.exerciseArea = exerciseArea;
            this.exerciseSet = exerciseSet;
            this.reps = reps;
            this.restTimeMinutes = restTimeMinutes;
            this.restTimeSeconds = restTimeSeconds;
        }

        public RecordDetailInfo(RecordDetailInfo inputInfo)
        {
            this.recordDetailId= inputInfo.recordDetailId;
            this.exerciseTypeName = inputInfo.exerciseTypeName;
            this.exerciseArea = inputInfo.exerciseArea;
            this.exerciseSet = inputInfo.exerciseSet;
            this.reps = inputInfo.reps;
            this.restTimeMinutes = inputInfo.restTimeMinutes;
            this.restTimeSeconds = inputInfo.restTimeSeconds;
        }
    }

    public User user;
    public RecordInfo exerciseBox;
    public RecordDetailInfo exerciseInfo;

    public int exerciseCnt;
    public int totalCnt;
    public bool IsDance = false;
    // Update is called once per frame
    void Start()
    {
        /*exerciseBox= new RecordInfo();
        exerciseInfo = new RecordDetailInfo();*/
        CheckReceive();
        UnityEngine.Debug.Log("Test");
        mode = sceneIdx= 0;
        thread = new Thread(Send);
        thread.Start();
        logincnt = 0;
    }


    void Update()
    {

        if (socketReady) //
        {
            sceneIdx = SceneManager.GetActiveScene().buildIndex;
            if(IsFinish)
            {
                msgbox.Enqueue("gestureon");
                IsGesture = true;
                msgbox.Enqueue("poseoff");
                msgbox.Enqueue("finish");
                IsPose = false;
                IsFinish = false;
            }
            if (stream.DataAvailable)
            {


                receivedBuffer = new byte[1000];
                stream.Read(receivedBuffer, 0, receivedBuffer.Length); // stream에 있던 바이트배열 내려서 새로 선언한 바이트배열에 넣기
                string msg = Encoding.UTF8.GetString(receivedBuffer, 0, receivedBuffer.Length).Trim('\0'); // byte[] to string
                msg = msg.Trim();

                if (msg.Length > 40 && IsLogin)
                {
                    user = JsonUtility.FromJson<User>(msg);
                    Debug.Log("아이디 :" + user.userId + "\n닉네임 : " + user.userName + "\n토큰 : " + user.accessToken);
                }

              
                if (msg.Length > 0)
                {
                     // 현재 씬 위치 
                    sceneName = SceneManager.GetActiveScene().name;
                    Debug.Log(sceneIdx);

                    UnityEngine.Debug.Log("msg = " + msg);
                    if (sceneName == "InitialScene")
                    {
                        if (msg == "on")
                        {
                            
                            msgbox.Enqueue("gestureon");
                            IsGesture= true;
                            UnityEngine.Debug.Log("gesture start");
                            GameObject.FindWithTag("Player").GetComponent<InitAnimationCtr>().SSafitOn();
                        }

                        if (msg == "enter" && IsLogin == false & logincnt < 1)
                        {
                            msgbox.Enqueue("gestureoff");
                            IsGesture= false;
                            msgbox.Enqueue("ismember");
                            UnityEngine.Debug.Log("facerecognition");

                            IsMember = true;
                            logincnt++;
                        }
                        if (msg == "login" && IsLogin == false)
                        {
                            IsLogin = true;
                            msgbox.Enqueue("gestureon");
                            IsGesture = true;
                            UnityEngine.Debug.Log("login success");
                      
                        }
                        if (msg == "dance")
                        {
                            IsDance = true;
                        }
                    }
                    else if (sceneName == "MainMenuScene")
                    {
                        if (msg == "left")
                        {

                            GameObject.FindWithTag("SceneController").GetComponent<MainMenuScene>().Left();
                            ;
                        }
                        else if (msg == "right")
                        {

                            GameObject.FindWithTag("SceneController").GetComponent<MainMenuScene>().Right();

                        }
                        else if (msg == "enter")
                        {

                            GameObject.FindWithTag("SceneController").GetComponent<MainMenuScene>().Enter();
                        }
                    }
                    else if (sceneName == "ChoiceRoutineScene")
                    {
                        if (msg == "left")
                        {

                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceRoutineScene>().Left();
                        }
                        else if (msg == "right")
                        {

                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceRoutineScene>().Right();
                        }
                        else if (msg == "enter")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceRoutineScene>().Enter();
                        }
                        else if (msg == "back")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceRoutineScene>().Back();
                        }
                    }
                    else if (sceneName == "ChoiceExerciseScene")
                    {
                        if (msg == "left")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceExerciseScene>().Left();
                        }
                        else if (msg == "right")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceExerciseScene>().Right();
                        }
                        else if (msg == "enter")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceExerciseScene>().Enter();
                        }
                        else if (msg == "back")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceExerciseScene>().Back();
                        }
                    }
                    else if (sceneName == "ChoiceExerciseDetailScene")
                    {
                        if (msg == "left")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceExerciseDetailScene>().Left();
                        }
                        else if (msg == "right")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceExerciseDetailScene>().Right();
                        }
                        else if (msg == "enter")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceExerciseDetailScene>().Enter();
                        }
                        else if (msg == "back")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChoiceExerciseDetailScene>().Back();
                        }
                    }
                    else if (sceneName == "MyPageScene")
                    {
                        if (msg == "back")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<MyPageScene>().Back();
                        }
                    }
                    else if (sceneName == "ChangeExerciseScene")
                    {
                        if (msg == "left")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChangeExercise_Script>().Left();
                        }
                        else if (msg == "right")
                        {
                            GameObject.FindWithTag("SceneController").GetComponent<ChangeExercise_Script>().Right();
                        }
                        else if (msg == "enter")
                        {
                            msgbox.Enqueue(exerciseInfo.exerciseTypeName);
                            msgbox.Enqueue("gestureoff");
                            IsGesture = false;
                            msgbox.Enqueue("poseon");
                            IsPose = true;
                            GameObject.FindWithTag("SceneController").GetComponent<ChangeExercise_Script>().Enter();
                        }
                      
                    }
                    
                    else if (sceneName == "NormalExerciseScene")
                    {
                        
                        PopUpOn = GameObject.FindWithTag("SceneController").GetComponent<NormalExerciseScene>().PopUpOn;
                        if(msg == "count")
                        { 
                            exerciseCnt++;
                            Debug.Log(exerciseCnt);
                            totalCnt++;
                        }

                        if(msg == "back" && PopUpOn == true)
                        { 
                            msgbox.Enqueue("gestureoff");
                            msgbox.Enqueue("poseon");
                            PopUpOn= false;
                            //Debug.Log(MenuOn);
                            GameObject.FindWithTag("SceneController").GetComponent<NormalExerciseScene>().Back();
                        }
                        else if(msg == "enter" && PopUpOn == true)
                        {
                            Debug.Log("enter");
                            msgbox.Enqueue("poseoff");
                            PopUpOn = false;
                            IsSkip = true;
                            GameObject.FindWithTag("SceneController").GetComponent<NormalExerciseScene>().Enter(); 
                        }
                        if(msg == "menu" && PopUpOn == false)
                        {
                            msgbox.Enqueue("gestureon");
                            IsGesture = true;
                            msgbox.Enqueue("poseoff");
                            IsPose = false;
                            PopUpOn = true;
                            GameObject.FindWithTag("SceneController").GetComponent<NormalExerciseScene>().ActivePopUp();
                        }
                        if (msg == "dance")
                        {
                            IsDance = true;
                        }


                    }
                    else if(sceneName == "LogOutScene")
                    {
                        if(msg == "enter")
                        {
                            IsLogin = false;
                            msgbox.Enqueue("logout");
                            logincnt = 0;
                            Debug.Log(IsLogin);
                            GameObject.FindWithTag("SceneController").GetComponent<LogOutSceneScript>().Enter();
                        }
                    }
                    else if (sceneName == "ChallengeGameScene")
                    {
                        int dir = GameObject.FindWithTag("Player").GetComponent<Controller>().dir;
                        MenuOn = GameObject.FindWithTag("Player").GetComponent<Controller>().MenualOn;
                        PopUpOn = GameObject.FindWithTag("Player").GetComponent<Controller>().PopUpOn;
                        if (msg == "enter" && MenuOn)
                        {
                            GameObject.FindWithTag("Player").GetComponent<Controller>().GameStart();
                            msgbox.Enqueue("gestureoff");
                            IsGesture= false;
                            msgbox.Enqueue("poseon");
                            IsPose = true;
                            msgbox.Enqueue("game");
                        }
                        if(msg == "menu" && !PopUpOn)
                        {
                            IsGesture = true;
                            msgbox.Enqueue("poseoff");
                            IsPose = false;
                            GameObject.FindWithTag("Player").GetComponent<Controller>().ActivePopUp();
                        }
                        if(msg == "back"&& PopUpOn)
                        {
                            msgbox.Enqueue("gestureoff");
                            IsGesture = false;
                            msgbox.Enqueue("poseon");
                            IsPose = true;
                            GameObject.FindWithTag("Player").GetComponent<Controller>().Back();
                        }
                        if(msg == "enter" && PopUpOn)
                        {
                            msgbox.Enqueue("gestureon");
                            IsGesture = true;
                            msgbox.Enqueue("poseoff");
                            IsPose = false;
                            GameObject.FindWithTag("Player").GetComponent<Controller>().Enter();
                        }
                        if(msg == "left")
                        {
                            GameObject.FindWithTag("Player").GetComponent<Controller>().dir = 1;
                        }
                        else if (msg == "right")
                        {
                            GameObject.FindWithTag("Player").GetComponent<Controller>().dir = -1;
                        }
                        else if (msg == "down")
                        {
                            GameObject.FindWithTag("Player").GetComponent<Controller>().ChargingDown();
                        }
                        else if(msg == "jump")
                        {
                            GameObject.FindWithTag("Player").GetComponent<Controller>().SuperJump();
                        }
                        else if(msg == "cheat")
                        {

                        }
                    }
                    else if (sceneName == "ChallengeExerciseScene")
                    {

                        PopUpOn = GameObject.FindWithTag("Player").GetComponent<PlayerCtrl>().PopUpOn;
                        if (msg == "count")
                        {
                            exerciseCnt++;
                            Debug.Log(exerciseCnt);
                            totalCnt++;
                        }
                        if (msg == "back" && PopUpOn == true)
                        {
                            msgbox.Enqueue("gestureoff");
                            msgbox.Enqueue("poseon");
                            PopUpOn = false;
                            //Debug.Log(MenuOn);
                            GameObject.FindWithTag("Player").GetComponent<PlayerCtrl>().Back();
                        }
                        else if (msg == "enter" && PopUpOn == true)
                        {
                            Debug.Log("enter");
                            msgbox.Enqueue("poseoff");
                            PopUpOn = false;
                            GameObject.FindWithTag("Player").GetComponent<PlayerCtrl>().Enter();
                        }
                        if (msg == "menu" && PopUpOn == false)
                        {
                            msgbox.Enqueue("gestureon");
                            msgbox.Enqueue("poseoff");
                            PopUpOn = true;
                            GameObject.FindWithTag("Player").GetComponent<PlayerCtrl>().ActivePopUp();
                        }
                    }
                    else if (sceneName == "ExerciseResult")
                    {
                        if (msg == "enter")
                        {
                            IsLogin = false;
                            msgbox.Enqueue("logout");
                            logincnt = 0;
                            Debug.Log(IsLogin);
                            GameObject.FindWithTag("SceneController").GetComponent<LogOutSceneScript>().Enter();
                        }
                    }

                }
            }
            
        }
    }
    void Awake()
    {
        var obj = FindObjectsOfType<GameManager>();
        if(obj.Length == 1) 
        {
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }

        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(this.gameObject);
        }
        else
        {
            Destroy(this.gameObject);
        }
       
    }
    void Load()
    {
        SceneManager.LoadScene(0);
    }
    public static GameManager Instance
    {
        get
        {
            if( instance == null)
            {
                return null;
            }
            return instance;
        }
    }

    void CheckReceive()
    {
        if (socketReady) return;
        try
        {
            client = new TcpClient(serverIP, port);

            if (client.Connected)
            {
                stream = client.GetStream();
                UnityEngine.Debug.Log("Connect Success");
                socketReady = true;
            }

        }
        catch (Exception e)
        {
            UnityEngine.Debug.Log("On client connect exception " + e);
        }
    }
    private void Send()
    {
        if(!socketReady) return;
        while (true)
        {

            if (msgbox.Count > 0)
            {
                data = msgbox.Dequeue();
                sendData = Encoding.UTF8.GetBytes(data);
                stream.Write(sendData, 0, sendData.Length);
                data = null;
                Thread.Sleep(1000);
            }    
        }
    }

    void OnApplicationQuit()
    {
       if(thread != null)
            thread.Abort();
        CloseSocket();
    }

    void CloseSocket()
    {
        if (!socketReady) return;
        UnityEngine.Debug.Log("EXIT");
        client.Close();
        stream.Close();
        socketReady = false;
    }

}

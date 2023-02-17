using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using UnityEngine;
using System.Text;
using System;
using System.IO;
using System.Runtime.InteropServices;
using UnityEngine.SceneManagement;

public class TCPManager : MonoBehaviour
{
    TcpClient client;

    string serverIP = "127.0.0.1";
    int port = 8000;
    byte[] receivedBuffer;
    StreamReader reader;
    bool socketReady = false;
    NetworkStream stream;
   



    int curIdx = 0;
    // Update is called once per frame
    void Start()
    {
        CheckReceive();
    }


    void Update()
    {
        if (socketReady)
        {
            if (stream.DataAvailable)
            {
                receivedBuffer = new byte[10];
                stream.Read(receivedBuffer, 0, receivedBuffer.Length); // stream에 있던 바이트배열 내려서 새로 선언한 바이트배열에 넣기
                string msg = Encoding.UTF8.GetString(receivedBuffer, 0, receivedBuffer.Length); // byte[] to string

                int num = Int32.Parse(msg);
                print(num);

                if (num == 0)
                {
                    curIdx = SceneManager.GetActiveScene().buildIndex;
                    print(curIdx);
                    if (curIdx < 2)
                    {
                        SceneManager.LoadScene(++curIdx);
                    }

                }
                else if (num == 1)
                {
                    curIdx = SceneManager.GetActiveScene().buildIndex;
                    print(curIdx);
                    if (curIdx > 0)
                    {
                        SceneManager.LoadScene(--curIdx);
                    }
                }
            }


        }
 

    }
    void Awake()
    {
        var obj = FindObjectsOfType<TCPManager>();
        if(obj.Length == 1) 
        {
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
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
                Debug.Log("Connect Success");
                socketReady = true;
            }

        }
        catch (Exception e)
        {
            Debug.Log("On client connect exception " + e);
        }

    }

    void OnApplicationQuit()
    {
        CloseSocket();
    }

    void CloseSocket()
    {
        if (!socketReady) return;

        reader.Close();
        client.Close();
        socketReady = false;
    }
}

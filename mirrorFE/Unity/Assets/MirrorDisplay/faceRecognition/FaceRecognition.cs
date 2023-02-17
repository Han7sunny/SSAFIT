using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Diagnostics;
using System.IO;

public class FaceRecognition : MonoBehaviour
{
    // Start is called before the first frame update
    public static void Start()
    {
        Process process = new Process();
        process.StartInfo.FileName = @"python";
        process.StartInfo.Arguments = @"C:\Users\SSAFY\Downloads\faceDecoding.py";
        process.StartInfo.UseShellExecute = false;
        process.StartInfo.RedirectStandardOutput = true;
        process.StartInfo.CreateNoWindow = true;
        process.Start();
        process.WaitForExit();

        string output = process.StandardOutput.ReadToEnd();
       

        UnityEngine.Debug.Log(output);
    }

    // Update is called once per frame
    void Update()
    {        
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;


[System.Serializable]
public class ServerRoot
{
    public List<ServerInfo> rows;
}
[System.Serializable]
public class ServerInfo
{
    public string serverId;
    public string serverName;
}
public class ApiTest : MonoBehaviour
{
    // Start is called before the first frame update

    public Dropdown ServerDropdown;

    void Start()
    {
        StartCoroutine(ServerRequest());
    }


    IEnumerator ServerRequest()
    {
        string url = "https://api.neople.co.kr/df/servers?apikey=";
        string api_key = "Ake9iFefNjvgfzba4yWCSi8lxff1DD5V";
        UnityWebRequest www = UnityWebRequest.Get(url + api_key);

        yield return www.SendWebRequest();

        if (www.error == null)
        {
            Debug.Log(www.downloadHandler.text);

            var serverData = JsonUtility.FromJson<ServerRoot>(www.downloadHandler.text);
            
            foreach (var item in serverData.rows)
            {
                Dropdown.OptionData option = new Dropdown.OptionData();
                option.text = item.serverName;
                ServerDropdown.options.Add(option);

            }

            
        }
        else
        {
            Debug.Log("ERROR");
        }


    }   


    // Update is called once per frame
    void Update()
    {
        
    }
}

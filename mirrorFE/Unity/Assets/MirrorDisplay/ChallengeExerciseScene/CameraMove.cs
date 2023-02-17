using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMove : MonoBehaviour
{
    public Vector3 offset;
    public float followSpeed = 0.1f;
    private GameObject player;
    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.Find("Player");
        offset = new Vector3(0, 15, -40);
    }

    // Update is called once per frame
    void Update()
    {
        Vector3 camera_pos = player.transform.position + offset;
        Vector3 lerp_pos = Vector3.Lerp(transform.position, camera_pos, followSpeed);
        transform.position = lerp_pos;
        transform.LookAt(transform.position);
    }
}

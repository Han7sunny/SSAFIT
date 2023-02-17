using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DetectFloor : MonoBehaviour
{
    private PlayerCtrl playerCtrl;

    // Start is called before the first frame update
    void Start()
    {
        playerCtrl = GameObject.FindWithTag("Player").GetComponent<PlayerCtrl>();   
    }

    private void OnTriggerStay(Collider other)
    {
        if (other.tag == "Floor")
        {
            playerCtrl.isFloor = true;
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.tag == "Floor")
        {
            playerCtrl.isFloor = false;
        }
    }

}

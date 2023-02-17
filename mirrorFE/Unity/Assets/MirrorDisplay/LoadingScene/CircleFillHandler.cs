using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
public class CircleFillHandler : MonoBehaviour
{
    [Range(0, 100)]
    public float fillValue = 0;
    static string nextScene;
    [SerializeField]
    Image progressCircle;
    public RectTransform handlerEdgeImage;
    public RectTransform fillHandler;

    // Start is called before the first frame update

    public static void LoadScene(string sceneName)
    {
        nextScene = sceneName;
        SceneManager.LoadScene("LoadingScene");
    }
    void Start()
    {
        StartCoroutine(LoadSceneProcess());
    }
    void FillCircleValue(float value)
    {
        float fillAmount = value;
        progressCircle.fillAmount = fillAmount;
        float angle = fillAmount * 360;
        fillHandler.localEulerAngles = new Vector3(0, 0, -angle);
        handlerEdgeImage.localEulerAngles = new Vector3(0, 0, angle);
    }
    IEnumerator LoadSceneProcess()
    {
        AsyncOperation op = SceneManager.LoadSceneAsync(nextScene);
        op.allowSceneActivation = false;

        float timer = 0f;
        while (!op.isDone)
        {
            yield return (null);
            if (op.progress < 0.9f)
            {
                //progressCircle.fillAmount = op.progress;

                FillCircleValue(op.progress);
                //float angle = op.progress * 360;
                //fillHandler.localEulerAngles = new Vector3(0, 0, -angle);
                //handlerEdgeImage.localEulerAngles = new Vector3(0, 0, angle);

            }
            else
            {
                timer += Time.unscaledDeltaTime;
                FillCircleValue(timer);
                //progressCircle.fillAmount = Mathf.Lerp(0.9f, 1f, timer);
                //fillHandler.localEulerAngles = new Vector3(0.9f, 1f, -timer * 360);
                //handlerEdgeImage.localEulerAngles = new Vector3(0.9f, 1f, -timer * 360);

                if (progressCircle.fillAmount >= 1f)
                {
                    op.allowSceneActivation = true;
                    yield break;
                }
            }
        }
    }

}


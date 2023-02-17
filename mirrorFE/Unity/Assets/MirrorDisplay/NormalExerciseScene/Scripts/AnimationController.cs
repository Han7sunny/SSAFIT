using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimationController : MonoBehaviour
{
    Animator animator;
    bool state = false;
    // Start is called before the first frame update
    string ExerciseName;
    public bool IsEnd = false;
    void Start()
    {
        animator = GetComponent<Animator>();
        Debug.Log(GameManager.Instance.exerciseInfo.exerciseTypeName);
        ExerciseName = GameManager.Instance.exerciseInfo.exerciseTypeName;
        //Debug.Log(ExerciseName);
        Debug.Log("애니메이션");
        if (ExerciseName == "스쿼트")
        {
            animator.SetBool("IsSquat", true);
        }
        else if (ExerciseName == "팔굽혀펴기")
        {
            animator.SetBool("IsPushUp", true);
        }
        else if (ExerciseName == "바이시클 크런치")
        {
            animator.SetBool("IsSitUp", true);
        }
        else if (ExerciseName == "팔벌려높이뛰기")
        {
            animator.SetBool("IsJumpingJack", true);
        }
        else if (ExerciseName == "버피테스트")
        {
            animator.SetBool("IsBurpee", true);
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (GameObject.FindWithTag("SceneController").GetComponent<NormalExerciseScene>().Rest)
        {
            if (ExerciseName == "스쿼트")
            {
                animator.SetBool("IsSquat", false);
            }
            else if (ExerciseName == "팔굽혀펴기")
            {
                animator.SetBool("IsPushUp", false);
            }
            else if (ExerciseName == "바이시클 크런치")
            {
                animator.SetBool("IsSitUp", false);
            }
            else if (ExerciseName == "팔벌려높이뛰기")
            {
                animator.SetBool("IsJumpingJack", false);
            }
            else if (ExerciseName == "버피테스트")
            {
                animator.SetBool("IsBurpee", false);
            }
        }
        else
        {
            if (ExerciseName == "스쿼트")
            {
                animator.SetBool("IsSquat", true);
            }
            else if (ExerciseName == "팔굽혀펴기")
            {
                animator.SetBool("IsPushUp", true);
            }
            else if (ExerciseName == "바이시클 크런치")
            {
                animator.SetBool("IsSitUp", true);
            }
            else if (ExerciseName == "팔벌려높이뛰기")
            {
                animator.SetBool("IsJumpingJack", true);
            }
            else if (ExerciseName == "버피테스트")
            {
                animator.SetBool("IsBurpee", true);
            }
        }
    }
}

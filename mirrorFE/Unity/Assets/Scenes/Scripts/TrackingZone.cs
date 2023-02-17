using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using UnityEngine;

public class TrackingZone : MonoBehaviour
{
    public Vector2Int minXAndY; //x,y 최솟값
    public Vector2Int maxXAndY; //x,y 최댓값
    public Color mainColor = new Color(0.0f, 1.0f, 1.0f, 1.0f); //메인 라인 컬러 
    // Start is called before the first frame update
    public Mesh titleMesh;

    [Range(0.0f, 10.0f)]
    public float titleXpos = 1.0f; //타이틀 좌우조절

    [Range(-1.0f, 1.0f)]
    public float titleYpos = 1.0f; //타이틀 상하조절

    [Range(0.0f, 1.0f)]
    public float titleSize = 1.0f; //타이틀 크기조절


    private void OnDrawGizmos()
    {
        Color subColor = new Color(mainColor.r, mainColor.g, mainColor.b, 0.1f * mainColor.a); //보조 컬러
        Vector3 titlePos = new Vector3(maxXAndY.x - titleXpos, maxXAndY.y + titleYpos, 0.0f);
        Vector3 titleScale = new Vector3(titleSize, titleSize, titleSize);

        Gizmos.DrawMesh(titleMesh, titlePos, transform.rotation, titleScale);


        for (int x = minXAndY.x; x <= maxXAndY.x; x++) //x축의최솟값이 최댓값보다 작거나 같을때까지 반복
        {
            if (x - maxXAndY.x == 0 || x-minXAndY.x == 0) // x축 값이 최솟값 최댓값 같을 때 실행
            {
                Gizmos.color = mainColor; // 메인컬러 지정
            }
            else
            {
                Gizmos.color = subColor; // 서브컬러 지정
            }

            Vector3 pos1 = new Vector3(x, minXAndY.y, 0); //세로줄 시작점
            Vector3 pos2 = new Vector3(x, maxXAndY.y, 0); //세로줄 끝점

            Gizmos.DrawLine(pos1, pos2); // 시작에서 끝점으로 세로줄을 그린다.
        }

        for (int y = minXAndY.y; y <= maxXAndY.y; y++) //x축의최솟값이 최댓값보다 작거나 같을때까지 반복
        {
            if (y - maxXAndY.y == 0 || y - minXAndY.y == 0) // x축 값이 최솟값 최댓값 같을 때 실행
            {
                Gizmos.color = mainColor; // 메인컬러 지정
            }
            else
            {
                Gizmos.color = subColor; // 서브컬러 지정
            }

            Vector3 pos1 = new Vector3(minXAndY.x, y, 0); //세로줄 시작점
            Vector3 pos2 = new Vector3(maxXAndY.x, y, 0); //세로줄 끝점

            Gizmos.DrawLine(pos1, pos2); // 시작에서 끝점으로 세로줄을 그린다.
        }




    }

}

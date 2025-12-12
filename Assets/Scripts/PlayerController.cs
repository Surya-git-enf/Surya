using UnityEngine;

// Spawns colored cubes on click/tap and rotates cubes tagged "SpawnedCube".
public class PlayerController : MonoBehaviour
{
    void Update()
    {
        // rotate cubes tagged "SpawnedCube"
        var cubes = GameObject.FindGameObjectsWithTag("SpawnedCube");
        foreach (var c in cubes)
        {
            c.transform.Rotate(Vector3.up * 30f * Time.deltaTime);
        }

        // spawn on mouse click / tap
        if (Input.GetMouseButtonDown(0))
        {
            Vector3 spawnPos = Vector3.zero;
            var cam = Camera.main;
            if (cam != null)
            {
                Ray ray = cam.ScreenPointToRay(Input.mousePosition);
                if (Physics.Raycast(ray, out RaycastHit hit))
                {
                    spawnPos = hit.point;
                }
                else
                {
                    // spawn 5 units in front of camera if no ground
                    spawnPos = cam.transform.position + cam.transform.forward * 5f;
                }
            }

            GameObject newCube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            newCube.transform.position = spawnPos;
            newCube.tag = "SpawnedCube";

            // color and scale
            var rend = newCube.GetComponent<Renderer>();
            if (rend != null) rend.material.color = new Color(Random.value, Random.value, Random.value);
        }
    }
}

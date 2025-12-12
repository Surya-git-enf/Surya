using UnityEngine;

// Ensures a main camera, directional light, ground plane, and a controller object with PlayerController.
[DefaultExecutionOrder(-100)]
public class GameInitializer : MonoBehaviour
{
    void Awake()
    {
        // Ensure camera
        if (Camera.main == null)
        {
            GameObject camObj = new GameObject("Main Camera");
            camObj.tag = "MainCamera";
            var cam = camObj.AddComponent<Camera>();
            cam.transform.position = new Vector3(0, 2, -10);
            cam.transform.LookAt(Vector3.zero);
        }

        // Ensure directional light
        if (FindObjectOfType<Light>() == null)
        {
            GameObject lightObj = new GameObject("Directional Light");
            var light = lightObj.AddComponent<Light>();
            light.type = LightType.Directional;
            light.transform.rotation = Quaternion.Euler(50f, -30f, 0f);
        }

        // Ground plane for clicking
        if (GameObject.Find("Ground") == null)
        {
            GameObject ground = GameObject.CreatePrimitive(PrimitiveType.Plane);
            ground.name = "Ground";
            ground.transform.position = Vector3.zero;
            ground.transform.localScale = new Vector3(5, 1, 5);
            var rend = ground.GetComponent<Renderer>();
            if (rend != null) rend.material.color = new Color(0.7f, 0.7f, 0.7f);
        }

        // Controller holder with PlayerController
        var controllerHolder = GameObject.Find("Controller");
        if (controllerHolder == null)
        {
            controllerHolder = new GameObject("Controller");
            controllerHolder.AddComponent<PlayerController>();
        }
    }
}

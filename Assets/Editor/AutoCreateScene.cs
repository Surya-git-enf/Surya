#if UNITY_EDITOR
using UnityEditor;
using UnityEngine;
using UnityEditor.SceneManagement;
using System.IO;

[InitializeOnLoad]
public class AutoCreateScene
{
    static AutoCreateScene()
    {
        EditorApplication.delayCall += EnsureScene;
    }

    static void EnsureScene()
    {
        string scenesPath = "Assets/Scenes";
        if (!Directory.Exists(scenesPath))
            Directory.CreateDirectory(scenesPath);

        string scenePath = Path.Combine(scenesPath, "Main.unity");
        if (!File.Exists(scenePath))
        {
            // Create a new scene
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            // Create the GameInitializer GameObject
            GameObject init = new GameObject("Initializer");
            init.AddComponent<GameInitializer>();

            // Save scene
            EditorSceneManager.SaveScene(scene, scenePath);
            Debug.Log("AutoCreateScene: Created scene at " + scenePath);
        }

        // Ensure scene is in Build Settings
        var scenes = EditorBuildSettings.scenes;
        bool exists = false;
        foreach (var s in scenes)
        {
            if (s.path == "Assets/Scenes/Main.unity") { exists = true; break; }
        }
        if (!exists)
        {
            var list = new System.Collections.Generic.List<EditorBuildSettingsScene>(scenes);
            list.Add(new EditorBuildSettingsScene("Assets/Scenes/Main.unity", true));
            EditorBuildSettings.scenes = list.ToArray();
            Debug.Log("AutoCreateScene: Added Main.unity to Build Settings.");
        }
    }
}
#endif

# Unity Auto Game (minimal)

This repository is a minimal Unity project to test WebGL and Android builds via Unity Cloud Build.

## How to use
1. Open in Unity (2022.3 LTS recommended).
2. The Editor script will auto-create `Assets/Scenes/Main.unity` and add it to Build Settings.
3. Press Play to test locally.
4. Commit & push to GitHub and provide the repo URL to your FastAPI backend's `/build` endpoint (example: `https://your-render-service/build`).

## Files
- `Assets/Scripts/PlayerController.cs` - runtime input + spawn
- `Assets/Scripts/GameInitializer.cs` - setup camera, lights, ground
- `Assets/Editor/AutoCreateScene.cs` - editor helper to create the scene automatically
- `Packages/manifest.json` - minimal packages
- `ProjectSettings/ProjectVersion.txt` - Unity editor version

## Notes for Cloud Build
- Make repo public or add Unity Cloud Build's deploy key if private.
- If you require Android signing (keystore), configure signing in Cloud Build settings or upload keystore via API.

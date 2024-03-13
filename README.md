# ScreenNavigation Plugin for Cocos Creator

The ScreenNavigation plugin provides a straightforward and flexible way to manage screen transitions in Cocos Creator projects using the observer pattern. It simplifies the process of switching between screens within a game or application, ensuring that developers can focus more on creating engaging experiences rather than handling the intricacies of screen management.

## Core Files

The plugin consists of the following core files located in `Assets/Scripts/Core/`:

- `BaseScreenComponent.ts`: An abstract base class for screens to extend, facilitating the observer pattern implementation.
- `GameManager.ts`: A central game management script (if applicable, depending on your specific setup).
- `IScreenObserver.ts`: An interface that screen components implement to respond to screen change events.
- `UIManager.ts`: Manages screen transitions and notifies screen components of changes.

## Getting Started

To use the ScreenNavigation plugin in your project, follow these steps:

1. Clone the repository or download the zip file and extract it.
2. Copy the `Assets/Scripts/Core/` directory into your Cocos Creator project's `Assets/Scripts/` directory.
3. Ensure that all screen components in your scene extend `BaseScreenComponent` and are active when the scene loads.

## Example Project

An example project is included as a template to demonstrate how to implement the screen navigation system in your games. Use this template as a reference for setting up your own screen transitions.

## Known Issue

- For the navigation system to work correctly, all screens in the scene must be active when the scene loads. This is a known issue, and contributions are welcome to address it.

## Contributing

Contributions are welcome! If you have a fix for the known issue or any other improvements, please feel free to fork the repository, make your changes, and submit a pull request.


import { _decorator, Button, Component, Node } from 'cc';
import BaseScreenComponent from './Core/BaseScreenComponent';
import { UIManager } from './Core/UIManager';
import ScreenNames from './Core/GameManager';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('MainMenuScreen')
export default class MainMenuScreen extends BaseScreenComponent {

    // assigned to button from inspector
    private onPlayButtonClicked(): void {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.Category.toString()); 
    }
    // assigned to button from inspector
    private onSettingsButtonClicked(): void {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.Settings.toString()); 
    }
}


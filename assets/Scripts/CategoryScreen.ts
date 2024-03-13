import { _decorator, Button, Component, Node } from 'cc';
import BaseScreenComponent from './Core/BaseScreenComponent';
import ScreenNames, { GameMode, GamePlayStartType } from './Core/GameManager';
import { UIManager } from './Core/UIManager';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('CategoryScreen')
export class CategoryScreen extends BaseScreenComponent {
    @property(Button)
    modeButtons : Button[] = [];

    @property(Button)
    closeButton : Button = null;


    onLoad(): void {
        super.onLoad();
        this.setupScreenButtons();
    }

    private setupScreenButtons(): void {
        for(let i=0;i<this.modeButtons.length;i++)
        {
            this.modeButtons[i].node.on('click',()=>{this.onModeSelected(i);}, this);
        }

        this.closeButton.node.on('click',this.onCloseClicked,this);
    }

    onModeSelected(md : GameMode)
    {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.Gameplay.toString(),{gameStartType : GamePlayStartType.new_game,mode:md});
    }

    onCloseClicked()
    {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.MainMenu.toString());
    }

}


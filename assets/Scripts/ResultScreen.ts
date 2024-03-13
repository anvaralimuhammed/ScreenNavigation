import { _decorator, Component, director, Node, ParticleSystem2D } from 'cc';
import BaseScreenComponent from './Core/BaseScreenComponent';
import { UIManager } from './Core/UIManager';
import ScreenNames, { GamePlayStartType } from './Core/GameManager';
import { AudioManager, Audios } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('ResultScreen')
export class ResultScreen extends BaseScreenComponent {
   
    @property(Node)
    failedImg : Node = null;

    @property(Node)
    successImg : Node = null;

    @property(Node)
    nextLevelBtn : Node = null;

    @property(ParticleSystem2D)
    vfxEffect : ParticleSystem2D = null;

    protected onShow(params?: any): void {
        super.onShow(params);
        this.vfxEffect.resetSystem();
        this.vfxEffect.node.active = false;
        if(params)
        {
            this.showResult(params.isBalanced);
        }else
        {
           console.error("Screen params not found");
        }
    }

    private showResult(isBalanced:boolean)
    {
        AudioManager.getInstance().playSoundSfx(isBalanced?Audios.Win : Audios.Fail);
        this.failedImg.active = !isBalanced;
        this.successImg.active = isBalanced;
        this.nextLevelBtn.active = isBalanced;
        if(isBalanced)
        {
            this.vfxEffect.node.active = true;
        }
    }

    private onRestartButtonClicked()
    {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.Gameplay.toString(),{gameStartType : GamePlayStartType.restart});
    }

    private onNextLevelBtnClicked()
    {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.Gameplay.toString(),{gameStartType : GamePlayStartType.next_level});
    }

    private onHomeButtonClicked()
    {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.MainMenu.toString());
    }

}


import { _decorator, Component, Node, Sprite } from 'cc';
import BaseScreenComponent from './Core/BaseScreenComponent';
import { UIManager } from './Core/UIManager';
import ScreenNames from './Core/GameManager';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('SettingsScreen')
export class SettingsScreen extends BaseScreenComponent {
    
    @property(Sprite)
    musicVolFil : Sprite = null;

    @property(Sprite)
    soundVolFil : Sprite = null;

    private currentMusicVol =1;
    private currentSoundVol =1;

    volFactor = 0.1;

    protected onShow(params?: any): void {
        super.onShow(params);
        this.setCurrentVolume();
    }

    private setCurrentVolume()
    {
        this.currentMusicVol = AudioManager.getInstance().getMusicVol();
        this.currentSoundVol = AudioManager.getInstance().getSoundVol();
        this.capMusicVolumeValue();
        this.capSoundVolumeValue();
    }

    private increaseMusicVol()
    {
        AudioManager.getInstance().buttonClickSound();
        this.currentMusicVol += this.volFactor;
        this.capMusicVolumeValue();
    }
    private decreaseMusicVol()
    {
        AudioManager.getInstance().buttonClickSound();
        this.currentMusicVol -= this.volFactor;
        this.capMusicVolumeValue();
    }

    private increaseSoundVol()
    {
        AudioManager.getInstance().buttonClickSound();
        this.currentSoundVol += this.volFactor;
        this.capSoundVolumeValue();
    }
    private decreaseSoundVol()
    {
        AudioManager.getInstance().buttonClickSound();
        this.currentSoundVol -= this.volFactor;
        this.capSoundVolumeValue();
    }

    private capMusicVolumeValue()
    {
        if(this.currentMusicVol > 1)
        {
            this.currentMusicVol = 1;
        }
        if(this.currentMusicVol < 0)
        {
            this.currentMusicVol = 0;
        }
        this.musicVolFil.fillRange = this.currentMusicVol;
        AudioManager.getInstance().setMusicVol(this.currentMusicVol);
    }

    private capSoundVolumeValue()
    {
        if(this.currentSoundVol > 1)
        {
            this.currentSoundVol = 1;
        }
        if(this.currentSoundVol < 0)
        {
            this.currentSoundVol = 0;
        }
        this.soundVolFil.fillRange = this.currentSoundVol;
        AudioManager.getInstance().setSoundVol(this.currentSoundVol);
    }
    onCloseClicked()
    {
        AudioManager.getInstance().buttonClickSound();
        UIManager.getInstance().changeScreen(ScreenNames.MainMenu.toString());
    }

}


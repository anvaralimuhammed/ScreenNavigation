import { _decorator, AudioClip, AudioSource, ccenum, Component, Enum, Node } from 'cc';
const { ccclass, property} = _decorator;

const musicVol = "Music";
const soundVol = "Sound";

export enum Audios {
    None,
    Click,
    Win,
    Fail, 
}
Enum(Audios);
@ccclass("AudioData")
export class AudioData
{
    @property ({type:Audios})
    name: Audios = Audios.None;
    @property(AudioClip)
    clip : AudioClip = null;
}

@ccclass('AudioManager')
export class AudioManager extends Component {

    private static instance: AudioManager;

    @property(AudioSource)
    musicSource : AudioSource=null;
    @property(AudioSource)
    soundSource : AudioSource=null;

    @property(AudioData)
    audioData : AudioData[]=[];
    
    private currentMusicVol = 1;
    private currentSoundVol = 1;
    onLoad() {
        AudioManager.instance = this;
        this.loadSavedVoulmeData();
    }

    public static getInstance(): AudioManager {
        return AudioManager.instance;
    }

    private loadSavedVoulmeData()
    {
        if (localStorage.getItem(musicVol) == null)
        {
            localStorage.setItem(musicVol,this.currentMusicVol.toString());
        }else
        {
            this.currentMusicVol = parseFloat(localStorage.getItem(musicVol));
        }
        if(localStorage.getItem(soundVol) == null)
        {
            localStorage.setItem(soundVol,this.currentSoundVol.toString());
        }else
        {
            this.currentSoundVol = parseFloat(localStorage.getItem(soundVol));
        }
        this.soundSource.volume = this.currentSoundVol;
        this.musicSource.volume = this.currentMusicVol;
    }

    public setSoundVol(vol)
    {
        this.currentSoundVol = vol;
        localStorage.setItem(soundVol,this.currentSoundVol.toString());
        this.soundSource.volume = this.currentSoundVol;
    }
    public setMusicVol(vol)
    {
        this.currentMusicVol = vol;
        localStorage.setItem(musicVol,this.currentMusicVol.toString());
        this.musicSource.volume = this.currentMusicVol;
    }

    public getSoundVol():number
    {
        return this.currentSoundVol;
    }
    public getMusicVol():number
    {
        return this.currentMusicVol;
    }

    public buttonClickSound()
    {
        this.playSoundSfx(Audios.Click);
    }

    playSoundSfx(audioName : Audios)
    {
        let clipData =  this.audioData.find(x=>x.name == audioName);
        if(clipData)
        {
            this.soundSource.playOneShot(clipData.clip);
        }else
        {
            console.log("Audio data not found for name:", audioName);
        }
    }
}




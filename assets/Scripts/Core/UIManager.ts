import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    private static instance: UIManager;
    private observers: IScreenObserver[] = [];
    private currentScreen: string = "";

    onLoad() {
        UIManager.instance = this;
    }

    public static getInstance(): UIManager {
        return UIManager.instance;
    }

    public registerObserver(observer: IScreenObserver) {
        this.observers.push(observer);
    }

    protected onDestroy(): void {
        this.observers = [];
    }

    public changeScreen(screenName: string,params?: any) {
        this.currentScreen = screenName;
        this.notifyObservers(params);
    }

    public getCurrentScreen(): string {
        return this.currentScreen;
    }

    private notifyObservers(params?: any) {
        for (const observer of this.observers) {
            observer.onScreenChange(this.currentScreen,params);
        }
    }


}


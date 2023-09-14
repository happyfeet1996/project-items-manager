import { Component, ViewChild } from "@angular/core";
import { Tab2Page } from "./tab2.page";
import { NavDelegate } from "@ionic/angular";

@Component({
    selector: "tab2-root",
    template: `
        <ion-nav [root]="component" [swipeGesture]="true" #nav></ion-nav>
    `,
})

export class Tab2RootComponent{

    component = Tab2Page;
    @ViewChild("nav")
    nav!: any
    
    ionViewDidEnter(){
        
    }

}
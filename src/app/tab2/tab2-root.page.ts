import { Component } from "@angular/core";
import { Tab2Page } from "./tab2.page";

@Component({
    selector: "tab2-root",
    template: `
        <ion-nav [root]="component"></ion-nav>
    `,
})

export class Tab2RootComponent{

    component = Tab2Page

}
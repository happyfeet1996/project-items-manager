import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { ProjectItemsEditorComponent } from './project-items-editor/project-items-editor.component';
import { SharedModule } from '../shared/shared.module';
import { Tab2RootComponent } from './tab2-root.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    NgZorroAntdMobileModule,
    SharedModule
  ],
  declarations: [Tab2Page,Tab2RootComponent,ProjectItemsEditorComponent]
})
export class Tab2PageModule {}

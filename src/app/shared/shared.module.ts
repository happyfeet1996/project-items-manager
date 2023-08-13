import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectItemCardComponent } from './project-item-card/project-item-card.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProjectItemEditCardComponent } from './project-item-edit-card/project-item-edit-card.component';
import { CommonModule } from '@angular/common';
import { EmptyDataComponent } from './empty-data/empty-data.component';


@NgModule({
  imports: [
    NgZorroAntdMobileModule,
    IonicModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    ProjectItemCardComponent, ProjectItemEditCardComponent, EmptyDataComponent
  ],
  exports: [ProjectItemCardComponent, ProjectItemEditCardComponent, EmptyDataComponent]
})
export class SharedModule {}

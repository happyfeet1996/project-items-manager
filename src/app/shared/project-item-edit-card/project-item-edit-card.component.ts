import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectItemCardComponent } from '../project-item-card/project-item-card.component';
import { ProjectItem } from '../project-item';

@Component({
  selector: 'project-item-edit-card',
  templateUrl: './project-item-edit-card.component.html',
  styleUrls: [],
})
export class ProjectItemEditCardComponent extends ProjectItemCardComponent {

  @Output("onEdit")
  onEdit = new EventEmitter<ProjectItem>();

  @Input("onDelete")
  onDelete = new EventEmitter<ProjectItem>();

  callEditFun(){
    this.onEdit.emit(this.projectItem);
  }

  callDeleteFun(){
    this.onDelete.emit(this.projectItem);
  }

}

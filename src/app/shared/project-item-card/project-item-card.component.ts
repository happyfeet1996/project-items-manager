import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectItem } from '../project-item';
import { ModalService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'project-item-card',
  templateUrl: './project-item-card.component.html',
  styleUrls: [],
})
export class ProjectItemCardComponent  implements OnInit {

  @Input("projectItem")
  projectItem!: ProjectItem;

  @Output("dataChanged")
  dataChanged = new EventEmitter<any>();

  thumbStyle = {
    width: '32px',
    height: '32px'
  };

  constructor(
    private _modal: ModalService
  ) { }

  ngOnInit() {}

  showFinishConfirm(){
    this._modal.alert('完成', '确定都完成了吗？', [
      { text: '取消', onPress: () => {}  },
      { text: '确定', onPress: () => {
        this.projectItem.childItems.forEach(item=>item.finished=true);
        this.dataChanged.emit();
      } }
    ]);
  }

  showNotFinishConfirm(){
    this._modal.alert('未完成', '确定都没有完成吗？', [
      { text: '取消', onPress: () => {}  },
      { text: '确定', onPress: () => {
        this.projectItem.childItems.forEach(item=>item.finished=false);
        this.dataChanged.emit();
      }}
    ]);
  }

}

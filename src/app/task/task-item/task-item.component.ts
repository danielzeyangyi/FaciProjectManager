import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { itemAnim } from 'src/app/animation/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnim
  ],
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() taskClicked = new EventEmitter<void>();
  itemBorderWidthAnmi = 'out';

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.itemBorderWidthAnmi = 'hover';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.itemBorderWidthAnmi = 'out';
  }

  onItemClick() {
    this.taskClicked.emit();
  }

  onCheckboxClick(ev : Event) {
    ev.stopPropagation();
  }

}

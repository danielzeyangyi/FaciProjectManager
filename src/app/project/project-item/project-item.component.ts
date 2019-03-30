import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../animation/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() projectEditClicked = new EventEmitter<void>();
  @Output() projectDeleted = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';
  
  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cardState = 'out';
  }

  onInviteClick() {
    this.onInvite.emit();
  }

  onProjectEditClick() {
    this.projectEditClicked.emit();
  }

  onDelClick() {
    this.projectDeleted.emit();
  }
  
}

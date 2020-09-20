import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-group-list',
  templateUrl: './small-group-list.component.html',
  styleUrls: ['./small-group-list.component.scss']
})
export class SmallGroupListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openSmallGroupDialog(): void {

  }

  /**
   * Apply the filtering of small groups
   *
   * @param event The event instance
   */
  applyFilter(event: Event): void {

  }
}

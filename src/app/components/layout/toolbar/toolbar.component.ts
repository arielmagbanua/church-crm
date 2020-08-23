import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private navService: NavigationService) { }

  ngOnInit(): void {
  }

  toggleDrawer(): void {
    this.navService.toggleDrawer();
  }
}

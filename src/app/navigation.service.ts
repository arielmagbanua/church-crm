import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**
   * The open state of the drawer.
   */
  private drawerOpen = false;

  /**
   * Toggle drawer subject
   */
  onToggleDrawer = new Subject<boolean>();

  /**
   * Toggle the drawer
   *
   * @return void
   */
  toggleDrawer(): void {
    console.log('toggleDrawer()');
    this.drawerOpen = !this.drawerOpen;
    this.onToggleDrawer.next(this.drawerOpen);
  }
}

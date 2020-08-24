import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NavigationService } from '../../navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  /**
   * The drawer toggle subscription
   */
  drawerToggleSubscription: Subscription;

  /**
   * The drawer reference instance
   */
  @ViewChild('drawer') drawer;

  constructor(private navService: NavigationService) { }

  /**
   * Initialize subscriptions here
   */
  ngOnInit(): void {
    // subscribe to drawer toggle subject
    this.drawerToggleSubscription = this.navService.onToggleDrawer
      .subscribe((open: boolean) => {
        if (open) {
          return this.drawer.open();
        }

        return this.drawer.close();
      });
  }

  /**
   * Unsubscribe subscriptions or purge data here.
   */
  ngOnDestroy(): void {
    this.drawerToggleSubscription.unsubscribe();
  }
}

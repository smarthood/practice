import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  mode: MatDrawerMode = 'side';
  foods = ['pizza', 'burger', 'idly'];
  onChange(e: any) {
    console.log(e.value);
  }
  onClick() {
    this.drawer.toggle();
  }
  constructor(private mediaObserver: MediaObserver) {}
  private mediaSubscription!: Subscription;
  private activeMediaQuery = '';

  ngOnInit(changes: SimpleChanges): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.mediaSubscription = this.mediaObserver
      .asObservable()
      .subscribe((change) => {
        change.forEach((item) => {
          this.activeMediaQuery = item
            ? `'${item.mqAlias}' = (${item.mediaQuery})`
            : '';
          if (item.mqAlias === 'lt-md') {
            this.drawer.close();
            this.mode = 'over';
            this.loadMobileContent();
          } else if (item.mqAlias === 'md') {
            this.drawer.open();
            this.mode = 'side';
            this.executeFunctionForLargeScreen();
          }
        });
      });
  }
  executeFunctionForLargeScreen() {
    console.log('large');
    // Do something special since the viewport is currently
    // using a large display size.
  }
  loadMobileContent() {
    console.log('small');

    // Do something special since the viewport is currently
    // using mobile display sizes.
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }
  sidenavoptions: any[] = [
    { name: 'Table', url: '/main/table', icon: 'table_view' },
    { name: 'Form', url: '/main/form', icon: 'dashboard' },
    { name: 'Dialog', url: '/main/dialog', icon: 'rectangle' },
    { name: 'SnackBar', url: '/main/snackbar', icon: 'dns' },
    { name: 'Life-Cycle-Hooks', url: '/main/lifecycle', icon: 'cached' },
    { name: 'Practice', url: '/main/parent', icon: 'pan_tool' },
    { name: 'Login', url: '/main/zogin', icon: 'description' },
  ];
}

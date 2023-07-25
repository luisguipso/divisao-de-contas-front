import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  collapsed = false;
  navData = [
    { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard' },
  ];

  fechaNavBar() {
    this.collapsed = false;
  }

  toggleNavBar() {
    this.collapsed = !this.collapsed;
  }
}

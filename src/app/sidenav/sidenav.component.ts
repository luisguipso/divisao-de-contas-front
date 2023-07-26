import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  collapsed = false;
  navData = [
    { routeLink: 'usuario', icon: 'fal fa-user', label: 'Usuário' },
    { routeLink: 'lista-periodos', icon: 'fal fa-list', label: 'Periodos' },
  ];

  fechaNavBar() {
    this.collapsed = false;
  }

  toggleNavBar() {
    this.collapsed = !this.collapsed;
  }
}

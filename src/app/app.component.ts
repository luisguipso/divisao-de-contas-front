import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Despesas de casa';
  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: any) {
    localStorage.clear();
  }
}

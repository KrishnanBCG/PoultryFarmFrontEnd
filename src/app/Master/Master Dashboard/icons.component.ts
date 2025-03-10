import { Component, HostListener, OnInit } from '@angular/core';

const CUSTOM_ROUTES = [
  { path: '/unitmaster', title: 'Unit Master', icon: '', class: '' },
  { path: '/batchmaster', title: 'Batch Master', icon: '', class: '' }
];

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  isMobile: boolean = false;
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    // Use your custom route array
    this.menuItems = CUSTOM_ROUTES.filter(menuItem => menuItem); 
    this.checkIfMobileMenu();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobileMenu();
  }

  checkIfMobileMenu() {
    this.isMobile = window.innerWidth <= 991;
  }
}

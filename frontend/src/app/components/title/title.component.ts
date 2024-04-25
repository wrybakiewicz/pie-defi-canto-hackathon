import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {

  @Input() glow: boolean = false;

  address!: string | undefined;

  constructor(private router: Router) {}

  isActive(url: string): boolean {
    return this.router.isActive(url, {
      paths: 'subset',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored'
    });
  }

  onDelete() {
    this.address = '';
  }

  onSearch() {

  }
}

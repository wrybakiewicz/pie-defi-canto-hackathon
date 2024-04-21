import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], // Include CommonModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  isActive(url: string): boolean {
    // Check if the current route's URL matches the given URL
    return this.router.isActive(url, {
      paths: 'subset', // This can be 'exact' for exact matching or 'subset' for partial matching
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored'
    });
  }
}

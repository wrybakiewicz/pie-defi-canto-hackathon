import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ComponentsModule } from './components/components.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, HeaderComponent, ComponentsModule],
})
export class AppComponent {
  title = 'canto-web-ui';
}

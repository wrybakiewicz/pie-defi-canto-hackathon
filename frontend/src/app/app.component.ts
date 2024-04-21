import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  imports: [
    //External
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //Internal
    HeaderComponent,
    ComponentsModule,
  ],
})
export class AppComponent {
  title = 'canto-web-ui';
}

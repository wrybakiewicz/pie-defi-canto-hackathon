import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapSearch, bootstrapBackspace } from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { TitleComponent } from './title/title.component';



@NgModule({
  declarations: [TitleComponent],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({bootstrapSearch, bootstrapBackspace})
  ],
  exports: [TitleComponent]
})
export class ComponentsModule { }

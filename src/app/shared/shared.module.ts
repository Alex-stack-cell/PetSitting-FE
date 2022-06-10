import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [FormComponent],
})
export class SharedModule {}

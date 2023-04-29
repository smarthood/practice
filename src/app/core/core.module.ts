import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './components/table/table.component';
import { SampleComponent } from './components/sample/sample.component';
import { ChildComponent } from './components/child/child.component';
import { LoginComponent } from './components/login/login.component';
import { DetailComponent } from './components/detail/detail.component';
import { DialogComponent } from './service/dialog/dialog.component';
import { BlockComponent } from './components/block/block.component';
import { BlockPipe } from './service/block.pipe';
@NgModule({
  declarations: [
    SideNavComponent,
    TableComponent,
    SampleComponent,
    ChildComponent,
    LoginComponent,
    DetailComponent,
    DialogComponent,
    BlockComponent,
    BlockPipe,
  ],
  imports: [CommonModule, MaterialModule],
})
export class CoreModule {}

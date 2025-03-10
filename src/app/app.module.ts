import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UnitMasterComponent } from './Master/unit-master/unit-master.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { BatchMasterComponent } from './Master/batch-master/batch-master.component';
// import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgxSelectModule } from 'ngx-select-ex';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { EntryDashboardComponent } from './Entrys/entry-dashboard/entry-dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DeadEntryComponent } from './Entrys/dead-entry/dead-entry.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DeadEntryReportComponent } from './Entrys/dead-entry-report/dead-entry-report.component';
import { NbThemeModule, NbLayoutModule, NbPopoverModule, NbButtonModule, NbIconModule } from '@nebular/theme';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
    // SelectDropDownModule
    NgxSelectModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,MatPaginatorModule, MatTableModule,
    MatSortModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UnitMasterComponent,
    LoginComponent,
    BatchMasterComponent,
    EntryDashboardComponent,
    DeadEntryComponent,
    DeadEntryReportComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../Master/Master Dashboard/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UnitMasterComponent } from 'app/Master/unit-master/unit-master.component';
import { LoginComponent } from 'app/login/login.component';
import { BatchMasterComponent } from 'app/Master/batch-master/batch-master.component';
import { EntryDashboardComponent } from 'app/Entrys/entry-dashboard/entry-dashboard.component';
import { DeadEntryComponent } from 'app/Entrys/dead-entry/dead-entry.component';
import { DeadEntryReportComponent } from 'app/Entrys/dead-entry-report/dead-entry-report.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'login',      component: LoginComponent },
    { path: 'batchmaster',      component: BatchMasterComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'entry-list',   component: EntryDashboardComponent },
    { path: 'Master',          component: IconsComponent },
    { path: 'unitmaster',          component: UnitMasterComponent },
    { path: 'deadEntry/:id',          component: DeadEntryComponent },
    { path: 'deadEntryReport/:id',          component: DeadEntryReportComponent },

    
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },

    // private tenandId = localStorage.getItem("tenantId");
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventComponent } from './components/event/event.component';
import { LandingComponent } from './components/landing/landing.component';
import { CompanyComponent } from './components/registration/company/company.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StudentComponent } from './components/registration/student/student.component';
import { TeacherComponent } from './components/registration/teacher/teacher.component';
import { SuccessComponent } from './components/success/success.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
        {
          path: '', component: LandingComponent,
        },
        {
          path: 'manage', component: EventComponent,
        },
        {
          path: 'manage/event/:id', component: EventDetailsComponent,
        },
        {
          path: 'registration', component: RegistrationComponent,
        },
        {
          path: 'registration/student', component: StudentComponent,
        },
        {
          path: 'registration/educator', component: TeacherComponent,
        },
        {
          path: 'registration/company', component: CompanyComponent,
        },
        {
          path: 'registration/success', component: SuccessComponent,
        },

        
    ], 
    { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

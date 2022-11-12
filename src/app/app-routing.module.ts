import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventComponent } from './components/event/event.component';
import { LandingComponent } from './components/landing/landing.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
        // {path: '', component: LandingComponent},
        {
          path: '', component: LandingComponent,
        },
        {
          path: 'manage', component: EventComponent,

        },
        {
          path: 'manage/event/:id', component: EventDetailsComponent,
        }

        
    ], 
    { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

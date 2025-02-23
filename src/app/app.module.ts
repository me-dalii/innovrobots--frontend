import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { ChipModule } from "primeng/chip";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from 'primeng/rating';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PasswordModule } from 'primeng/password';
import { SliderModule } from 'primeng/slider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { LandingComponent } from './components/landing/landing.component';
import { EventComponent } from './components/event/event.component';
import { TagModule } from 'primeng/tag';
import {ImageModule} from 'primeng/image';
import {CardModule} from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import {MenubarModule} from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import {CarouselModule} from 'primeng/carousel';
import {ScrollTopModule} from 'primeng/scrolltop';
import { RegistrationComponent } from './components/registration/registration.component';
import { TeacherComponent } from './components/registration/teacher/teacher.component';
import { CompanyComponent } from './components/registration/company/company.component';
import { StudentComponent } from './components/registration/student/student.component';
import { SuccessComponent } from './components/success/success.component';
import { SafePipe } from './pipes/safe.pipe';
import {GalleriaModule} from 'primeng/galleria';
import { PreviousEditionsComponent } from './components/previous-editions/previous-editions.component';
import { LiveComponent } from './components/live/live.component';
import { PeDetailsComponent } from './components/previous-editions/pe-details/pe-details.component';
import { PeAllComponent } from './components/previous-editions/pe-all/pe-all.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    EventComponent,
    EventDetailsComponent,
    RegistrationComponent,
    TeacherComponent,
    CompanyComponent,
    StudentComponent,
    SuccessComponent,
    SafePipe,
    PreviousEditionsComponent,
    LiveComponent,
    PeDetailsComponent,
    PeAllComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SkeletonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DividerModule,
    CommonModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    TimelineModule,
    TabViewModule,
    CheckboxModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    ColorPickerModule,
    CascadeSelectModule,
    MultiSelectModule,
    ToggleButtonModule,
    SliderModule,
    InputTextareaModule,
    RadioButtonModule,
    InputTextModule,
    RatingModule,
    ChipModule,
    KnobModule,
    InputSwitchModule,
    ListboxModule,
    SelectButtonModule,
    OverlayPanelModule,
    PasswordModule,
    MenuModule,
    FileUploadModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    DataViewModule,
    DialogModule,
    ConfirmDialogModule,
    AccordionModule,
    SplitterModule,
    SplitButtonModule,
    TableModule,
    TagModule,
    ImageModule,
    CardModule,
    MenubarModule,
    RippleModule,
    CarouselModule,
    ScrollTopModule,
    GalleriaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

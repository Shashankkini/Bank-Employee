import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from './profile/profile.component' ; //C:\Users\Lenovo\Desktop\Internship\ANGULAR\Employee\src\app\profile
import {AppComponent} from './app.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component'
const routes: Routes = [
 // { path: '', redirectTo:'home' ,pathMatch:'full'},
  {path:'home', component:AppComponent},
  { path :'profile', component:ProfileComponent},
  {
    path:'about-us',component:AboutUsComponent
  },
  {
    path:'privacy-policy',component:PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

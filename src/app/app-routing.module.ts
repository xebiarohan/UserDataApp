import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";


const appRoutes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'users', component: UsersComponent, pathMatch: 'full' },
    { path: 'user/:id', component: UserComponent},
    { path: 'user', component: UserComponent},
    { path: '**', redirectTo: '' },
  ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]

})
export class AppRoutingModule { }
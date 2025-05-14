import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PartyRoomComponent } from './components/party-room/party-room.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-fire', component: PartyRoomComponent },
  { path: '**', redirectTo: '' },
];

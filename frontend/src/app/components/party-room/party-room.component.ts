import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface PartySettings {
  name: string;
  isPrivate: boolean;
  allowExplicit: boolean;
  maxQueuePerUser: number;
}

@Component({
  selector: 'app-party-room',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './party-room.component.html',
  styleUrls: ['./party-room.component.scss'],
})
export class PartyRoomComponent {
  currentStep = signal<number>(1);
  totalSteps = 3;

  partySettings = signal<PartySettings>({
    name: '',
    isPrivate: false,
    allowExplicit: true,
    maxQueuePerUser: 3,
  });

  nextStep() {
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update((step) => step + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
    }
  }

  updateName(value: string) {
    // Trim whitespace and limit to reasonable length
    const processedValue = value.trim().substring(0, 50);

    this.partySettings.update((settings) => ({
      ...settings,
      name: processedValue,
    }));
  }

  updatePrivacy(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target);
    const isPrivate = target.checked;

    this.partySettings.update((settings) => ({
      ...settings,
      isPrivate,
    }));
  }

  updateExplicitContent(allowExplicit: boolean) {
    this.partySettings.update((settings) => ({
      ...settings,
      allowExplicit,
    }));
  }

  updateMaxSongsPerUser(value: number) {
    // Ensure value is within acceptable range
    const processedValue = Math.min(Math.max(1, value), 10);

    this.partySettings.update((settings) => ({
      ...settings,
      maxQueuePerUser: processedValue,
    }));
  }

  createParty() {
    // Validate before creating
    if (!this.partySettings().name) {
      alert('Please provide a name for your fire');
      this.currentStep.set(1);
      return;
    }

    // This would connect to a service to actually create the party
    console.log('Creating party with settings:', this.partySettings());

    // For demo purposes, let's simulate a successful creation
    alert(
      `Fire "${
        this.partySettings().name
      }" created! Share this link with friends: ${window.location.href}`
    );
  }
}

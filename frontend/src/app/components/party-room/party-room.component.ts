import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface PartySettings {
  name: string;
  isPrivate: boolean;
  maxQueuePerUser: number;
}

@Component({
  selector: 'app-party-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './party-room.component.html',
  styleUrls: ['./party-room.component.scss'],
})
export class PartyRoomComponent implements OnInit {
  currentStep = signal<number>(1);
  totalSteps = 3;
  partyForm!: FormGroup;

  partySettings = signal<PartySettings>({
    name: '',
    isPrivate: false,
    maxQueuePerUser: 3,
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();

    // Subscribe to form value changes to update the settings signal
    this.partyForm.valueChanges.subscribe((values) => {
      this.partySettings.set({
        name: values.name?.trim().substring(0, 50) || '',
        isPrivate: values.isPrivate || false,
        maxQueuePerUser: Math.min(Math.max(1, values.maxQueuePerUser || 3), 10),
      });
    });
  }

  initForm(): void {
    this.partyForm = this.fb.group({
      name: [
        this.partySettings().name,
        [Validators.required, Validators.maxLength(50)],
      ],
      isPrivate: [this.partySettings().isPrivate],
      maxQueuePerUser: [
        this.partySettings().maxQueuePerUser,
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
    });
  }

  nextStep() {
    if (this.currentStep() < this.totalSteps) {
      // For step 1, validate the name field
      if (this.currentStep() === 1 && this.partyForm.get('name')?.invalid) {
        this.partyForm.get('name')?.markAsTouched();
        return;
      }
      this.currentStep.update((step) => step + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
    }
  }

  // Add this method to help with toggle interaction
  togglePrivacy() {
    const currentValue = this.partyForm.get('isPrivate')?.value;
    this.partyForm.get('isPrivate')?.setValue(!currentValue);
  }

  createParty() {
    if (this.partyForm.invalid) {
      this.partyForm.markAllAsTouched();

      // Navigate to the first step with errors
      if (this.partyForm.get('name')?.invalid) {
        this.currentStep.set(1);
      }
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

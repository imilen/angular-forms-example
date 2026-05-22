import { Component, signal } from '@angular/core';
import { PaymentSignalForm } from './payment-signal-form/payment-signal-form';

@Component({
  selector: 'app-root',
  imports: [PaymentSignalForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-forms-example');
}

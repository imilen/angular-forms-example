import { Component, signal } from '@angular/core';
import { PaymentForm } from './payment-form/payment-form';

@Component({
  selector: 'app-root',
  imports: [PaymentForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-forms-example');
}

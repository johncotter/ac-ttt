import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BrowserStorageService } from './services/browser-storage.service';

@Component({
  selector: 'i-n-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  date = new FormControl(new Date());

  tasks = [
    { label: 'Check mail', id: 1 },
    { label: 'Check campsite', id: 2 },
    { label: 'Check for special visitors', id: 3 },
    { label: 'Check beach for DIY', id: 4 },
    { label: 'Login to Nook ATM', id: 5 },
    { label: 'Check recycle bin', id: 6 },
    { label: 'Purchase items from Nook Shopping', id: 7 },
    { label: 'Check Nooks Cranny', id: 8 },
    { label: 'Check Mabel’s', id: 9 },
    { label: 'Morning DIY from villagers', id: 10 },
    { label: 'Afternoon DIY from villagers', id: 11 },
    { label: 'Evening DIY from villagers', id: 12 },
    { label: 'Talk to all villagers', id: 13 },
    { label: 'Give gifts to all villagers', id: 14 },
    { label: 'Dig up 4 fossils', id: 15 },
    { label: 'Dig up bells and replant', id: 16 },
    { label: 'Hit all six rocks', id: 17 },
    { label: 'Shake all trees', id: 18 },
    { label: 'Dive for scallop for Pascal', id: 19 },
    { label: 'Water flowers', id: 20 },
    { label: 'Collect shells on beach', id: 21 },
  ];

  STORAGE_KEY = 'AC_COMPLETED';
  fullCompletion = {};
  daysTasks = {};

  constructor(private storageService: BrowserStorageService) {
    const completionString = storageService.get(this.STORAGE_KEY);
    this.fullCompletion = completionString ? JSON.parse(completionString) : {};
    this.initDaysTasks(this.getDateString());
  }

  changeDate(dayChange: number) {
    this.date.value.setDate(this.date.value.getDate() + dayChange);
    this.date.setValue(this.date.value);
    this.initDaysTasks(this.getDateString(this.date.value));
  }

  getDateString(dateObj = new Date()) {
    return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
  }

  initDaysTasks(day) {
    this.daysTasks = this.fullCompletion[day] || {};
  }

  toggleTask(event: MatCheckboxChange, id: number) {
    this.daysTasks[id] = event.checked;
    console.log(this.getDateString(this.date.value));
    this.fullCompletion[this.getDateString(this.date.value)] = this.daysTasks;

    console.log(this.fullCompletion);
    console.log(JSON.stringify(this.fullCompletion));

    this.storageService.set(
      this.STORAGE_KEY,
      JSON.stringify(this.fullCompletion)
    );
  }
}

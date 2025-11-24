import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css'],
  standalone: true,
  imports: [RouterLink],
})
export class MainPage { }

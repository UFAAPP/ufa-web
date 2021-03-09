import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-lawsuit',
  templateUrl: './new-lawsuit.component.html',
  styleUrls: ['./new-lawsuit.component.scss'],
})
export class NewLawsuitComponent implements OnInit {
  loading = false;
  lwaSuitFormGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}

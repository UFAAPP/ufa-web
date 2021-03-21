import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LawSuit, LAWSUITMASK } from '../../shared/lawsuit-model';

@Component({
  selector: 'app-lawsuit-details-modal',
  templateUrl: './lawsuit-details-modal.component.html',
  styleUrls: ['./lawsuit-details-modal.component.scss'],
})
export class LawsuitDetailsModalComponent implements OnInit {
  lawsuitMask = LAWSUITMASK
  constructor(@Inject(MAT_DIALOG_DATA) public lawsuit: LawSuit) {}

  ngOnInit(): void {}
}

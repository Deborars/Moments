import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MomentService } from '../../../services/moment.service';

import { Moments } from '../../../Moments';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  moment?: Moments;

  constructor(private momentService: MomentService, private route: ActivatedRoute){}

  ngOnInit():void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe( item => this.moment = item.data);
  }
}

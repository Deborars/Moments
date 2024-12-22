
import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Moments } from './../../../Moments';
import { MomentService } from '../../../services/moment.service';
import { environment } from '../../../../environments/environment';
import {formatDate} from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allMoments: Moments[] = [];// array que vem do banco
  moments: Moments[] = []; //array que trará os momentos filtrados
  baseApiUrl = environment.baseApiUrl;

  // todo search
  constructor(private momentService: MomentService){}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      console.log('Requisição feita:', items);
      const data = items.data;

      data.map((item) => {
        item.created_at = formatDate(
  new Date(item.created_at!.split('/').reverse().join('-')),
  'dd/MM/yyyy',
  'pt-BR'
          );
        });

      console.log(data)

      this.allMoments = data;
      this.moments = data;
    });
  }
}

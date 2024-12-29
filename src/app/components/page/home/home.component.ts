
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

  faSearch = faSearch;
  searchTerm : string = '';

  // todo search
  constructor(private momentService: MomentService){}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = formatDate(
  new Date(item.created_at!.split('/').reverse().join('-')),
  'dd/MM/yyyy',
  'pt-BR'
          );
        });

      this.allMoments = data;
      this.moments = data;
    });
  }
  
  search(e: Event):void {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.moments = this.allMoments.filter(moment => moment.title.toLocaleLowerCase().includes(value))
  }
}

import { MomentService } from './../../../services/moment.service';
import { Component } from '@angular/core';
import { Moments } from '../../../Moments';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  btnText = "Compartilhar!";

  constructor(private momentService: MomentService){}

  async createHandler(moments: Moments){
    const formData = new FormData();

    formData.append("title", moments.title);
    formData.append("description", moments.description);

    if(moments.image){
      formData.append("image", moments.image);
    }

    // todo

    // enviar para o service
    await this.momentService.createMoments(formData).subscribe();

    // exibir msg

    // redirect
  }
}

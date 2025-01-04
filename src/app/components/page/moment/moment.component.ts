import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moments } from '../../../Moments';
import { environment } from '../../../../environments/environment';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from '../../../services/message.service';
import { Comment } from '../../../Comment';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  moment?: Moments;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(private momentService: MomentService, private route: ActivatedRoute, private messageService: MessageService, private router: Router, private commentService: CommentService){}

  ngOnInit():void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.momentService.getMoment(id).subscribe( item => this.moment = item.data);

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  removeHandler(id:number){
    this.momentService.removeMoment(id).subscribe({
      next: () =>{
        this.messageService.add('Momento excluído com sucesso!');
        this.router.navigate(['/']); 
      }
    }); 
  }

  onSubmit(formDirective: FormGroupDirective){
    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    this.commentService.createComment(data).subscribe((comment)=> this.moment!.comments!.push(comment.data));
    this.messageService.add('Comentário adicionado!');
    this.commentForm.reset();
    formDirective.resetForm();
  }
}

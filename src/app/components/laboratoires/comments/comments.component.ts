import { Component, OnInit } from '@angular/core';
import { comment } from '@app/core/models/comment';
import { CommentService } from '@app/core/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  formData: comment = {
    id:null,
    updateDate:null,
    creatorMail:null,
    creatorName:null,
    text:null
  }
  laboCommentsList:any[]=[];
  showSpinner:boolean=true;

  constructor(private commentService:CommentService) { }

  ngOnInit(): void {
    this.showSpinner=true;
  this.getAllComments();
  }
  getAllComments(){
    this.commentService.getAllComments().subscribe(res=>{
      this.laboCommentsList=res;
     this.showSpinner=false;
    })
  }
  addComment(){
    delete this.formData.id;
    this.formData.updateDate=new Date();
    this.commentService.createComment(this.formData).subscribe(res=>{
      this.getAllComments()
    })
  }
  removeComment(comment){
    this.commentService.removeComment(comment.id.toString()).subscribe(res=>{
      this.getAllComments()
    });
  }
}

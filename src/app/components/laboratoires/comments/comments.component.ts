import {Component, OnInit} from '@angular/core';
import {comment} from '@app/core/models/comment';
import {CommentService} from '@app/core/services/comment.service';
import {AuthenticationService} from '@auth/services';
import {User} from '@auth/models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  formData: comment = {
    id: null,
    updateDate: null,
    creatorMail: null,
    creatorName: null,
    text: null
  };
  laboCommentsList: any[] = [];
  showSpinner: boolean = true;
  currentUser: User;

  constructor(private commentService: CommentService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.getAllComments();
    this.currentUser = this.authenticationService.getCurrentUser;

    this.formData.creatorName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    this.formData.creatorMail = this.currentUser.email;
  }

  getAllComments() {
    this.commentService.getAllComments().subscribe(res => {
      this.laboCommentsList = res;
      this.showSpinner = false;
    });
  }

  addComment() {
    delete this.formData.id;
    this.formData.updateDate = new Date();
    this.commentService.createComment(this.formData).subscribe(res => {
      this.getAllComments();
    });
  }

  removeComment(comment) {
    this.commentService.removeComment(comment.id.toString()).subscribe(res => {
      this.getAllComments();
    });
  }

  getRandomSrc() {
    let ch = 'https://bootdey.com/img/Content/avatar/avatar';
    return ch + Math.floor(Math.random() * 3) + 1 + '.png';
  }
}

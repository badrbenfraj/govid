import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-labo',
  templateUrl: './comments-labo.component.html',
  styleUrls: ['./comments-labo.component.scss']
})
export class CommentsLaboComponent implements OnInit {
  ngOnInit() {
    setTimeout(() => this.createComment(), 0);
  }
  private contentsValue: string;
  @Input()
  get contents(): string {
    return this.contentsValue;
  }
  set contents(value: string) {
    this.contentsValue = value;
    setTimeout(() => this.createComment());
  }

  private commentCreated = false;

  constructor(private elementRef: ElementRef) { }

  private createComment() {
    const htmlElement = this.elementRef.nativeElement as HTMLElement;
    if (this.commentCreated) {
      htmlElement.parentNode.removeChild(htmlElement.previousSibling);
    }
    htmlElement.parentNode.insertBefore(
      document.createComment(htmlElement.textContent), htmlElement);
    this.commentCreated = true;
  }
}

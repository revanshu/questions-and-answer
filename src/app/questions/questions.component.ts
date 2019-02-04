import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Question } from '../question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.less']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    // this.dataService.getQuestionsList().subscribe(
    //   (questionsObject: any) => {
    //       console.log('questions..', questionsObject);
    //       this.questions = questionsObject.feed_questions;
    //   });
    this.dataService.getQuestions((response) => {
      this.questions = response;
    });
  }

  goToDetailsPage(id: string): void {
    this.router.navigateByUrl('/questiondetails/' + id);
  }

  upVote(id): void {
    this.dataService.updateVotes(true, id , () => {
      this.getQuestions();
    });
  }

  downVote(id): void {
      this.dataService.updateVotes(false, id, () => {
        this.getQuestions();
      });
  }

}

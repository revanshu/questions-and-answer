import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Answer } from '../answer';
import { Question } from '../question';


@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.less']
})
export class QuestionDetailsComponent implements OnInit {
  answers: Answer[] = [];
  newAnswer = '';
  question: Question;
  constructor(private dataService: DataService,  private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getQuestion();
    this.getAnswers();
  }

  getAnswers(): void {
    this.activeRoute.params.subscribe((routeParams: any) => {
      // this.dataService.getAnswersList().subscribe(
      //   (customerDetailsObj: any) => {
      //    const answers = customerDetailsObj.feed_answers.find(obj => {
      //       return obj['Question-Id'] === routeParams.id;
      //     });
      //    this.answers = answers ? [].concat(answers) : []
      //     console.log('answers..', customerDetailsObj, routeParams, this.answers);
      //   });
      this.answers = [];
      this.dataService.getAnswers((response) => {
        for (const answer of response) {
          if (answer.questionId === routeParams.id) {
            this.answers.push(answer);
          }
        }
      });
    });
  }

  getQuestion(): void {
    this.activeRoute.params.subscribe((routeParams: any) => {
      // this.dataService.getQuestionsList().subscribe(
      //   (questionObj: any) => {
      //     this.question = questionObj.feed_questions.find(obj => {
      //       return obj.Id === routeParams.id;
      //     });
      //   });
      this.dataService.getQuestions((response) => {
        this.question = response.find(obj => {
          return obj.Id === routeParams.id;
        });
      });
    });
  }

  addAnswer(): void {
    if (this.newAnswer) {
      this.activeRoute.params.subscribe((routeParams: any) => {
        this.dataService.updateAnswers(this.newAnswer, routeParams.id, () => {
          this.getAnswers();
        });
      });
    }
  }

  upVote(): void {
    this.activeRoute.params.subscribe((routeParams: any) => {
      this.dataService.updateVotes(true, routeParams.id, () => {
        this.getQuestion();
      });
    });
  }

  downVote(): void {
    this.activeRoute.params.subscribe((routeParams: any) => {
      this.dataService.updateVotes(false, routeParams.id, () => {
        this.getQuestion();
      });
    });
  }
}

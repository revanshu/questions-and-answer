import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Question } from './question';
import { Answer } from './answer';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private questionsFeed: any;
  private questionUrl = 'https://api.myjson.com/bins/dck5b';
  private answerUrl = 'https://api.myjson.com/bins/hildr';

  constructor(private http: HttpClient) { }
  // public getQuestionsList(): Observable<any> {
  //   return (this.http.get<Question[]>(this.questionUrl));
  // }

  public getQuestions(callback): void {
    if (localStorage.getItem('questions')) {
      localStorage.getItem('questions');
      callback(JSON.parse(localStorage.getItem('questions')));
    } else {
      this.http.get<Question[]>(this.questionUrl).subscribe(
        (response: any) => {
          const questions = [];
          for (const question of response.feed_questions) {
            const questionObj = new Question(question);
            questions.push(questionObj);
          }
          localStorage.setItem('questions', JSON.stringify(questions));
          callback(JSON.parse(localStorage.getItem('questions')));
        }
      );
    }
  }

  // public getAnswersList(): Observable<any> {
  //   return (this.http.get<Answer>(this.answerUrl));
  // }

  public getAnswers(callback): void {
    if (localStorage.getItem('answers')) {
      localStorage.getItem('answers');
      callback(JSON.parse(localStorage.getItem('answers')));
    } else {
      this.http.get<Question[]>(this.answerUrl).subscribe(
        (response: any) => {
          const answerArr = response.feed_answers.sort((val1: any, val2: any) => {
            return new Date(val1.CREATE_TS).getTime() - new Date(val2.CREATE_TS).getTime();
          });
          console.log('ans', answerArr, response.feed_answers)
          const answerArrNorm = [];
          for (const answer of answerArr) {
            const answerObj = new Answer(answer);
            answerArrNorm.push(answerObj);
          }
          localStorage.setItem('answers', JSON.stringify(answerArrNorm));
          callback(JSON.parse(localStorage.getItem('answers')));
        }
      );
    }
  }

  public updateAnswers(answer, questionId, callback): void {
    const answers = JSON.parse(localStorage.getItem('answers'));
    const newID = 'new-Id' + Math.floor(Math.random() * 100) + 1;
    const newAnswerObj = {
      Id: newID,
      Answer: answer,
      questionId,
      createdAt: new Date(),
      createdBy: 'Anonymous',
    };
    answers.unshift(newAnswerObj);
    localStorage.setItem('answers', JSON.stringify(answers));
    callback();
  }

  public updateVotes(upvote, questionId, callback): void {
    const questions = JSON.parse(localStorage.getItem('questions'));
    for (const question of questions) {
      if (question.Id === questionId) {
        if (upvote) {
          question.upvotes = Number(question.upvotes) + 1;
        } else {
          question.downvotes = Number(question.downvotes) + 1;
        }
      }
    }
    localStorage.setItem('questions', JSON.stringify(questions));
    callback();
  }
}

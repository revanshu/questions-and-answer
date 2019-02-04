export class Answer {
  Id: number;
  Answer: string;
  createdAt: string;
  createdBy: string;
  questionId: string;
  constructor(answerObj) {
    this.Id = answerObj.Id;
    this.Answer = answerObj.Answer;
    this.createdAt = answerObj.created_at;
    if (typeof(answerObj.created_by) === 'object') {
      this.createdBy = answerObj.created_by.Name;
    } else {
      this.createdBy = answerObj.created_by;
    }
    this.questionId = answerObj['Question-Id'];
  }
}

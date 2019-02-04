export class Question {
  Id: number;
  Text: string;
  downvotes: number;
  upvotes: number;

  constructor(questionObj) {
    this.Id = questionObj.Id;
    this.Text = questionObj.Text;
    this.upvotes = questionObj.upvotes ? questionObj.upvotes : 0;
    this.downvotes = questionObj.downvotes ? questionObj.downvotes : 0;
  }
}

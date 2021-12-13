export class FriendRequest {
  constructor(to, from, date_time) {
    this.to = to;
    this.from = from;
    this.date_time = date_time;
  }

  static fromApi(item) {
    return new FriendRequest(item.to, item.from, Date.parse(item.date_time))
  }
}
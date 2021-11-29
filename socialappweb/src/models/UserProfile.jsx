import { User } from "./User";

export class UserProfile {
  constructor(user, dob, aboutMe, likes, university, course, yearOfStudy, phoneNumber, receivedFriendRequest, sentFriendRequests, friends) {
    this.user = user;
    this.dob = dob;
    this.aboutMe = aboutMe;
    this.likes = likes;
    this.university = university;
    this.course = course;
    this.yearOfStudy = yearOfStudy;
    this.phoneNumber = phoneNumber;
    this.receivedFriendRequest = receivedFriendRequest;
    this.sentFriendRequests = sentFriendRequests;
    this.friends = friends
  }

  static fromApi(item) {
    return new UserProfile(
      User.fromApi(item.user),
      item.dob,
      item.aboutMe,
      item.likes,
      item.university,
      item.course,
      item.yearOfStudy,
      item.phoneNumber,
      item.receivedFriendRequest,
      item.sentFriendRequests,
      item.friends
    )
  }
}
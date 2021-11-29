package model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserProfile {

  User user;

  String dob;

  String aboutMe;

  List<String> likes;

  String university;

  String course;

  String yearOfStudy;

  String phoneNumber;
}

package model;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
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

  String yearOfStudy;

  String phoneNumber;
}

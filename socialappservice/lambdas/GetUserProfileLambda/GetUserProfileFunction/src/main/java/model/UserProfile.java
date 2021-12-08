package model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

//@Getter
//@Setter
//public class UserProfile {
//
//  User user;
//
//  String dob;
//
//  String aboutMe;
//
//  List<String> likes;
//
//  String university;
//
//  String course;
//
//  String yearOfStudy;
//
//  String phoneNumber;
//}

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@DynamoDBTable(tableName = "SocialApp-Profiles")
public class UserProfile {

  @DynamoDBHashKey(attributeName = "user_id")
  String userId;

//  @DynamoDBAttribute(attributeName = "user")
//  User user;

  @DynamoDBAttribute(attributeName = "dob")
  String dob;

  @DynamoDBAttribute(attributeName = "aboutMe")
  String aboutMe;

  @DynamoDBAttribute(attributeName = "likes")
  List<String> likes;

  @DynamoDBAttribute(attributeName = "university")
  String university;

  @DynamoDBAttribute(attributeName = "course")
  String course;

  @DynamoDBAttribute(attributeName = "yearOfStudy")
  String yearOfStudy;

  @DynamoDBAttribute(attributeName = "phoneNumber")
  String phoneNumber;

  @DynamoDBAttribute(attributeName = "receivedFriendRequest")
  List<User> receivedFriendRequest;

  @DynamoDBAttribute(attributeName = "sentFriendRequests")
  List<User> sentFriendRequests;

  @DynamoDBAttribute(attributeName = "friends")
  List<User> friends;

}
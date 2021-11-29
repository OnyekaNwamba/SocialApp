package model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@DynamoDBTable(tableName = "SocialApp-Users")
public class User {

  @NonNull
  @Builder.Default
  @DynamoDBHashKey(attributeName = "user_id")
  String id;

  @NonNull
  @Builder.Default
  @DynamoDBAttribute(attributeName = "first_name")
  String firstName;

  @NonNull
  @Builder.Default
  @DynamoDBAttribute(attributeName = "last_name")
  String lastName;

  @NonNull
  @Builder.Default
  @DynamoDBAttribute(attributeName = "email")
  String email;

  @NonNull
  @Builder.Default
  @DynamoDBAttribute(attributeName = "password")
  String password;
}

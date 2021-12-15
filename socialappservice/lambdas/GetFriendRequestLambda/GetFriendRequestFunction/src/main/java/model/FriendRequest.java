package model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import converters.StringInstantConverter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@DynamoDBTable(tableName = "SocialApp-FriendRequests")
public class FriendRequest {
  @NonNull
  @DynamoDBHashKey(attributeName = "to")
  String to;

  @NonNull
  @DynamoDBRangeKey(attributeName = "from")
  String from;

  @NonNull
  @DynamoDBAttribute(attributeName = "date_time")
  @DynamoDBTypeConverted(converter = StringInstantConverter.class)
  Instant date_time;

  public FriendRequest() {}
}

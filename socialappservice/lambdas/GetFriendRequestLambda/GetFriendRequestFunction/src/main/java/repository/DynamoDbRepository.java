package repository;

  import com.amazonaws.regions.Regions;
  import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
  import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
  import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
  import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
  import com.amazonaws.services.dynamodbv2.model.AttributeValue;
  import java.util.ArrayList;
  import java.util.HashMap;
  import java.util.Map;
  import model.FriendRequest;

public class DynamoDbRepository {
  final AmazonDynamoDB client;
  final DynamoDBMapper mapper;

  public DynamoDbRepository() {
    this.client = AmazonDynamoDBClientBuilder.standard()
      .withRegion(Regions.EU_WEST_2)
      .build();

    this.mapper = new DynamoDBMapper(client);
  }


  public ArrayList<FriendRequest> getAllFriendRequests(String to) {
    Map<String, AttributeValue> eav = new HashMap<>();
    eav.put(":v1", new AttributeValue().withS(to));
    DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
      .withFilterExpression("#to_user = :v1")
      .withExpressionAttributeValues(eav)
      .addExpressionAttributeNamesEntry("#to_user", "to");
    ArrayList<FriendRequest> result = new ArrayList<>(this.mapper.scan(FriendRequest.class, scanExpression));
    return result.isEmpty() ? new ArrayList<>() : result;
  }

}

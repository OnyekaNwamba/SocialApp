package repository;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
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

  public void saveFriendRequest(FriendRequest friendRequest) {

    if(mapper.load(FriendRequest.class, friendRequest.getFrom(), friendRequest.getTo()) == null) {
      this.mapper.save(friendRequest);
    }
  }
}

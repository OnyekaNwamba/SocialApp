package activity;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.SneakyThrows;
import model.FriendRequest;
import repository.DynamoDbRepository;

public class GetFriendRequest implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
  DynamoDbRepository repository;

  @SneakyThrows
  public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
    this.repository = new DynamoDbRepository();

    Map<String, String> headers = new HashMap<>();
    headers.put("Content-Type", "application/json");
    headers.put("X-Custom-Header", "application/json");

    APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent().withHeaders(headers);
    ObjectMapper objectMapper = new ObjectMapper()
      .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
      .findAndRegisterModules();

    String result = "";
    try {
      String to = input.getQueryStringParameters().get("to");
      String from = input.getQueryStringParameters().get("from");

      if(from != null && to != null) {
        FriendRequest friendRequest = this.repository.getMatchingFriendRequest(to, from);
        result = objectMapper.writeValueAsString(friendRequest);
      } else if(to != null) {
        List<FriendRequest> friendRequestList = this.repository.getAllFriendRequests(to);
        result = objectMapper.writeValueAsString(friendRequestList);
      } else if(from != null) {
        List<FriendRequest> friendRequestList = this.repository.getAllSentFriendRequests(from);
        result = objectMapper.writeValueAsString(friendRequestList);
      }

      return response
        .withStatusCode(200)
        .withBody(result);
    } catch (Exception e) {
      e.printStackTrace();
      return response
        .withBody(objectMapper.writeValueAsString("ERROR: " + e.getMessage()))
        .withStatusCode(500);
    }
  }
}

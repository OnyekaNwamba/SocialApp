package activity;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import model.FriendRequest;
import repository.DynamoDbRepository;

public class GetFriendRequest implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
  DynamoDbRepository repository;

  public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
    this.repository = new DynamoDbRepository();

    Map<String, String> headers = new HashMap<>();
    headers.put("Content-Type", "application/json");
    headers.put("X-Custom-Header", "application/json");

    APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent().withHeaders(headers);
    ObjectMapper objectMapper = new ObjectMapper()
      .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
      .findAndRegisterModules();

    try {
      String to = input.getPathParameters().get("to");
      List<FriendRequest> friendRequestList = this.repository.getAllFriendRequests(to);

      return response
        .withStatusCode(200)
        .withBody(objectMapper.writeValueAsString(friendRequestList));
    } catch (Exception e) {
      e.printStackTrace();
      return response.withBody(e.getMessage()).withStatusCode(500);
    }
  }
}

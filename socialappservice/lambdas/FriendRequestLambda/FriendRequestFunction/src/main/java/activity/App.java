package activity;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import manager.FriendRequestManager;
import model.User;
import repository.DynamoDbRepository;

/**
 * Handler for requests to Lambda activity.
 */
public class App implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    DynamoDbRepository repository;

    public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent input, final Context context) {
        repository = new DynamoDbRepository();
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent()
                .withHeaders(headers);
        ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try {
            final String from = input.getQueryStringParameters().get("from");
            final String to = input.getQueryStringParameters().get("to");
            final String type = input.getQueryStringParameters().get("type");

            if(type.equals("accept")) {
                FriendRequestManager.acceptFriendRequest(from, to);
            }

            if(type.equals("send")) {
                FriendRequestManager.sendFriendRequest(from, to);
            }

            return response
                    .withStatusCode(200)
                    .withBody("DONE");
        } catch (Exception e) {
            e.printStackTrace();
            return response
                    .withBody(e.getMessage())
                    .withStatusCode(500);
        }
    }
}

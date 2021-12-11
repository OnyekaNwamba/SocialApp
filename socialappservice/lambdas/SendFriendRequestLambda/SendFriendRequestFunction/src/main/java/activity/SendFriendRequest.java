package activity;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import model.FriendRequest;
import repository.DynamoDbRepository;

/**
 * Handler for requests to Lambda activity.
 */
public class SendFriendRequest implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    DynamoDbRepository repository;

    public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent input, final Context context) {
        repository = new DynamoDbRepository();
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent()
                .withHeaders(headers);

        try {
            final String from = input.getQueryStringParameters().get("from");
            final String to = input.getQueryStringParameters().get("to");

            FriendRequest friendRequest = new FriendRequest(from, to, Instant.now());
            repository.saveFriendRequest(friendRequest);

            return response
                    .withStatusCode(200)
                    .withBody(String.valueOf(friendRequest));
        } catch (Exception e) {
            e.printStackTrace();
            return response
                    .withBody(e.getMessage())
                    .withStatusCode(500);
        }
    }
}

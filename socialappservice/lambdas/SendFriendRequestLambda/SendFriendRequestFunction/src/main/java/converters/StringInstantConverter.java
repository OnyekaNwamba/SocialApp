package converters;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;

import java.time.Instant;

public class StringInstantConverter implements DynamoDBTypeConverter<String, Instant> {
  @Override
  public String convert(Instant instant) {
    return instant.toString();
  }

  @Override
  public Instant unconvert(String string) {
    return Instant.parse(string);
  }
}
package repository;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.UserProfile;

public class S3Repository {
  final AmazonS3 client = AmazonS3ClientBuilder.standard()
    .withRegion(Regions.US_WEST_2)
    .build();

  final String bucketName = "social-app-user-profiles";
  final ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

  public void saveUserProfile(UserProfile profile) {
    try {
      String profileJson  = objectMapper.writeValueAsString(profile);
      this.client.putObject(bucketName, profile.getUser().getId(), profileJson);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}

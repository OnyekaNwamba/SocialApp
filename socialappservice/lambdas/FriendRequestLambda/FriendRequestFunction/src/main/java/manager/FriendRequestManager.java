package manager;

import model.UserProfile;
import repository.S3Repository;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Collections;

public class FriendRequestManager {

  final static S3Repository S3repository = new S3Repository();

  public static void sendFriendRequest(final String fromId, final String toId) {
    final UserProfile from = S3repository.getUserProfile(fromId);
    final UserProfile to = S3repository.getUserProfile(toId);

    if(from.getReceivedFriendRequest() == null) {
      from.setReceivedFriendRequest(new ArrayList<>());
    }

    if(to.getReceivedFriendRequest() == null) {
      to.setReceivedFriendRequest(new ArrayList<>());
    }

    if(from.getSentFriendRequests() == null) {
      from.setSentFriendRequests(new ArrayList<>());
    }

    if(to.getSentFriendRequests() == null) {
      to.setSentFriendRequests(new ArrayList<>());
    }

    if(to.getSentFriendRequests().contains(from.getUser())) {
      FriendRequestManager.acceptFriendRequest(fromId, toId);
      return;
    }

    to.getReceivedFriendRequest().add(from.getUser());
    from.getSentFriendRequests().add(to.getUser());
    S3repository.saveUserProfile(to);
    S3repository.saveUserProfile(from);
  }

  public static void acceptFriendRequest(final String fromId, final String toId) {
    final UserProfile from = S3repository.getUserProfile(fromId);
    final UserProfile to = S3repository.getUserProfile(toId);

    from.getSentFriendRequests().remove(to.getUser());
    from.getReceivedFriendRequest().remove(to.getUser());

    to.getSentFriendRequests().remove(from.getUser());
    to.getReceivedFriendRequest().remove(from.getUser());

    from.getFriends().add(to.getUser());
    to.getFriends().add(from.getUser());

    S3repository.saveUserProfile(to);
    S3repository.saveUserProfile(from);
  }

}

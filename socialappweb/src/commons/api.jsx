import axios from 'axios'
import {User} from "../models/User";
import {UserProfile} from "../models/UserProfile";

const local = axios.create();

export class ApiResult {

  constructor(success, error) {
    this.success = success;
    this.error = error;
    this.isError = !!error
  }

  static asError(error) {
    return new ApiResult(null, error);
  }

  static asSuccess(success) {
    return new ApiResult(success, null);
  }

  ifSuccessful(callback) {
    if (this.isError) {
      return this;
    }

    callback(this.success);
    return this;
  }

  orElse(callback) {
    if (!this.isError) {
      return this;
    }

    callback(this.error);
    return this;
  }
}

export class Api {
  url = "https://580tmpvmi5.execute-api.eu-west-2.amazonaws.com/";
  wrap = async (callback, errorMessage) => {
    try {
      const result = await callback();
      return ApiResult.asSuccess(result);
    } catch (error) {
      // In case `error.response.data` not available fallback to `error`
      const response = ((error || {}).response || {}).data || error;

      const message = errorMessage
        ? `${errorMessage}. ${response}`
        : response;

      console.error(`ApiService: ${message}`);
      return ApiResult.asError(message);
    }
  }

  putUser = async (user) => {
    return this.wrap(async () => {
      const request = this.url + "users?user=" + JSON.stringify(user);
      return local.put(request);
    }, "Failed to do put user");
  }

  getUser = async (email) => {
    return this.wrap(async () => {
      const request = this.url + "users/" + email;
      const response = await local.get(request);
      return User.fromApi(response.data)
    }, "Failed to do get user");
  }

  putUserProfile = async (profile) => {
    return this.wrap(async () => {
      const request = this.url + "profiles?profile=" + JSON.stringify(profile);
      return local.put(request);
    }, "Failed to do put profile");
  }

  getUserProfile = async (userId) => {
    return this.wrap(async () => {
      const request = this.url + "profiles/" + userId;
      const response = await local.get(request);
      return UserProfile.fromApi(response.data)
    }, "Failed to do get user profile");
  }

  getUserProfileByUniversity = async (university) => {
    return this.wrap(async () => {
      const request = this.url + "profiles/university/" + university;
      const response = await local.get(request);
      return response.data.map(s => UserProfile.fromApi(s))
    }, "Failed to do get user profiles by uni");
  }
}

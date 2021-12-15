import React from "react";
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Flex,
  IconButton,
  Textarea,
  Spinner,
  FormControl,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import { Card, CardContent, CardHeader, Property } from "../../../components/Card";
import { UserProfile } from "../../../models/UserProfile";
import { Authenticator } from "../../../commons/authenticator";
import { WithSubnavigation } from "../../../components/NavigationBar";
import { User } from "../../../models/User";


export class ProfileMainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditingProfile: false,
      isEditingAccount: false,
      userProfile: new UserProfile(),
      user: new User(),
      isLoading: true,
      userLikes: [],
      currentLike: ""
    };
  }

  async componentDidMount() {
    if(Authenticator.isAuthenticated()) {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await this.props.api.getUserProfile(user?.id);
      console.log("PRF")
      console.log(response);
      console.log(User.fromApi(user));
      this.setState({
        userProfile: response.isError ?  new UserProfile(user.id) : response.success,
        user: user,
        // userLikes: response.success.likes || [],
        isLoading: false
      });
    } else {
      this.props.history.push('/login')
    }
  }

  async onSaveProfileButtonClickHandler() {
    this.setState({
      isEditingProfile: !this.state.isEditingProfile,
    });
    const userProfile = this.state.userProfile;
    userProfile.likes = this.state.userLikes;
    const updatedUser = new User(
      this.state.user.id,
      this.state.user.firstName,
      this.state.user.lastName,
      this.state.user.email,
      this.state.user.password
    );
    const response = await this.props.api.putUserProfile(userProfile);
    const userResponse = await this.props.api.putUser(updatedUser);
    if(!userResponse.isError) {
      localStorage.setItem('user', JSON.stringify(this.state.user))
    }
  }

  async onSaveAccountButtonClickHandler() {
    this.setState({
      isEditingAccount: !this.state.isEditingAccount,
    });

    const updatedUser = new User(
      this.state.user.id,
      this.state.user.firstName,
      this.state.user.lastName,
      this.state.user.email,
      this.state.user.password
    );

    const response = await this.props.api.putUser(updatedUser);

    if(!response.isError) {
      localStorage.setItem('user', JSON.stringify(this.state.user))
    }

  }

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          picture: [reader.result],
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  displayImage = () => {
    if (this.state.picture !== []) {
      return (
        <div className="imageholder">
          <img src={this.state.picture} alt="" />
        </div>
      );
    }
  };

  render() {

    if(!Authenticator.isAuthenticated()) {
      this.props.history.push('/login')
    }

    if(this.state.isLoading) {
      return <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    }

    return <Box>
      <WithSubnavigation history={this.props.history}/>
      <Box
        bg={'gray.100'}
        py="12"
        px={{
          md: '8',
        }}
        minH={'100vh'}
      >
        <Heading as={"h1"} align={"center"} mb={10}>
          Account and Profile
        </Heading>
        <VStack spacing={8} align="stretch">
          <Box>
            <Card maxW="3xl" mx="auto" flex="1">
              <CardHeader
                title="Profile"
                action={
                  <Flex justifyContent="center">
                    {
                      this.state.isEditingProfile ?
                        <Button
                          bg="blue.400"
                          color="white"
                          variant="solid"
                          onClick={this.onSaveProfileButtonClickHandler.bind(this)}
                        >
                          Save
                        </Button> :
                        <IconButton
                          size="sm"
                          icon={<EditIcon />}
                          onClick={() => {this.setState({
                            isEditingProfile: !this.state.isEditingProfile
                          })}}
                        />
                    }
                  </Flex>
                }
              />
              <CardContent>
                <Property
                  label="First Name"
                  value={
                    <Input
                      variant="filled"
                      isDisabled={!this.state.isEditingProfile}
                      value={this.state.user?.firstName || ""}
                      onChange={(e) => {
                        const user  = this.state.user;
                        user.firstName = e.target.value;
                        this.setState({
                          user: user
                      })}}
                    />
                  }
                />
                <Property
                  label="Last Name"
                  value={
                    <Input
                      variant="filled"
                      value={this.state.user?.lastName || ""}
                      isDisabled={!this.state.isEditingProfile}
                      onChange={(e) => {
                        const user  = this.state.user;
                        user.lastName = e.target.value;
                        this.setState({
                          user: user
                        })
                      }}
                    />
                  }
                />
                <Property
                  label="Date of birth"
                  value={
                    <Input
                      variant="filled"
                      placeholder={"dd/mm/yyyy"}
                      value={this.state.userProfile.dob || ""}
                      isDisabled={!this.state.isEditingProfile}
                      onChange={(e) => {
                        const userProfile  = this.state.userProfile;
                        userProfile.dob = e.target.value;
                        this.setState({
                          userProfile: userProfile
                        })
                      }}
                    />
                  }
                />
                <Property
                  label="Bio"
                  value={
                    <Textarea
                      variant="filled"
                      value={this.state.userProfile.aboutMe || ""}
                      isDisabled={!this.state.isEditingProfile}
                      onChange={(e) => {
                        const userProfile  = this.state.userProfile;
                        userProfile.aboutMe = e.target.value;
                        this.setState({
                          userProfile: userProfile
                        })
                      }}
                    />
                  }
                />
                <Property
                  label="Things I like"
                  value={
                    <FormControl id="likes">
                      <VStack spacing={2} align={"left"}>
                        <Input
                          variant="filled"
                          value={this.state.currentLike}
                          placeholder={"Add things you like"}
                          isDisabled={!this.state.isEditingProfile}
                          onChange={(e) => {
                            this.setState({
                              currentLike: e.target.value
                            })
                          }}
                          onKeyDown={(e) => {
                            if(e.key === "Enter") {
                              const likes = this.state.userLikes;
                              likes.push(this.state.currentLike)
                              this.setState({
                                userLikes: likes,
                                currentLike: ""
                              })
                            }
                          }}
                        />
                        <HStack spacing={4}>
                          {this.state.userLikes.map((like, index) => (
                            <Tag
                              key={index}
                              size={"md"}
                              borderRadius="full"
                              variant="solid"
                              bg="blue.500"
                            >
                              <TagLabel>{like}</TagLabel>
                              <TagCloseButton
                                onClick={() => {
                                  const likes = this.state.userLikes;
                                  likes.splice(index, 1);
                                  this.setState({
                                    userLikes: likes
                                  })
                                }}
                              />
                            </Tag>
                          ))}
                        </HStack>
                      </VStack>
                    </FormControl>
                  }
                />
                <Property
                  label="University"
                  value={
                    <Input
                      variant="filled"
                      value={this.state.userProfile.university || ""}
                      isDisabled={!this.state.isEditingProfile}
                      onChange={(e) => {
                        const userProfile  = this.state.userProfile;
                        userProfile.university = e.target.value;
                        this.setState({
                          userProfile: userProfile
                        })
                      }}
                    />
                  }
                />
                <Property
                  label="Year of study"
                  value={
                    <Input
                      variant="filled"
                      value={this.state.userProfile?.yearOfStudy || ""}
                      isDisabled={!this.state.isEditingProfile}
                      onChange={(e) => {
                        const userProfile  = this.state.userProfile;
                        userProfile.yearOfStudy = e.target.value;
                        this.setState({
                          userProfile: userProfile
                        })
                      }}
                    />
                  }
                />
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Card maxW="3xl" mx="auto" flex="1">
              <CardHeader
                title="Account Info"
                action={
                  <Flex justifyContent="center">
                    {
                      this.state.isEditingAccount ?
                        <Button
                          bg="blue.400"
                          color="white"
                          variant="solid"
                          onClick={this.onSaveAccountButtonClickHandler.bind(this)}
                        >
                          Save
                        </Button> :
                        <IconButton
                          size="sm"
                          icon={<EditIcon />}
                          onClick={() => {this.setState({
                            isEditingAccount: !this.state.isEditingAccount
                          })}}
                        />
                    }
                  </Flex>
                }
              />
              <CardContent>
                <Property
                  label="Email"
                  value={
                    <Input
                      variant="filled"
                      value={this.state.user?.email || ""}
                      isDisabled={!this.state.isEditingAccount}
                      onChange={(e) => {
                        const user  = this.state.user;
                        user.email = e.target.value;
                        this.setState({
                          user: user
                        })
                      }}
                    />
                  }
                />
                <Flex align="center" justify="space-between" px="6" py="4" borderBottomWidth="1px">
                  <Heading as="h2" fontSize="m">
                    Reset Password
                  </Heading>
                  <Button
                    bg="blue.400"
                    color="white"
                    variant="solid"
                    onClick={() => {this.setState({
                      isEditingAccount: !this.state.isEditingAccount
                    })}}
                  >
                    Change Password
                  </Button>
                </Flex>
                <Property
                  label="Password"
                  value={
                    <Input
                      placeholder="New Password"
                      value={this.state.password}
                      onChange={(e) => {this.setState({
                        password: e.target.value
                      })}}
                    />
                  }
                />
                <Property
                  label="Confirm Password"
                  value={
                    <Input
                      placeholder="Confirm Password"
                      value={this.state.confirmPassword}
                      onChange={(e) => {this.setState({
                        confirmPassword: e.target.value
                      })}}
                    />
                  }
                />
              </CardContent>
            </Card>
          </Box>
        </VStack>
      </Box>
    </Box>
  }
}
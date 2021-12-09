import React from "react";

import {
  Box,
  Grid,
  GridItem,
  Link,
  IconButton,
  VStack,
  Image,
  Heading,
  Button,
  Slide,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid,
  Skeleton
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons'
import { WithSubnavigation } from "../../../components/NavigationBar";
import { Authenticator } from "../../../commons/authenticator";
import { Carousel } from "../../../components/Carousel";
import { UserProfile } from "../../../models/UserProfile";

export class DiscoverMainPage extends React.Component{
  constructor(props) {
    super(props);

    let isAuthenticated = Authenticator.authenticate();

    this.state = {
      value: true,
      user: isAuthenticated ? JSON.parse(localStorage.getItem('user')) : this.props.history.push(`login`),
      currentSlide: 0,
      isOpen: false,
      isModalOpen: false
    };
  }

  async componentDidMount() {
    let profileResponse = await this.props.api.getUserProfile(this.state.user.id);

    // If profile retrieval fails, create a new empty profile
    if(profileResponse.isError) {
      const putResponse = await this.props.api.putUserProfile(new UserProfile(this.state.user.id));
      if(!putResponse.isError) {
        profileResponse = putResponse;
      } else {
        console.error(putResponse);
      }
    }

    const user = profileResponse.success;

    this.isCompleteProfile(profileResponse.success);

    if(this.state.isProfileCompleted) {
      const profilesResponse = await this.props.api.getUserProfileByUniversity(user.university);
      let usersAndProfiles = []

      if(!profilesResponse.isError) {
        usersAndProfiles = profilesResponse.success.map(async profile => {
          const userResponse = await this.props.api.getUserById(profile.userId);
          if(!userResponse.isError) {
            return {user: userResponse.success, profile: profile}
          }
        });
      }

      console.log(user)

      usersAndProfiles = await Promise.all(usersAndProfiles);
      this.setState({
        profile: !profileResponse.isError ? profileResponse.success : new UserProfile(),
        users: usersAndProfiles.filter(item => item.user.id !== user.userId)
        // users: usersAndProfiles
      })
    }

    // this.setState({
    //   profile: !profileResponse.isError ? profileResponse.success : new UserProfile(),
    // })
  }

  isCompleteProfile(profile) {
    let noOfCompleted = 0;

    if(profile.university != null) {
      noOfCompleted += 1
    }

    if(profile.aboutMe != null) {
      noOfCompleted += 1
    }

    if(profile.dob != null) {
      noOfCompleted += 1
    }

    if(profile.course != null) {
      noOfCompleted += 1
    }

    if(profile.yearOfStudy != null) {
      noOfCompleted += 1
    }

    if(profile.phoneNumber != null) {
      noOfCompleted += 1
    }

    this.setState({
      isProfileCompleted: noOfCompleted === 4,
      noOfCompleted: noOfCompleted
    })
    console.log(noOfCompleted)
  }

  onModalClose() {
    this.setState({
      isModalOpen: false
    })
  }

  completeAccountModal() {
    return (
      <>
        <Modal isOpen={true} onClose={this.onModalClose.bind(this)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Complete your profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={2}>
                <CircularProgress value={40} color='green.400' size="12rem">
                  <CircularProgressLabel>40%</CircularProgressLabel>
                </CircularProgress>
                <Text fontWeight='bold' mb='1rem'>
                  You need to complete your profile to continue
                </Text>
              </SimpleGrid>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' onClick={() => this.props.history.push(`profile`)}>Complete Profile</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  render() {
    return(
      <Skeleton isLoaded={this.state.users!==null}>
        {
          !this.state.isProfileCompleted ?
            this.completeAccountModal() :
            <Box>
              <WithSubnavigation history={this.props.history}/>
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(5, 1fr)"
                minH={'100vh'}
                bg={'gray.50'}
                shadow="xl"
              >
                <GridItem
                  colSpan={1}
                  bg={'white'}
                  minH={'100vh'}
                >
                  {/*<SegmentedControl*/}
                  {/*  name="exampleInput"*/}
                  {/*  options={[*/}
                  {/*    { label: "One", value: "one" },*/}
                  {/*    { label: "Two", value: "two", default: true },*/}
                  {/*  ]}*/}
                  {/*  style={{ width: 200, height: 30, color: 'rgb(0, 188, 212)', borderRadius: 50 }} // match default material-ui primary teal*/}
                  {/*/>*/}
                </GridItem>
                <GridItem colSpan={4} py={70}>
                  <VStack spacing={5}>
                    <Heading as="h1" size="3xl">SocialApp</Heading>
                    <Box/>
                    <Carousel slides={this.state.users || []} currentSlide={this.state.currentSlide} isOpen={this.state.isOpen}/>
                    <Grid templateColumns="repeat(5, 1fr)" gap={20}>
                      <Box w={100}/>
                      <Box w={100}/>
                      <Box w={100}/>
                      <Box w={100}/>
                      <Box w={100}>
                        <Button
                          variant="solid"
                          borderRadius="full"
                          onClick={() => { this.setState({currentSlide: this.state.currentSlide +=1}) }}
                        >
                          Send friend request ❤️
                        </Button>
                      </Box>
                    </Grid>
                  </VStack>
                </GridItem>
              </Grid>
            </Box>
        }
      </Skeleton>
    )
  }
}

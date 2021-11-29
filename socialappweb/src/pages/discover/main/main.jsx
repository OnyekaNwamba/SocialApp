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
  Slide
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons'
import { WithSubnavigation } from "../../../components/NavigationBar";
import { Authenticator } from "../../../commons/authenticator";
import { Carousel } from "../../../components/Carousel";


export class DiscoverMainPage extends React.Component{
  constructor(props) {
    super(props);

    let isAuthenticated = Authenticator.authenticate();

    this.state = {
      value: true,
      user: isAuthenticated ? JSON.parse(localStorage.getItem('user')) : this.props.history.push(`login`),
      currentSlide: 0,
      isOpen: false
    };
  }

  async componentDidMount() {
    const profileResponse = await this.props.api.getUserProfile(this.state.user.id);
    const user = profileResponse.success;
    const response = await this.props.api.getUserProfileByUniversity(user.university);

    this.setState({
      users: response.isError ? [] : response.success.filter(item => item.user.id !== this.state.user.id),
    })
  }

  render() {
    return (
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
    );
  }
}

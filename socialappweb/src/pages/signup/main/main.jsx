import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { v4 as uuid } from "uuid";
import { User } from "../../../models/User";
import { Authenticator } from "../../../commons/authenticator";
import {UserProfile} from "../../../models/UserProfile";

export class SignUpMainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  }

  async onButtonClickHandler() {
    const id = uuid();
    const user = new User(id, this.state.firstName, this.state.lastName, this.state.email, this.state.password);
    const response = await this.props.api.putUser(user);
    if(!response.isError) {
      const authenticated = Authenticator.authenticate(user);
      if(authenticated) {
        //create empty user profile
        const userResponse = await this.props.api.putUserProfile(new UserProfile(user.id));
        console.log(userResponse);
        this.props.history.push(`profile`);
      } else {
        console.log('Error authenticating');
      }
    }
  }

  render() {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'gray.50'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'6xl'}>Create a new account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to make new campus friends ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'gray.50'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="firstName">
                <FormLabel>First name</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => this.setState({firstName: e.target.value})}
                />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => this.setState({lastName: e.target.value})}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => this.setState({email: e.target.value})}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => this.setState({password: e.target.value})}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={this.onButtonClickHandler.bind(this)}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
}
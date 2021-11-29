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

export class LoginMainPage extends React.Component {
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

    if(Authenticator.isAuthenticated()) {
      this.props.history.push(`discover`)
    }

    const response = await this.props.api.getUser(this.state.email);
    if(!response.isError) {
      const user = response.success;
      if(!this.isValidUser(this.state.password, user)) {
        console.log("Incorrect password")
        return
      }
      const authenticated = Authenticator.authenticate(user);
      if(authenticated) {
        this.props.history.push(`discover`);
      } else {
        console.log('Error authenticating');
      }
    }
  }

  isValidUser(password, user) {
    return password === user.password;
  }

  render() {

    if(Authenticator.isAuthenticated()) {
      this.props.history.push(`discover`)
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'gray.50'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
             To make new campus besties ❤️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'gray.50'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
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
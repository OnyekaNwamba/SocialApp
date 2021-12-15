import React  from "react";
import { Box, Flex, Image, VStack, Grid, GridItem, Heading, Tag, TagLabel, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'



export const CardFront = ({sid, userProfile }) => {

  const ordinal_suffix_of = (i) => {
    let j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  return <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(2, 1fr)"
      h={"100%"}
      bg={'blue.500'}
      shadow="xl"
    >
      <GridItem colSpan={1}>
        <Box>
          <Box
            rounded={{lg: "lg"}}
            bgSize="cover"
          >
            <Image
              src={userProfile.profile.profilePicture}
              // src='https://waspper.com/wp-content/uploads/2020/06/750x750.png'
              alt="Segun Adebayo"
              // h={"623"}
              // w={"623"}
              h={"610"}
              w={"610"}
            />
          </Box>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box minH={"25%"} />
        <Box minH={"60%"}>
          <VStack spacing={3} align="left" paddingLeft="3rem" paddingRight="3rem">
            <Heading as="h1" size="4xl" color={"white"} align="left">
              {userProfile.user.firstName} {userProfile.user.lastName}
            </Heading>
            <Box />
            <Heading as="h1" size="2xl" color={"white"}>
              23
            </Heading>
            <Box />
            <Heading as="h2" size="xl" color={"white"}>
              {userProfile.profile.university || "Queen Mary, University of London"}
            </Heading>
            <Box />
            <Box />
            <Flex>
              <Heading as="h1" size="lg" color={"white"}>
                {ordinal_suffix_of(userProfile.profile.yearOfStudy)} year
              </Heading>
            </Flex>
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
          </VStack>
          <Box minH={"20%"} />
          <HStack spacing={2}>
            {
              userProfile.profile.likes?.map(like => {
                return <Tag borderRadius="full">
                  <TagLabel>{like}</TagLabel>
                </Tag>
              })
            }
          </HStack>
        </Box>
      </GridItem>
    </Grid>
  </Box>
}
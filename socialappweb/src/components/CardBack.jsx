import React  from "react";
import { Box, Flex, Image, VStack, Grid, GridItem, Heading, Tag, TagLabel, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'



export const CardBack = ({sid, userProfile }) => {

  const english_ordinal_rules = new Intl.PluralRules("en", {
    type: "ordinal"
  });

  const suffixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th"
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
              src='https://waspper.com/wp-content/uploads/2020/06/750x750.png'
              alt="Segun Adebayo"
              h={"100%"}
            />
          </Box>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box minH={"10%"} />
        <Box minH={"60%"}>
          <VStack spacing={2}>
            <Heading as="h1" size="3xl" color={"white"}>
            </Heading>
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Flex align={"center"} justify={"center"}>
              <FontAwesomeIcon icon={faQuoteLeft} color={"white"} size={"lg"} />
            </Flex>
            <Box />
            <Flex>
              <Heading as="h4" size="md" color={"white"} px={10}>
                {userProfile.profile.aboutMe}
              </Heading>
            </Flex>
            <Box />
            <Flex align={"center"} justify={"center"}>
              <FontAwesomeIcon icon={faQuoteRight} color={"white"} size={"lg"} />
            </Flex>
            <Box />
            <Box />
            <Box />
            <Heading as="h4" size="xs" color={"white"}> Likes </Heading>
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
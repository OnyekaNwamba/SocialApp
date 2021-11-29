import React  from "react";
import { Box, Flex, Image, VStack, Grid, GridItem, Heading, Tag, TagLabel, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'


export const Carousel = ({ slides, currentSlide, isOpen  }) => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "inline",
    top: "90%",
    w: "auto",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const english_ordinal_rules = new Intl.PluralRules("en", {
    type: "ordinal"
  });

  const suffixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th"
  }

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Box
      bg={('blue.300')}
      rounded={{
        md: 40
      }}
      shadow="base"
      overflow="hidden"
      h={"80%"}
      w={"85%"}
    >
      <Flex overflow="hidden" pos="relative">
        <Flex h="full" w="full" {...carouselStyle}>
          {slides.map((userProfile, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
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
                  <Box minH={"20%"} />
                  <Box minH={"60%"}>
                    <VStack spacing={2}>
                      <Heading as="h1" size="3xl" color={"white"}>
                        {userProfile.user.firstName},  23
                      </Heading>
                      <Heading as="h3" size="lg" color={"white"}>
                        {userProfile.university || "Queen Mary, University of London"}
                      </Heading>
                      <Heading as="h5" size="md" color={"white"}>
                        {userProfile.yearOfStudy + suffixes[english_ordinal_rules.select(userProfile.yearOfStudy)]  + " year"}
                      </Heading>
                      <Box />
                      <Box />
                      <Box />
                      <Flex align={"center"} justify={"center"}>
                        <FontAwesomeIcon icon={faQuoteLeft} color={"white"} size={"lg"} />
                      </Flex>
                      <Box />
                      <Flex>
                        <Heading as="h4" size="md" color={"white"} px={10}>
                          {userProfile.aboutMe}
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
                        userProfile.likes?.map(like => {
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
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

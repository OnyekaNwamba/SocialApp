import React  from "react";
import { Box, Flex, Image, VStack, Grid, GridItem, Heading, Tag, TagLabel, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { CardFront } from "./CardFront";
import './style/CardFront.css';


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

  console.log("SLIDES")
  console.log(slides)

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
            <Box className="container">
              <Box className="card">
                <CardFront sid={sid} userProfile={userProfile} className="front"/>
                <CardFront sid={sid} userProfile={userProfile} className="back"/>
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

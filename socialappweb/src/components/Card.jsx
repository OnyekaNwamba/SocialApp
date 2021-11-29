import { Box, useColorModeValue, Flex, Heading } from '@chakra-ui/react'
import * as React from 'react'

export const Card = (props) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    rounded={{
      md: 'lg',
    }}
    shadow="base"
    overflow="hidden"
    {...props}
  />
)

export const CardHeader = (props) => {
  const { title, action } = props
  return (
    <Flex align="center" justify="space-between" px="6" py="4" borderBottomWidth="1px">
      <Heading as="h2" fontSize="lg">
        {title}
      </Heading>
      {action}
    </Flex>
  )
}

export const CardContent = (props) => <Box {...props} />


export const Property = (props) => {
  const { label, value, ...flexProps } = props
  return (
    <Flex
      as="dl"
      direction={{
        base: 'column',
        sm: 'row',
      }}
      px="6"
      py="4"
      _even={{
        bg: useColorModeValue('gray.50', 'gray.600'),
      }}
      {...flexProps}
    >
      <Box as="dt" minWidth="180px">
        {label}
      </Box>
      <Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Box>
    </Flex>
  )
}

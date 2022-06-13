// Chakra imports
import { Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../Card/Card";
import {CardBody} from "../../Card/CardBody";
// Custom icons
import {
  CartIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "../../Icons/Icons";
import React from "react";
import ChartStatistics from "./ChartStatistics";

const ActiveUsers = ({ title, percentage, chart }): JSX.Element => {
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card py='' h="100%">
      <CardBody h="100%">
        <Flex direction='column' w='100%' h="100%">
          <Flex direction='column' 
                // mt='24px' 
                // mb='36px' 
                bg={"white"}
                width={"100%"}
                p={4}
                borderRadius={"5px 5px 0 0"}
                alignSelf='flex-start'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              {title}
            </Text>
            {/* <Text fontSize='md' fontWeight='medium' color='gray.400'>
              <Text
                as='span'
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight='bold'>
                {percentage > 0 ? `+${percentage}%` : `-${percentage}%`}
              </Text>{" "}
              than last week
            </Text> */}
          </Flex>
          {chart}
          {/* <SimpleGrid gap={{ sm: "12px" }} columns={4}>
            <ChartStatistics
              title={"Users"}
              amount={"32,984"}
              percentage={20}
              icon={<WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Clicks"}
              amount={"2.42m"}
              percentage={80}
              icon={<RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Sales"}
              amount={"2,400$"}
              percentage={30}
              icon={<CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Items"}
              amount={"320"}
              percentage={40}
              icon={<StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
          </SimpleGrid> */}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ActiveUsers;

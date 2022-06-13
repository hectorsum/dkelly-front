import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

export const IconBox = (props): JSX.Element => {
  const { children, ...rest } = props;
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"12px"}
      {...rest}
    >
      {children}
    </Flex>
  );
}

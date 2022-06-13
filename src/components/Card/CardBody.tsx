import { Box, useStyleConfig } from "@chakra-ui/react";
import {FC} from 'react';
export const CardBody = (props: any): JSX.Element => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardBody", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}
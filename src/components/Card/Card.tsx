import {FC} from 'react';
import { Box, useStyleConfig } from "@chakra-ui/react";

export const Card = (props: any): JSX.Element => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant }) as any;
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default Card;

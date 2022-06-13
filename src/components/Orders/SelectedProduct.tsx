import { Badge, Box, Flex, HStack, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux';
import { deleteProductCart } from '../../state/action-creators/cart';
import { Product } from '../../state/actions/product'
interface IProduct {
  product: Product
}
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const SelectedProduct: FC<IProduct> = ({product:{_id,name,qty}}): JSX.Element => {
  const dispatch = useDispatch();
  const handleRemoveFromCart = () => {
    dispatch(deleteProductCart(_id!));
  }
  return (
    <HStack spacing={4} mr={1} mb={1} w="fit-content">
      <Tag
        size={"lg"}
        key={"lg"}
        borderRadius='full'
        variant='solid'
        bgColor={'blue.100'}
        color={"#000"}
      >
        <Badge variant={"subtle"} 
               rounded={"full"}
               display={"flex"}
               alignItems={"center"}
               bg="gray.50"
               size='md'
               ml={-1}
               mr={2}
               py={1} px={2}
             >{qty}</Badge>
        <TagLabel>{(name.toLowerCase().includes("helado")) ? capitalizeFirstLetter(name.replace("Helado","")) : capitalizeFirstLetter(name)}</TagLabel>
        <TagCloseButton onClick={handleRemoveFromCart} />
      </Tag>
    </HStack>
  )
}

import { Badge, border, Box, Button, Flex, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import {addProductCart,addQtyProductCart,deleteProductCart, removeQtyProductCart, updateProductCart} from '../../state/action-creators/cart';
import { CartState } from '../../state/actions/cart';
import { Product } from '../../state/actions/product';

interface IProduct {
  product: Product
}
export const ProductItem: React.FC<IProduct> = ({product: {_id,name,qty,price,type, machine}}) => {
  const [isSelected, setIsSelected] = useState(false);
  const initialStock = useRef<number>(); 
  const {cart}: CartState = useSelector((state: RootState) => state.cart);
  const [counter, setCounter] = useState(1)
  const dispatch = useDispatch();  
  const addToCart = (p: Product): void => {
    if(!isSelected){
      dispatch(addProductCart({
        _id,
        name,
        qty:1,
        price,
        machine,
        type
      }))
      setIsSelected(true)
    }else{
      dispatch(deleteProductCart(p._id!))
      setIsSelected(false)
    }
  }
  const decreaseQty = (): void => {
    setCounter(() => counter <= 0 ? 0 : counter - 1);
    if (counter > 0) {
      dispatch(removeQtyProductCart(_id!));
    }
  }
  const increaseQty = (): void => {
    console.log("limit-total: ",initialStock.current!+qty);
    setCounter(() => {
      if(counter === qty){
        return qty 
      }else if (counter === (initialStock.current!+qty)){
        return counter;
      }else{
        dispatch(addQtyProductCart(_id!))  
        return counter + 1
      }
    })
  }
  const updateQty = (id: string, qty: number): void => {
    dispatch(updateProductCart(id, qty));
  }
  const isProductInCart = cart.some(elem => elem._id === _id);
  useEffect(() => {
    if(isProductInCart) {
      setIsSelected(true);
      const {qty} = cart.find(elem => elem._id === _id) as Product;
      initialStock.current = qty;
      setCounter(qty);
    }else{
      setIsSelected(false);
    }
  },[_id, isProductInCart])
  useEffect(() => {
    if (counter === 0) {
      dispatch(deleteProductCart(_id!))
      setIsSelected(false);
    }
  },[dispatch, counter, _id])
  console.log("counter: ",counter);
  return (
    <Flex borderBottom={"1px solid #ccc"} 
          justifyContent={"space-between"} 
          borderRadius={5}
          alignItems={"center"} p={3}
          position={"relative"}
          transition={"all 0.2s ease-out"}
          bgColor={(isSelected || isProductInCart) ? "green.100" : "transparent"}
          h={"55px"}
          >
      <Flex>
        <Stack minW={"50px"}>
          <Badge variant='subtle' 
                rounded={"full"} 
                width={"auto"}
                colorScheme={(qty < 10) ? "yellow" : "blue"} mr={3}
                display={"flex"} 
                justifyContent={"center"}
                alignItems={"center"}>
            <Text fontSize="sm">{qty}</Text>
          </Badge>
        </Stack>
        <Text onClick={() => addToCart({_id,name,qty,price,machine, type})}
              _hover={{
                cursor:"pointer",
                textDecoration:"underline",
              }}>
          {name}
        </Text>
      </Flex>
      {
        (isSelected || isProductInCart) && 
        <InputGroup
          size="sm"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100px"
          h={"30px"}
        >
          <InputLeftElement>
            <Button
              rounded="full"
              size={'sm'} 
              onClick={() => decreaseQty()}
            >
              <Icon as={FiMinus} h={4} w={4} />
            </Button>
          </InputLeftElement>
          <Input
            type="number"
            min="0"
            // size="sm"
            height="100%"
            textAlign="center"
            fontSize="md"
            fontWeight={"bold"}
            name="product_quantity"
            value={counter}
            isReadOnly
            variant="unstyled"
            onChange={() => {
              updateQty(_id!, counter)
            }}
          />
          <InputRightElement>
            <Button
              rounded="full"
              size="sm"
              onClick={() => increaseQty()}
            >
              <Icon as={FiPlus} h={4} w={4} />
            </Button>
          </InputRightElement>
        </InputGroup>
      }
    </Flex>
  )
}

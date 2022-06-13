import { WarningIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Link, Skeleton, Text, Tooltip, useColorModeValue, VStack } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link as ReactRouterLink} from 'react-router-dom';
import { RootState } from '../../../state';
import { getCustomers } from '../../../state/action-creators/customer';
import { getOrders } from '../../../state/action-creators/order';
import { setIsConfirming } from '../../../state/action-creators/popup';
import { Customer, CustomerState } from '../../../state/actions/customer';
import { OrderState } from '../../../state/actions/order';

interface IProps {
  title: string
}

export const MissingPayments: FC<IProps> = ({title}): JSX.Element => {  
  const {orders, loading: ordersAreLoaded}: OrderState = useSelector((state: RootState) => state.orders);
  const {customers, loading:customersAreLoaded}: CustomerState = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();
  const textColor = useColorModeValue("gray.700", "white");
  const customerFound = (customer_id: string) => {
  const customer = customers.find((c: Customer) => ((customer_id) && c._id === customer_id) ? c.fullname : "") as Customer;
    return customer.fullname;
  }
  const handleConfirmation = (idSelected: string) => {
    // onOpenConfirmation();
    dispatch(setIsConfirming({ isOpen: true, idSelected: idSelected }))
  }
  useEffect(() => {
    const retrieveOrders = () => dispatch(getOrders());
    retrieveOrders();
  },[dispatch])
  useEffect(() => {
    const retrieveCustomers = () => dispatch(getCustomers());
    retrieveCustomers();
  },[dispatch]);
  console.log("orders: ",orders)
  return (
    <Flex direction='column' 
          // mt='24px' 
          // mb='36px' 
          bg={"white"}
          width={"100%"}
          border="1px solid #e2e8f0;"
          borderRadius={"5px 5px 0 0"}
          alignSelf='flex-start'>
      <Box p={4} width={"100%"}>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </Box>
      <Box alignItems={"flex-start"} 
              maxH={"400px"} 
              overflow={"auto"} display={"flex"} flexDirection={"column"}>
        {
          (!ordersAreLoaded && !customersAreLoaded) ? orders.map((order) => !order.hasPaid && (
            <HStack borderTop="1px solid #e2e8f0;" 
                    width={"100%"} p={5} 
                    justifyContent={"space-between"} 
                    bg={"white"} key={order._id}>
              <Tooltip label={`Ver las ventas de Hector`} 
                              bg='gray.300' 
                              color='black' 
                              hasArrow>
                <Link as={ReactRouterLink} color='teal.500' to={`/pedidos/cliente/${order.customer}`} textDecoration={"none"}>
                  {customerFound(order.customer)}
                </Link>
              </Tooltip>
              <Flex>
                <Text mr={5}>{"S/."+(Math.round((order.total!) * 100) / 100).toFixed(2)}</Text>
                <Tooltip label={`Falta cancelar el pedido`}
                                bg='gray.300' 
                                color='black' 
                                hasArrow>
                    <Link m={0} display={"flex"} alignItems={"center"} onClick={() => handleConfirmation(order._id!)}>
                      <WarningIcon w={4} h={4} color={"yellow.500"}/>
                    </Link>
                </Tooltip>
              </Flex>
            </HStack>
          )) : [...Array(5)].map(() => (
            <Skeleton w="100%" mb={1}>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
          ))
        }
      </Box>
    </Flex>
  )
}

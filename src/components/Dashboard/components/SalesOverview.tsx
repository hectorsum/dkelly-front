// Chakra imports
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../Card/Card";
import CardHeader from "../../Card/CardHeader"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductState } from "../../../state/actions/product";
import { RootState } from "../../../state";
import { getProducts, getSingleProduct } from "../../../state/action-creators/products";

const SalesOverview = ({ title, percentage, chart }):JSX.Element => {
  const textColor = useColorModeValue("gray.700", "white");
  const [product ,setProduct] = useState("");
  const dispatch = useDispatch();
  const {products, loading}: ProductState = useSelector((state: RootState) => state.products);
  useEffect(() => {
    dispatch(getProducts())
  },[dispatch])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct(e.target.value);
    dispatch(getSingleProduct(e.target.value));
  }
  return (
    <Card p='0' mb={{ sm: "26px", lg: "0px" }} 
          bg="white" 
          borderRadius={5}
          >
      <CardHeader mb='20px'>
        <Flex alignItems={{sm:"flex-start",lg:"center"}} justifyContent={{lg:"space-between"}} flexDirection={{sm: "column",lg:"row"}} p={5}>
          <Text fontSize='lg' color={textColor} fontWeight='bold' mb={{sm:"0.5rem"}}>
            {title}
          </Text>
          <Select placeholder='Selecciona Producto' width={"300px"} onChange={handleChange}>
            {
              (!loading) && products.map(p => (
                <option value={p._id}>{p.name}</option>
              ))
            }
          </Select>
          {/* <Text fontSize='md' fontWeight='medium' color='gray.400'>
            <Text
              as='span'
              color={percentage > 0 ? "green.400" : "red.400"}
              fontWeight='bold'>
              {`${percentage}%`} more
            </Text>{" "}
            in 2021
          </Text> */}
        </Flex>
      </CardHeader>
      <Box w='100%' h={{ sm: "300px",md: "100%" }}>
        {chart}
      </Box>
    </Card>
  );
};

export default SalesOverview;

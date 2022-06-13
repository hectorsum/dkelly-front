import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../../state";
import { auth } from "../../state/action-creators/auth";
import { AuthState } from "../../state/actions/auth";

export const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {email, password} = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data: AuthState = useSelector((state: RootState) => state.auth);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(auth(email, password));
  };
  
  useEffect(() => {
    if(data.isAuthenticated){
      navigate(`pedidos`);
    }
  },[data.isAuthenticated])
  
  const inputChange = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>
            <Avatar bg="transparent" display="flex" justifyContent="center" alignItems="center">
              <Image src={'/dkelly-logo.png'} alt="Garage Logo"/>
            </Avatar>
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Correo</FormLabel>
              <Input type="email" onChange={inputChange} name="email" value={formData.email}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contrasena</FormLabel>
              <Input type="password" onChange={inputChange} name="password" value={formData.password}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={handleSubmit}>
                Ingresar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginScreen;

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import {Input, FormControl, FormLabel, InputGroup, Select, InputLeftAddon, useDisclosure, Box, Button} from '@chakra-ui/react';
import { Collapse } from "@chakra-ui/transition"
import React, { FC, LegacyRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../state/action-creators/products';
import { Product } from '../../state/actions/product';
interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const AddProduct: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}): JSX.Element => {
  const dispatch = useDispatch();
  const { isOpen:isQtyShown, 
          onToggle, 
          onClose: onQtyClose, 
          onOpen: onQtyOpen } = useDisclosure()
  const [formData, setFormData] = useState<Product>({
    name: "",
    type: "icecream",
    machine:0,
    qty: 0,
    price: 0,
  });
  const saveProduct = () => {
    dispatch(addProduct(formData));
    onClose();
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    e.preventDefault();
    if(e.target.name === "type" && e.target.value === "other"){
      onQtyOpen();
    }else if (e.target.name === "type" && e.target.value !== "other"){
      onQtyClose();
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }  
  return (
    <Modal finalFocusRef={finalRef} 
           isOpen={isOpen} 
           onClose={onClose} 
           motionPreset='slideInBottom' 
           size={'lg'}
           >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4}>
            <FormLabel>Nombre de Producto</FormLabel>
            <InputGroup>
              <Input 
                type="text"
                name="name"
                onChange={onChange}
                autoComplete='off'
                value={formData.name}
              />
            </InputGroup>
          </FormControl>
          {/* <FormControl mb={4}>
            <FormLabel>Tipo de Producto</FormLabel>
            <Select name="type" onChange={onChange} value={formData.type}>
              <option value='icecream' >Helado</option>
              <option value='other' >Otro</option>
            </Select>
          </FormControl> */}
          <FormControl mb={4}>
            <FormLabel>Numero de Maquina</FormLabel>
            <Select name="machine" onChange={onChange} value={formData.machine}>
              <option value='' >Seleccionar Maquina</option>
              <option value='1' >01</option>
              <option value='2' >02</option>
              <option value='3' >03</option>
              <option value='4' >04</option>
              <option value='5' >05</option>
            </Select>
          </FormControl>
          {/* <Collapse in={isQtyShown} delay={200}> */}
          <FormControl isRequired mb={4}>
            <FormLabel>Cantidad</FormLabel>
            <InputGroup>
              <Input 
                type="number"
                name="qty"
                onChange={onChange}
                autoComplete='off'
                value={formData.qty}
              />
            </InputGroup>
          </FormControl>
          {/* </Collapse> */}
          <FormControl isRequired mb={4}>
            <FormLabel>Precio</FormLabel>
            <InputGroup>
              <InputLeftAddon children='S/' />
              <Input 
                type="number"
                name="price"
                step="0.01"
                onChange={onChange}
                value={formData.price}
                autoComplete='off'
              />
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}> Cerrar </Button>
          <Button colorScheme='blue' onClick={() => saveProduct()}>Registrar Producto</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

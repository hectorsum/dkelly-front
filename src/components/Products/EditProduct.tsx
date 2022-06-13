import React, { FC, LegacyRef, useEffect, useState } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Select, Spinner } from '@chakra-ui/react'
import { Product, ProductState } from '../../state/actions/product';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct, updateProduct } from '../../state/action-creators/products';
import { RootState } from '../../state';
import { PopupState } from '../../state/actions/popup';
import { setIsEditing } from '../../state/action-creators/popup';

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const EditProduct: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}): JSX.Element => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Product>({
    name: "",
    type: "icecream",
    machine:0,
    qty: 0,
    price: 0,
  });
  const {isEditing: {idSelected}}: PopupState = useSelector((state: RootState) => state.popup);
  const {product, loading}: ProductState = useSelector((state: RootState) => state.products);
  const handleClose = (): void => {
    onClose();
    dispatch(setIsEditing({
      idSelected: null,
      isOpen: false
    }))
  }
  const handleEdit = (): void => {
    dispatch(updateProduct(idSelected!,formData));
    handleClose();
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }  
  useEffect(() => {
    const retrieveProduct = () => dispatch(getSingleProduct(idSelected!));
    retrieveProduct();
  },[dispatch, idSelected])
  useEffect(() => {
    if(product){
      setFormData({
        name: product.name,
        type: product.type,
        machine: product.machine,
        qty: product.qty,
        price: product.price
      })
    }
  },[dispatch,product])
  return (
    <Modal finalFocusRef={finalRef} 
           isOpen={isOpen} 
           onClose={handleClose} 
           motionPreset='slideInBottom' 
           size={'lg'}
           >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Producto</ModalHeader>
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
                <option value='icecream'>Helado</option>
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
        <Button mr={3} onClick={handleClose}> Cerrar </Button>
        <Button colorScheme='yellow' onClick={() => handleEdit()}>Editar Producto</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

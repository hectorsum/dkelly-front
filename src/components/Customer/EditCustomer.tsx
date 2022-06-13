import React, { FC, LegacyRef, RefObject, useEffect, useState } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Customer, CustomerState } from '../../state/actions/customer';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomer, getSingleCustomer } from '../../state/action-creators/customer';
import { PopupState } from '../../state/actions/popup';
import { RootState } from '../../state';
import { setIsEditing } from '../../state/action-creators/popup';
import { Collapse } from "@chakra-ui/transition"

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const EditCustomer: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}): JSX.Element => {
  const [formData, setFormData] = useState<Customer>({
    fullname: "",
    cellphone: "",
    company: "",
  });
  const {isEditing: {idSelected}}: PopupState = useSelector((state: RootState) => state.popup);
  const {customer, loading}: CustomerState = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();
  const handleClose = ():void => {
    onClose()
    dispatch(setIsEditing({
      idSelected: null,
      isOpen: false
    }));
  }
  const handleSubmit = (): void => {
    dispatch(updateCustomer(idSelected!, formData));
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
    const retrieveProduct = () => dispatch(getSingleCustomer(idSelected!));
    retrieveProduct();
  },[dispatch, idSelected])
  useEffect(() => {
    if(customer){
      setFormData({
        fullname: customer.fullname,
        cellphone: customer.cellphone,
        company: customer.company,
      })
    }
  },[dispatch,customer])
  return (
    <Modal finalFocusRef={finalRef} 
          isOpen={isOpen} 
          onClose={handleClose} 
          motionPreset='slideInBottom' 
          size={'lg'}
          >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4} position={"relative"}>
            <FormLabel>Nombre del Cliente</FormLabel>
            <InputGroup>
                <Input
                  type="text"
                  name="fullname"
                  onChange={onChange}
                  value={formData.fullname}
                  autoComplete='off'
                />
            </InputGroup>
          </FormControl>
          <FormControl mb={4} position={"relative"}>
            <FormLabel>Celular</FormLabel>
            <InputGroup>
                <Input
                  type="text"
                  name="cellphone"
                  onChange={onChange}
                  value={formData.cellphone}
                  autoComplete='off'
                  maxLength={9}
                />
            </InputGroup>
          </FormControl>
          <FormControl mb={4} position={"relative"}>
            <FormLabel>Negocio</FormLabel>
            <InputGroup>
                <Input
                  type="text"
                  name="company"
                  onChange={onChange}
                  value={formData.company}
                  autoComplete='off'
                />
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleClose}>Cerrar</Button>
          <Button colorScheme='yellow' onClick={() => handleSubmit()}>Editar Cliente</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

import React, { FC, LegacyRef, useState } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Customer } from '../../state/actions/customer'
import { addCustomer } from '../../state/action-creators/customer'
import { useDispatch } from 'react-redux'


interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}

export const AddCustomer: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}): JSX.Element => {
  const [formData, setFormData] = useState<Customer>({
    fullname: "",
    cellphone: "",
    company: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = (): void => {
    dispatch(addCustomer(formData));
    onClose();
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    e.preventDefault();
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
        <ModalHeader>Registrar Cliente</ModalHeader>
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
          <Button mr={3} onClick={onClose}> Cerrar </Button>
          <Button colorScheme='blue' onClick={() => handleSubmit()}>Registrar Cliente</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

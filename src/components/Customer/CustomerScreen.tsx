import { Box, Button, Container, Icon, Text, useDisclosure } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { FiPlus } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import { PopupState } from '../../state/actions/popup';
import { CustomAlert, ModalTypes } from '../../utils/CustomAlert';
import { AddCustomer } from './AddCustomer';
import { CustomerTable } from './CustomerTable'
import { EditCustomer } from './EditCustomer';

export const CustomerScreen = () => {
  const { isOpen:isOpenAdd, onOpen: onOpenAdd, onClose:onCloseAdd } = useDisclosure();
  const { isOpen:isOpenEdit, onOpen: onOpenEdit, onClose:onCloseEdit } = useDisclosure();
  const { isOpen:isOpenDelete, onOpen: onOpenDelete, onClose:onCloseDelete } = useDisclosure();
  //Add
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<any>(null);
  const { isEditing, isDeleting }: PopupState = useSelector((state: RootState) => state.popup);
  return (
    <Container maxW='container.lg' padding="5">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <Box >
          <Text fontSize="3xl"
                fontWeight="bold"
                lineHeight="short"
                >
            Clientes
          </Text>
        </Box>
        <Button colorScheme="green" 
                onClick={onOpenAdd} 
                leftIcon={<Icon as={FiPlus} h={[4, 6]} w={[4, 6]} alignSelf={"center"} />}>
          Agregar Cliente
        </Button>
      </Box>
      <CustomerTable onOpenEdit={onOpenEdit}
                     onOpenDelete={onOpenDelete}/>
      {
        (isOpenAdd) && <AddCustomer initialRef={initialRef} 
                                    finalRef={finalRef} 
                                    isOpen={isOpenAdd} 
                                    onClose={onCloseAdd}/>
      }
      {
        (isOpenEdit) && <EditCustomer initialRef={initialRef} 
                                      finalRef={finalRef} 
                                      isOpen={isOpenEdit} 
                                      onClose={onCloseEdit}/>
      }
      {
        (isOpenDelete) && <CustomAlert isOpenDelete={isOpenDelete} 
                                       onCloseDelete={onCloseDelete}
                                       deleteInitRef={initialRef}
                                       deleteFinalRef={finalRef}
                                       idSelected={isDeleting.idSelected!}
                                       alertType={ModalTypes.CUSTOMER}/>
      } 
    </Container>
  )
}

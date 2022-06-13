import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import React, { FC, LegacyRef, RefObject, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCustomer } from '../state/action-creators/customer'
import { confirmPayment } from '../state/action-creators/order'
import { setIsConfirming, setIsDeleting } from '../state/action-creators/popup'
import { deleteProduct } from '../state/action-creators/products'

interface IProps {
  isOpenDelete: boolean,
  onCloseDelete: () => void,
  deleteInitRef: LegacyRef<HTMLInputElement>,
  deleteFinalRef: RefObject<HTMLButtonElement>,
  alertType: string,
  idSelected: string
}
export enum ModalTypes {
  PRODUCT = "PRODUCT",
  EMPLOYEE = "EMPLOYEE",
  CUSTOMER = "CUSTOMER",
  CONFIRMATION = "CONFIRMATION"
}
export const CustomAlert: FC<IProps> = ({isOpenDelete, 
                                         onCloseDelete,
                                         deleteInitRef,
                                         deleteFinalRef,
                                         alertType,
                                         idSelected}): JSX.Element => {
  const cancelRef = useRef<any>()
  const dispatch = useDispatch();
  const [bgColor, setBgColor] = useState<string>("");
  const handleSubmit = () => {
    if(ModalTypes.PRODUCT === alertType){
      dispatch(deleteProduct(idSelected));
    }else if(ModalTypes.CUSTOMER === alertType){
      dispatch(deleteCustomer(idSelected));
    }else if(ModalTypes.EMPLOYEE === alertType){
      //
    }else if (ModalTypes.CONFIRMATION === alertType){
      dispatch(confirmPayment(idSelected!))
    }
    handleClose();
  }
  const handleClose = () => {
    if (ModalTypes.CONFIRMATION === alertType){
      dispatch(setIsConfirming({
        idSelected: null,
        isOpen: false
      }));
    }else{
      dispatch(setIsDeleting({
        idSelected: null,
        isOpen: false
      }));
    }
    onCloseDelete();
  }
  
  useEffect(() => {
    if(alertType === ModalTypes.PRODUCT || 
       alertType === ModalTypes.CUSTOMER || 
       alertType === ModalTypes.EMPLOYEE){
      setBgColor("red");
    }else if (alertType === ModalTypes.CONFIRMATION){
      setBgColor("green");
    }else{
      setBgColor("blue");
    }
  },[alertType])
  return (
    <AlertDialog
      isOpen={isOpenDelete}
      leastDestructiveRef={deleteFinalRef}
      onClose={handleClose}
      motionPreset='slideInBottom'
    >
      <AlertDialogOverlay/>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          {(alertType === ModalTypes.PRODUCT) && "Eliminar Producto"}
          {(alertType === ModalTypes.CUSTOMER) && "Eliminar Cliente"}
          {(alertType === ModalTypes.EMPLOYEE) && "Eliminar Empleado"}
          {(alertType === ModalTypes.CONFIRMATION) && "Confirmar Pago"}
        </AlertDialogHeader>

        <AlertDialogBody>
        {(alertType === ModalTypes.PRODUCT ||
          alertType === ModalTypes.EMPLOYEE ||
          alertType === ModalTypes.CUSTOMER) && "¿Esta seguro que desea eliminar?"}
        {(alertType === ModalTypes.CONFIRMATION) && "El cliente ha cancelado el total de su pago"}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={deleteFinalRef} onClick={handleClose}>
            Cancelar
          </Button>
          <Button colorScheme={bgColor} ml={3} onClick={handleSubmit}>
            {(alertType === ModalTypes.PRODUCT ||
              alertType === ModalTypes.EMPLOYEE || 
              alertType === ModalTypes.CUSTOMER) && "Eliminar"}
            {(alertType === ModalTypes.CONFIRMATION) && "Confirmar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

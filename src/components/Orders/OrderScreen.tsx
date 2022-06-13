import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Container, Icon, Text, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state";
import { confirmPayment } from "../../state/action-creators/order";
import { setIsConfirming } from "../../state/action-creators/popup";
import { PopupAction, PopupState } from "../../state/actions/popup";
import { CustomAlert, ModalTypes } from "../../utils/CustomAlert";
import { AddOrder } from "./AddOrder";
import { EditOrder } from "./EditOrder";
import {OrdersTable} from "./OrdersTable";

export const OrderScreen = () => {
  const { isOpen:isOpenAdd, onOpen: onOpenAdd, onClose:onCloseAdd } = useDisclosure();
  const { isOpen:isOpenEdit, onOpen: onOpenEdit, onClose:onCloseEdit } = useDisclosure();
  const { isOpen:isOpenConfirmation, onOpen: onOpenConfirmation, onClose:onCloseConfirmation } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<any>(null);
  const { isConfirming, isEditing}: PopupState = useSelector((state: RootState) => state.popup);
  return (
    <Container maxW='container.lg' padding="5" >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <Box >
          <Text fontSize="3xl"
                fontWeight="bold"
                lineHeight="short"
                >
            Pedidos
          </Text>
        </Box>
        <Button colorScheme="green" 
                onClick={onOpenAdd} 
                leftIcon={<Icon as={FiPlus} h={[4, 6]} w={[4, 6]} 
                alignSelf={"center"} />}>
          Agregar Pedido
        </Button>
      </Box>
      <OrdersTable onOpenEdit={onOpenEdit} 
                   onOpenConfirmation={onOpenConfirmation}/>
      {
        (isOpenAdd) && <AddOrder initialRef={initialRef} 
                              finalRef={finalRef} 
                              isOpen={isOpenAdd} 
                              onClose={onCloseAdd}/>
      }
      {
        (isOpenEdit) && <EditOrder initialRef={initialRef} 
                                   finalRef={finalRef} 
                                   isOpen={isOpenEdit} 
                                   onClose={onCloseEdit}/>
      }
      {
        (isOpenConfirmation) && <CustomAlert isOpenDelete={isOpenConfirmation} 
                                             onCloseDelete={onCloseConfirmation}
                                             deleteInitRef={initialRef}
                                             deleteFinalRef={finalRef}
                                             idSelected={isConfirming.idSelected!}
                                             alertType={ModalTypes.CONFIRMATION}/>
      }
    </Container>
  )
}

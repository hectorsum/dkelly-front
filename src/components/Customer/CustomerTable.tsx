import { PhoneIcon } from '@chakra-ui/icons';
import { Badge, Flex, Menu, MenuButton, MenuItem, MenuList, Portal, Spinner, Stack, Text } from '@chakra-ui/react'
import MaterialTable from '@material-table/core'
import React, { FC, useEffect } from 'react'
import { FiEdit, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { getCustomers } from '../../state/action-creators/customer';
import { setIsDeleting, setIsEditing } from '../../state/action-creators/popup';
import { Customer, CustomerState } from '../../state/actions/customer';
import { ActionsButton } from '../../utils/ActionsButton';
import { localizationTable, optionsTable, headerStyle, cellStyle } from '../../utils/Table';

interface IProps {
  onOpenEdit: () => void,
  onOpenDelete: () => void,
}

export const CustomerTable: FC<IProps> = ({onOpenEdit, onOpenDelete}): JSX.Element => {
  const {customers, loading}: CustomerState = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();
  const handleEdit = (idSelected: string) => {
    onOpenEdit();
    dispatch(setIsEditing({
      idSelected,
      isOpen: true
    }))
  }
  const handleDelete = (idSelected: string) => {
    onOpenDelete();
    dispatch(setIsDeleting({
      idSelected,
      isOpen: true
    }))
  }
  useEffect(() => {
    const retrieveCustomers = () => dispatch(getCustomers());
    retrieveCustomers();
  },[dispatch])
  return <>
    {
      (!loading) ? <MaterialTable
          options={optionsTable}
          localization={localizationTable}
          columns={[
          { title: 'Cliente', field: 'fullname', headerStyle, cellStyle},
          { title: 'Celular', field: 'cellphone', type: 'numeric',render: (rowData: Customer) => {
            return <Flex alignItems={"center"}>
              <PhoneIcon mr={3} w={4} h={4}/>
              <Text>{rowData.cellphone.match(/.{1,3}/g)?.join("-")}</Text>
            </Flex>
          }, headerStyle, cellStyle},
          { title: 'Negocio', field: 'company', render: (rowData: Customer) => {
            return (rowData.company) ? 
                   <Text>{rowData.company}</Text> : 
                   <Text>No se agregó negocio</Text>
          }, headerStyle, cellStyle},
          { title: 'Acciones', field: 'actions', render: (rowData: Customer) => {
              return <Menu isLazy placement="left-start">
                <MenuButton as={ActionsButton}>
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem
                      icon={<FiEdit />} 
                      onClick={() => handleEdit(rowData._id!)}
                      >Editar
                    </MenuItem>
                    <MenuItem
                      icon={<FiXCircle />} 
                      onClick={() => handleDelete(rowData._id!)}
                    >
                      Eliminar
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
          }, headerStyle, cellStyle},
          ]}
          data={customers}
      /> : <Flex w="100%" alignItems={"center"} justifyContent={"center"} minH={"150px"}>
        <Spinner thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='#b43137'
                size='xl'/>
      </Flex>
    }
  </>
}

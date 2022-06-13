import { ArrowUpDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormLabel, IconButton, Input, InputGroup, InputLeftElement, Select, Spacer, Spinner, Switch, Textarea } from '@chakra-ui/react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { FC, LegacyRef, useEffect, useMemo, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { CustomerItem } from './CustomerItem'
import { ProductItem } from './ProductItem'
import { SelectedProduct } from './SelectedProduct'
import { Customer, CustomerState } from '../../state/actions/customer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state'
import { loadAllProducts, removeAllProducts } from '../../state/action-creators/cart'
import { addOrder, getSingleOrder, updateOrder } from '../../state/action-creators/order'
import { Product, ProductState } from '../../state/actions/product'
import { CartState } from '../../state/actions/cart'
import { setIsEditing } from '../../state/action-creators/popup'
import { OrderState } from '../../state/actions/order'
import { PopupState } from '../../state/actions/popup'
import { getProducts } from '../../state/action-creators/products'

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
export const EditOrder: FC<IProps> = ({initialRef, finalRef, isOpen, onClose}): JSX.Element => {
  const [isActive, setIsActive] = useState(false);
  const {cart}: CartState = useSelector((state: RootState) => state.cart);
  const {products}: ProductState = useSelector((state: RootState) => state.products);
  const {customer: customerSelected,customers, loading: customerIsLoading}: CustomerState = useSelector((state: RootState) => state.customers);
  const {order, loading}: OrderState = useSelector((state: RootState) => state.orders);
  const {isEditing: {idSelected}}: PopupState = useSelector((state: RootState) => state.popup);
  const dispatch = useDispatch();
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    customerid:"",
    customer: "",
    machine: 1,
    product: "",
    products: [],
    notes: "",
  })
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const closeModal = () => {
    onClose();
    dispatch(setIsEditing({
      idSelected: null,
      isOpen: false
    }))
    dispatch(removeAllProducts());
  }
  const handleEdit = () => {
    console.log("clicked!!")
    dispatch(updateOrder(idSelected!,{
      customer: formData.customerid,
      products: cart,
      notes: formData.notes,
      hasPaid: hasPaid
    }));
    dispatch(setIsEditing({
      idSelected: null,
      isOpen:false
    }));
    onClose();
    dispatch(removeAllProducts());
  }
  const filteredProducts = useMemo(() => 
  products.filter((p: Product) => (formData.machine.toString().trim() === p.machine.toString().trim() && formData.product && p.qty > 0) && p.name.toLowerCase().includes(formData.product.toLowerCase())),
  [products, formData.product, formData.machine]);

  const foundCustomer = customers.find(c => c._id === order?.customer) as Customer;
  useEffect(() => {
    const retrieveProducts = () => dispatch(getProducts());
    retrieveProducts();
  },[dispatch])
  useEffect(() => {
    const retrieveOrder = () => dispatch(getSingleOrder(idSelected!));
    retrieveOrder();
  },[dispatch, idSelected])
  useEffect(() => {
      if(order && order.products.length > 0){
        dispatch(loadAllProducts(order?.products!));
        setHasPaid(order.hasPaid);
      }
  },[dispatch,order])
  return <>
    <Modal finalFocusRef={finalRef} 
           isOpen={isOpen} 
           onClose={closeModal} 
           motionPreset='slideInBottom' 
           size={'lg'}
           >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Pedido</ModalHeader>
        <ModalCloseButton />
        {
          (!loading && order && !customerIsLoading) ?
          <ModalBody>
            <FormControl isRequired mb={4} position={"relative"}>
              <FormLabel>Cliente</FormLabel>
              <InputGroup>
                  <CustomerItem customer={foundCustomer}/>
              </InputGroup>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Nro. Maquina</FormLabel>
              <Select onChange={onChange} name={"machine"} value={formData.machine}>
                <option value='1' >01</option>
                <option value='2' >02</option>
                <option value='3' >03</option>
                <option value='4' >04</option>
                <option value='5' >05</option>
              </Select>
            </FormControl>
            <FormControl isRequired mb={4} position="relative">
              <FormLabel>Productos</FormLabel>
              <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children={<AiOutlineSearch color='gray.300' />}
                  />
                <Input 
                  type="text"
                  name="product"
                  placeholder="Buscar Producto"
                  onChange={onChange}
                  value={formData.product}
                  autoComplete='off'
                  onClick={() => setIsActive(!isActive)}
                  mr={1}
                />
              </InputGroup>
              {
                (cart.length > 0) && <Flex flexWrap={"wrap"} mt={2}>
                  {
                    cart.map(p => (
                      <SelectedProduct key={p._id} product={p}/>
                    ))
                  }
                </Flex>
              }
              {
                (isActive && filteredProducts.length > 0) && <Box 
                                  position={"absolute"}
                                  display={"block"}
                                  w="100%"
                                  zIndex={999}
                                  bg="#fff"
                                  border="1px solid #ccc" mt={2} mb={4}
                                  borderBottom={"none"}
                                  borderRadius={5}
                                  boxShadow={"0 0 0 1px rgba(0,0,0,.1)"}>
                  {
                    filteredProducts.map((p: Product) => (
                      <ProductItem key={p._id} product={p}/>
                    ))
                  }
                </Box>
              }
            </FormControl>
            {/* <FormControl mb={4}>
              <FormLabel>Notas</FormLabel>
              <Textarea onChange={onChange} name={"notes"} value={formData.notes} resize={"none"}/>
            </FormControl> */}
            <FormControl isRequired>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Spacer/>
                <FormControl display='flex' alignItems='center' width="fit-content">
                  <FormLabel htmlFor='email-alerts' mb='0' cursor="pointer">
                    ¿Esta cancelado completo?
                  </FormLabel>
                  <Switch id='email-alerts' 
                          size="lg" 
                          onChange={() => setHasPaid(!hasPaid)} 
                          name={"hasPaid"}/>
                </FormControl>
              </Box>
            </FormControl>
          </ModalBody> : <Flex w="100%" alignItems={"center"} justifyContent={"center"} minH={"350px"}>
            <Spinner thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='#b43137'
                    size='xl'/>
          </Flex>
        }
        <ModalFooter>
          <Button mr={3} onClick={closeModal}>
            Cerrar
          </Button>
          <Button colorScheme='yellow' 
                  isDisabled={(cart.length > 0) ? false : true}
                  onClick={() => handleEdit()}
                  >Editar Pedido</Button>
        </ModalFooter>
      </ModalContent>
    </Modal> 
  </>
  
}

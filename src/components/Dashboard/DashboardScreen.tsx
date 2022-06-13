import { Flex, Grid, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'
import { BiLineChart } from 'react-icons/bi'
import BarChart from '../Charts/BarChart'
import LineChart from '../Charts/LineChart'
import { CartIcon, DocumentIcon, GlobeIcon, WalletIcon } from '../Icons/Icons'
import ActiveUsers from './components/ActiveUsers'
import MiniStatistics from './components/MIniStatistics'
import { MissingPayments } from './components/MissingPayments'
import SalesOverview from './components/SalesOverview'

export const DashboardScreen: FC = (): JSX.Element => {
  const iconBoxInside = useColorModeValue("white", "white");
  return (
    <Flex flexDirection='column' pt={{ base: "0px", md: "0px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        <MiniStatistics
          title={"Ventas del dia"}
          amount={"$53,000"}
          percentage={55}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Ventas Totales 2022"}
          amount={"2,300"}
          percentage={5}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Clientes Totales"}
          amount={"+3,020"}
          percentage={-14}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Pedidos Totales del mes"}
          amount={"$173,000"}
          percentage={8}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "3fr" }}
        templateRows={{ sm: "repeat(1, 1fr)", lg: "1fr" }}
        // gap='24px'
        mb={{ lg: "26px" }} my={5}>
        {/* <ActiveUsers
          title={"Active Users"}
          percentage={23}
          chart={<BarChart />}
        /> */}
        <SalesOverview
          title={"Ventas por producto"}
          percentage={5}
          chart={<LineChart />}
        />
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        mb={{ lg: "26px" }} my={5}>
        <ActiveUsers
          title={"Ventas de los ultimos meses"}
          percentage={23}
          chart={<BarChart />}
        />
        <MissingPayments
          title={"Pedidos pendientes de pago"}
        />
        {/* <SalesOverview
          title={"Sales Overview"}
          percentage={5}
          chart={<LineChart />}
        /> */}
      </Grid>
    </Flex>
  )
}

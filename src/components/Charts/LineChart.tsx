import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import { ProductState } from "../../state/actions/product";
import { lineChartData, lineChartOptions } from "../../variables/charts";

const LineChart = (): JSX.Element => {
  const [formData, setFormData] = useState<any>({
    chartData: [],
    chartOptions:{}
  });
  const {product, loading}: ProductState = useSelector((state: RootState) => state.products);
  const filteredData = lineChartData.filter(item => item._id === product?._id);
  useEffect(() => {
    if(lineChartData && lineChartOptions){
      setFormData({
        chartData: (filteredData.length > 0) ? filteredData : lineChartData,
        chartOptions: lineChartOptions
      })
    }
  },[filteredData, product])
  
  return (
    <Box>
      <ReactApexChart
        options={formData.chartOptions}
        series={formData.chartData}
        type="area"
        width="100%"
        w="100%"
        height="300px"
        p="0"
      />
    </Box>
  );
}

export default LineChart;

import React, { Component, useEffect, useState } from "react";
import Card from "../Card/Card";
import Chart from "react-apexcharts";
import { barChartData, barChartOptions } from "../../variables/charts";
import { Text } from "@chakra-ui/react";

const  BarChart = (): JSX.Element => {
  const [formData, setFormData] = useState<any>({
    chartData: [],
    chartOptions:{}
  });

  useEffect(() => {
    if(barChartData && barChartOptions){
      setFormData({
        chartData: barChartData,
        chartOptions: barChartOptions
      })
    }
  },[])
  
  return (
    <Card
      py="1rem"
      // height={{ sm: "200px" }}
      borderRadius={"0 0 5px 5px"}
      border="1px solid #e2e8f0"
      height="100%"
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      <Chart
        options={formData.chartOptions}
        series={formData.chartData}
        type="bar"
        width="100%"
        height="100%"
      />
    </Card>
  );
  
}

export default BarChart;

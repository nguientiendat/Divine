import React from "react";
import Chart from "react-apexcharts";
import { Card, Dropdown,Container } from "react-bootstrap";
import { MoreVertical } from "lucide-react";

const DashBoard = () => {
  const chartOptions = {
    chart: {
      height: 350,
      type: "area",
      toolbar: { show: false },
    },
    markers: { size: 5 },
    colors: ["#4154f1", "#2eca6a", "#ff771d"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.4,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 4 },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: { format: "dd/MM/yy HH:mm" },
    },
  };

  const series = [
    { name: "Sales", data: [100, 40, 50, 71, 42, 82, 56] },
    { name: "Revenue", data: [80, 100, 45, 32, 34, 52, 41] },
    { name: "Customers", data: [90, 100, 32, 18, 9, 24, 11] },
  ];

  return (
    <div className="col-12 ">
        <Container>
        <Card className="p-4 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Reports <span className="text-muted">/Today</span></h5>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="border-0 p-0">
                <MoreVertical size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item>Today</Dropdown.Item>
                <Dropdown.Item>This Month</Dropdown.Item>
                <Dropdown.Item>This Year</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Chart options={chartOptions} series={series} type="area" height={350} />
        </Card.Body>
      </Card>
        </Container>
    </div>
  );
};

export default DashBoard;
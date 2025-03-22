import React, { useState, useEffect, useCallback } from "react";
import Chart from "react-apexcharts";
import { Card, Dropdown, Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import { MoreVertical } from "lucide-react";

const DashBoard = () => {
  const [soldData, setSoldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("Today");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchSoldData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/sold');
        if (!response.ok) {
          throw new Error('Failed to fetch sold data');
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setSoldData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sold data:', error);
        setError('Failed to load sales data: ' + error.message);
        setLoading(false);
      }
    };

    fetchSoldData();
  }, []);

  // Apply time filter
  useEffect(() => {
    if (!soldData || soldData.length === 0) {
      setFilteredData([]);
      return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYear = new Date(now.getFullYear(), 0, 1);

    let filtered;
    switch (timeFilter) {
      case "Today":
        filtered = soldData.filter(item => new Date(item.sold_at) >= today);
        break;
      case "This Month":
        filtered = soldData.filter(item => new Date(item.sold_at) >= thisMonth);
        break;
      case "This Year":
        filtered = soldData.filter(item => new Date(item.sold_at) >= thisYear);
        break;
      default:
        filtered = soldData;
    }

    console.log(`Applied ${timeFilter} filter:`, filtered.length, "records");
    setFilteredData(filtered);
  }, [soldData, timeFilter]);

  // Process sold data for the chart
  const processDataForChart = useCallback(() => {
    if (!filteredData || filteredData.length === 0) {
      return {
        categories: [],
        sales: [],
        revenue: [],
        customers: []
      };
    }

    // Sort data by sold_at date
    const sortedData = [...filteredData].sort((a, b) => new Date(a.sold_at) - new Date(b.sold_at));

    // Group data by day for the chart
    const groupedByDate = sortedData.reduce((acc, item) => {
      const date = new Date(item.sold_at);
      const dateString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
      
      if (!acc[dateString]) {
        acc[dateString] = {
          sales: 0,
          revenue: 0,
          customers: new Set()
        };
      }
      
      acc[dateString].sales += item.quantity || 0;
      acc[dateString].revenue += item.total_price || item.price * (item.quantity || 1);
      if (item.userId) acc[dateString].customers.add(item.userId);
      
      return acc;
    }, {});

    // Convert to arrays for the chart
    const categories = Object.keys(groupedByDate).map(date => new Date(date).getTime());
    const sales = Object.values(groupedByDate).map(day => day.sales);
    const revenue = Object.values(groupedByDate).map(day => day.revenue);
    const customers = Object.values(groupedByDate).map(day => day.customers.size);

    console.log("Chart data processed:", { categories, sales, revenue, customers });
    return { categories, sales, revenue, customers };
  }, [filteredData]);

  const { categories, sales, revenue, customers } = processDataForChart();

  const chartOptions = {
    chart: {
      height: 350,
      type: "area",
      toolbar: { show: false },
    },
    markers: { size: 3 },
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
    stroke: { curve: "smooth", width: 3 },
    xaxis: {
      type: "datetime",
      categories: categories.length > 0 ? categories : [new Date().getTime()],
      labels: {
        formatter: function(value, timestamp) {
          return new Date(timestamp).toLocaleDateString();
        }
      }
    },
    tooltip: {
      x: { 
        formatter: function(value) {
          return new Date(value).toLocaleDateString();
        }
      },
      y: {
        formatter: function(value, { seriesIndex }) {
          if (seriesIndex === 1) { // Revenue
            return value.toLocaleString('vi-VN') + 'đ';
          }
          return value;
        }
      }
    },
    title: {
      text: `Sales Report (${timeFilter})`,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }
  };

  const series = [
    { 
      name: "Sales (Quantity)", 
      data: sales.length > 0 ? sales : [0] 
    },
    { 
      name: "Revenue (VND)", 
      data: revenue.length > 0 ? revenue : [0] 
    },
    { 
      name: "Customers", 
      data: customers.length > 0 ? customers : [0] 
    },
  ];

  // Calculate summary statistics based on filtered data
  const getTotalSales = useCallback(() => {
    return filteredData.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [filteredData]);

  const getTotalRevenue = useCallback(() => {
    return filteredData.reduce((total, item) => {
      const itemRevenue = item.total_price || item.price * (item.quantity || 1);
      return total + itemRevenue;
    }, 0).toLocaleString('vi-VN');
  }, [filteredData]);

  const getUniqueCustomers = useCallback(() => {
    const uniqueCustomers = new Set(filteredData.map(item => item.userId).filter(Boolean));
    return uniqueCustomers.size;
  }, [filteredData]);

  const handleFilterChange = (key) => {
    console.log("Changing filter to:", key);
    setTimeFilter(key);
  };

  if (loading) {
    return (
      <div className="col-12 my-4">
        <Container>
          <div className="text-center p-5">
            <Spinner animation="border" role="status" className="mb-3" />
            <p>Đang tải dữ liệu bán hàng...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-12 my-4">
        <Container>
          <Alert variant="danger">
            <Alert.Heading>Lỗi khi tải dữ liệu</Alert.Heading>
            <p>{error}</p>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="col-12 my-4">
      <Container>
        <h3 className="mb-4">Tổng Quan Bán Hàng</h3>

        <Row>
          <Col md={12} className="mb-3">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Báo Cáo <span className="text-muted">{timeFilter}</span></h5>
                  <Dropdown onSelect={handleFilterChange}>
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-time-filter">
                      {timeFilter} <MoreVertical size={16} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item eventKey="Today">Today</Dropdown.Item>
                      <Dropdown.Item eventKey="This Month">This Month</Dropdown.Item>
                      <Dropdown.Item eventKey="This Year">This Year</Dropdown.Item>
                      <Dropdown.Item eventKey="All Time">All Time</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm mb-3 border-0">
              <Card.Body className="text-center">
                <h6 className="text-muted mb-1">Tổng Đơn Hàng</h6>
                <h2 className="mb-0 fw-bold">{getTotalSales()}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm mb-3 border-0">
              <Card.Body className="text-center">
                <h6 className="text-muted mb-1">Tổng Doanh Thu</h6>
                <h2 className="mb-0 fw-bold">{getTotalRevenue()}đ</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm mb-3 border-0">
              <Card.Body className="text-center">
                <h6 className="text-muted mb-1">Số Khách Hàng</h6>
                <h2 className="mb-0 fw-bold">{getUniqueCustomers()}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="p-4 shadow-sm border-0">
          <Card.Body>
            {filteredData.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">Không có dữ liệu bán hàng cho khoảng thời gian đã chọn</p>
              </div>
            ) : (
              <Chart options={chartOptions} series={series} type="area" height={350} />
            )}
          </Card.Body>
        </Card>

        {soldData.length > 0 && (
          <div className="mt-3 text-end">
            <small className="text-muted">Tổng cộng {soldData.length} giao dịch</small>
          </div>
        )}
      </Container>
    </div>
  );
};

export default DashBoard;
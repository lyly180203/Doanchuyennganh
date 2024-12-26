import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import URL from '../URL';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const orderUrl = URL + 'cart/cart.php';
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalkh, setTotalkh] = useState(0);
    const fetchOrders = () => {
        fetch(orderUrl)
            .then(response => response.json())
            .then(data => {
                setOrders(data.orders);
                setTotalOrders(data.total_orders);
                setTotalkh(data.total_kh);
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu từ API:', error);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Tổng đơn đặt</Card.Title>
                            <Card.Text className='fa-solid fa-shopping-cart'> {totalOrders}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Lượng khách hàng</Card.Title>
                            <Card.Text>{totalkh}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Customers</Card.Title>
                            <Card.Text>11.7K</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>People Online</Card.Title>
                            <Card.Text>0</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>World Map</Card.Title>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Sales Analytics</Card.Title>
                            {/* Add your chart component here */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Recent Activity</Card.Title>
                            <Card.Text>No recent activities.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Đơn đặt gần đây</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Loại đơn</th>
                                        <th>Tên khách hàng</th>
                                   
                                     
                                        <th>Phone</th>
                                        <th>Số lượng</th>
                                        <th>Tổng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.slice(0, 5).map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.id_thanhtoan}</td>
                                            <td>{order.name}</td>
                                       
                                        
                                            <td>{order.phone}</td>
                                            <td>{order.soluong}</td>
                                            <td>{order.gia_thanhtoan.toLocaleString()}VNĐ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Link to="../dondat">
                                <Button variant="primary">Xem thêm</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;

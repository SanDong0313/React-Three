import React, { useEffect, useState } from 'react';
import { Col, Row, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "rc-pagination";
import { FaTrash, FaSearch } from 'react-icons/fa'

import { getUserList, deleteUser } from '../../../redux/actions/userActions';

import "rc-pagination/assets/index.css";
import { Styles } from './styles';

const UserManage = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);

    useEffect(() => {
        dispatch(getUserList());
    }, [dispatch]);

    useEffect(() => {
        if(Object.keys(users).length > 0) {
            const filtered = users.filter(u => searchKey !== '' ? u.name.indexOf(searchKey) > -1 : u)
                .slice(10 * (currentPage - 1), 10 * currentPage);
            setFilteredUser(filtered)
        }
    }, [users, currentPage, searchKey])

    const updatePage = p => {
        setCurrentPage(p);
    };

    const handleDelete = (id) => {
        if(window.confirm("Do you realy delete this user?")) {
            dispatch(deleteUser(id));
        }
    }

    return (
        <Styles>
            <div className="container">
                <div className="users-box">
                    <Row>
                        <Col xs={12} md={8}><h3>User Manage</h3></Col>
                        <Col xs={12} md={4}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    onChange={(e) => setSearchKey(e.target.value)}
                                    placeholder="Search user name"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    <FaSearch />
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(filteredUser).length > 0 ? filteredUser.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td><FaTrash onClick={(e) => handleDelete(user._id, e)} className="color-red cursor-pointer" /></td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">No Users</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            Total Rows: {filteredUser.length}
                        </Col>
                        <Col className="text-right">
                            <Pagination
                                pageSize={10}
                                onChange={updatePage}
                                current={currentPage}
                                total={filteredUser.length}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Styles>
    )
}

export default UserManage;
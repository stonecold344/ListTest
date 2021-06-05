import React from 'react'
import "../App.css";
import Form from "./Form";
import List from "./List";

const ListHome = () => {
    return (
        <div className="d-md-flex h-md-100 align-items-center">
            <Form />
            <List />
        </div>
    );
};

export default ListHome;
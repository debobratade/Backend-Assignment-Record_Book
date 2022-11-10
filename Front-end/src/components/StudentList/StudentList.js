import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
 let nav = useNavigate
  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    let result = await fetch("http://localhost:5000/getStudent",{

    headers:{
      authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
    }

  })
    result = await result.json();
    setProducts(result);
  };
     console.warn("products", products)

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/deleteStudent/${id}`, {
      method: "Delete",
      headers:{
        authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();

    if (result) {
      alert("Record deleted");
      getproducts();
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;

    if (key) {
      let result = await fetch(`http://localhost:5000/studentSearch/${key}`,{

        headers:{
          authorization: ` ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();

      if (result) {
        setProducts(result);
      }
    } else {
      getproducts();
    }
  };

  return (
    <div className="product-list">
      <input
        className="searchbox"
        type="text"
        placeholder="Search student by name"
        onChange={searchHandle}
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Subject</li>
        <li>Marks</li>
        <li>Edit</li>
      </ul>
      {
      products.length>0 ? products.map((item, index) => (
       
        <ul key={item._id}>
          <li>{index+1}</li>
          <li>{item.name}</li>
          <li>{item.subject}</li>
          <li>{item.marks}</li>
          <li>
            <button className="cart-btn" onClick={() => deleteProduct(item._id)}>Delete</button>
            <button className="cart-btn" >
              <Link to={`/update/${item._id}`}>update</Link>
            </button>
          </li>
        </ul>
      ))
      : <h1>No result found</h1>
      }
    </div>
  );
};

export default ProductList;

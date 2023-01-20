import React, { Component } from 'react';
import './style.css';

export default class App extends Component {
  constructor() {
    super();

    this.formRef = React.createRef();
    this.state = {
      formData: [],
      products: [
        { prodname: 'M&M', prodcat: 'Snacks', prodprice: '$1.99' },
        { prodname: 'Table', prodcat: 'Furniture', prodprice: '$199' },
        { prodname: 'kale', prodcat: 'Vegetables', prodprice: '$2.49' },
      ],
    };
  }

  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    let formData = {};
    for(let i = 0; i < this.formRef.current.elements.length; i++) {
      formData[this.formRef.current.elements[i]] = this.formRef.current.elements[i].value;
    }
    
    console.log("form",formData)

    this.setState((prevState) => ({
      ...prevState,
      formData,
      products: [
        ...prevState.products, formData
      ]
    })
    );

    // this.formData.current.value = ''
  };

  handleDelete= (targetIdx) => {
    // console.log(i)
    this.setState((prevState) => ({
      ...prevState,
      products: this.state.products.filter((_,i) => i !== targetIdx)
    }))
  };

  render() {
    return (
      <>
        <div>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Category</th>
                <th>Product Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((prod, i) => (
                // console.log(prod,i)
                <tr key={i}>
                  <td>{prod.prodname}</td>
                  <td>{prod.prodcat}</td>
                  <td>{prod.prodprice}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        this.handleDelete(i);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <div>
          <form ref={this.formRef} onSubmit={this.handleSubmit}>
            <label>Product Name: </label>
            <input
              type="text"
              
              placeholder="prodname"
            ></input>
            <label>Product Category: </label>
            <input type="text"  placeholder="prodcat"></input>
            <label>Product Price: </label>
            <input
              type="float"
              
              placeholder="prodprice"
            ></input>
            <button>Add New</button>
          </form>
        </div>
      </>
    );
  }
}

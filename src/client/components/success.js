import React, { Component } from 'react';

class List extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    }
  }

  // Fetch the customers on first mount
  componentDidMount() {
    this.getCustomers();
  }

  // Retrieves the customers from the Express app
  getCustomers() {
    fetch('http://localhost:5020/success')
      .then(res => res.json())
      .then(customers => {
        this.setState({ customers })
        console.log(customers)
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }

  render() {
    const { customers } = this.state;

    return (
      <div className="App">
        <h1>List of Items</h1>
        {/* Check to see if any customer are found*/}
        {customers.length ? (
          <div>
            {/* Render the customers */}
            {customers.map((item) => {
              return (
                <div>
                  {item.id}
                </div>
              );
            })}
          </div>
        ) : (
            <div>
              <h2>No List Items Found</h2>
            </div>
          )
        }
      </div>
    );
  }
}

export { List };
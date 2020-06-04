import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from "react-csv"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
        id: 0,
        first: 'aaaa',
        last: 'moosvi',
        email: 'jimi@gmail',
        phone: '12345',
        location: 'islamabad',
        hobby: 'coding'
      },
      {
        id: 11,
        first: 'bbbb',
        last: 'moosvi',
        email: 'jimi@gmail',
        phone: '12345',
        location: 'islamabad',
        hobby: 'coding'
      }
    ]
    }

    
    this.setItem  = this.setItem.bind(this)
    this.addItemToState  = this.addItemToState.bind(this)
    console.log("items : ",this.state.items)
    this.getItems = this.getItems.bind(this)

  }
  

  setItem() {
    // this.setState(state => {
    //   state.items.push({
    //     id: 2,
    //     first: 'ccccc',
    //     last: 'moosvi',
    //     email: 'jimi@gmail',
    //     phone: '12345',
    //     location: 'islamabad',
    //     hobby: 'coding'
    //   })
    // }
    // )

    this.addItemToState({
          id: 22,
          first: 'ccccc',
          last: 'moosvi',
          email: 'jimi@gmail',
          phone: '12345',
          location: 'islamabad',
          hobby: 'coding'
        })
  }

  // getItems(){
  //   fetch('http://localhost:3001/get')
  //     .then(response => response.json())
  //     .then(items => this.setState({items}))
  //     .catch(err => console.log(err))
  // }

  getItems(){    
    let self  = this;

    fetch('http://localhost:3001/crud')
    .then(function(response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    }).then(function(items) {
      // `items` is the parsed version of the JSON returned from the above endpoint.
      console.log(items.map(item => {return item }));  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
      // this.setState(items)
      items.map(item => {
        return self.addItemToState(item)
      })
      
    })
    // .then(items => this.setState(state => {
    //     state.items.push(items)
    //   }))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      //...this.state.items.slice(itemIndex + 1)     jimi
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
   this.setItem()
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>CRUD Database</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
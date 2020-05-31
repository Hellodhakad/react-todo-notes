import React, { Component } from 'react';
import './App.css';
import * as _ from 'lodash'

class App extends Component {

  state = {
    jsonData: {},
    count: 0,
    active: 0,
    inputFocus: 0
  }

  componentDidMount() {
    let jsonData = localStorage.getItem('cards')
    if (jsonData) {
      jsonData = JSON.parse(jsonData)
    } else {
      jsonData = {}
    }

    this.setState({
      jsonData: jsonData
    })
  }

  onChange = (type, key, value) => {

    let jsonData = _.cloneDeep(this.state.jsonData)
    if (type == 'text') {
      jsonData[key].text = value

    } else if (type == 'title') {
      jsonData[key].title = value

    }

    localStorage.setItem('cards', JSON.stringify(jsonData))

    this.setState({
      jsonData: jsonData
    })
  }

  close = (e, key) => {
    let jsonData = _.cloneDeep(this.state.jsonData)
    delete jsonData[key]

    localStorage.setItem('cards', JSON.stringify(jsonData))
    this.setState({
      jsonData: jsonData
    })
  }

  onFocusFunc = (key) => {
    this.setState({
      active: key,
      inputFocus: ''
    })
  }

  onFocusFuncInput = (key) => {
    this.setState({
      inputFocus: key
    })
  }

  createCard = (card, key) => {

    return <div key={key} className='col-md-4 col-md-offset-1'>
      <div className={this.state.active && this.state.active == key ? 'note card active' : 'note card'}>
        <span onClick={(e) => this.close(e, key)} class="pull-right clickable close-icon" data-effect="fadeOut"><i class="fa fa-times"></i></span>

        <input
          className={this.state.inputFocus && this.state.inputFocus == key ? 'card-title cardTitle inputFocus' : 'card-title cardTitle'}
          value={card.title}
          placeholder='Title'
          onFocus={() => this.onFocusFuncInput(key)}
          onChange={(e) => this.onChange('title', key, e.target.value)} />

        <textarea
          rows="5000"
          className='mainTextArea'
          id="content"
          value={card.text}
          placeholder='Notes'
          onFocus={() => this.onFocusFunc(key)}
          onChange={(e) => this.onChange('text', key, e.target.value)} />
      </div>
    </div>
  }

  renderCards = () => {
    const jsonData = this.state.jsonData
    let cardsJsx = []
    for (let key in jsonData) {
      let card = this.createCard(jsonData[key], key)
      cardsJsx.push(card)
    }

    return cardsJsx
  }

  addNewCard = (e) => {
    console.log(e)
    let jsonData = _.cloneDeep(this.state.jsonData)
    jsonData[this.state.count] = {}

    this.setState({
      jsonData: jsonData,
      count: this.state.count + 1
    })
  }

  render() {
    return (<>
      <div className='row rowClass'>
        <button className='btn btn-info buttonClass' onClick={(e) => this.addNewCard(e)}>Add New</button>
      </div>
      <div className='row rowClass'>
        {this.renderCards()}
      </div>
    </>
    )
  }
}

export default App;

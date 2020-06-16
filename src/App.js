import React from 'react';
import Api from './api';

class App extends React.Component {
  constructor(props){
  super(props);
  this.state = { value: null };
  }
  handleSelect = (event) => {
   this.setState({ value:  event.target.value },()=>{
      console.log(  this.state.value );
    });
    
    
  }
  render(){
  return (
    <div className="App">
    <h1>Display Stock data</h1>
    <select onChange = {this.handleSelect}>
      <option value="" disabled defaultValue>Choose option</option>
      <option value="IBM" >IBM</option>
      <option value="HCC" >HCC</option>
      <option value="HAL" >HAL</option>
      <option value="GSS">GSS</option>
      <option value="UPL">UPL</option>
    </select>
    <Api selected = {this.state.value}/>
   
    </div>
  );
}
}

export default App;

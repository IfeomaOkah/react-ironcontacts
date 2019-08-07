import React, { Component } from 'react';
import contacts from './contacts.json';
import './App.css';
const originalFive = contacts.splice(0, 5);

class Table extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      celebrities: originalFive,
    }
  
  this.searchCeleb = this.searchCeleb.bind(this)
}

renderTableData() {
  return this.state.celebrities.map((celebrity, index) => { 
     return (
        <tr key={index}>
           <td>
              <img src={celebrity.pictureUrl} alt={celebrity.pictureUrl}/>
            </td>
           <td>{celebrity.name}</td>
           <td>{celebrity.popularity}</td>
        </tr>

     )
  })
}

searchCeleb = (event) => {
  let searchTerm = event.target.value.toLowerCase();
   // if search bar has input render results 
   if(!(searchTerm === ""|| searchTerm === undefined)){
    let searchCelebrities = this.state.celebrities.filter(
      (celebrity) => celebrity.name.toLowerCase().indexOf(searchTerm) >= 0
    );
    this.setState({
      celebrities : searchCelebrities
    })
   }
   // else render original 5  
  else{
      this.setState({
        celebrities : originalFive
      })
  }
  
}


getRandomActor () {
  const randomNumber = Math.floor(Math.random() * contacts.length)
  const randomActor = contacts[randomNumber];
 
  const clonedArray = this.state.celebrities;
  clonedArray[clonedArray.length++] = randomActor;

  this.setState({
    celebrities : clonedArray
  });
}



sortByname () {
  const clonedArray = [...this.state.celebrities];
  clonedArray.sort((contact1, contact2) => {
    if (contact1.name > contact2.name) {
      return 1;
  }
  if (contact1.name < contact2.name) {
      return -1;
  }
  return 0;
  })
  this.setState({
    celebrities : clonedArray
  })
}




sortByPop() {
  const clonedArray = [...this.state.celebrities];
  clonedArray.sort((num1, num2) => {
    if (num1.popularity > num2.popularity) {
      return 1;
  }
  if (num1.popularity < num2.popularity) {
      return -1;
  }
  return 0;
  })
  this.setState({
    celebrities : clonedArray
  })
}


render() {
  return (
     <div>
        <h1 id='title'>IronContacts</h1>
        <input type="text" onChange={this.searchCeleb} placeholder="Search Celebrities"/>
        <button onClick={() => this.getRandomActor()}>Add Random Contact</button>
      <button onClick={() => this.sortByname()}>Sort By Name</button>
      <button onClick={() => this.sortByPop()}>Sort by Popularity</button>
      
        <table id='celebrities'>
           <tbody>
              {this.renderTableData()}
           </tbody>
        </table> 
     </div>
  )
}
}

export default Table;

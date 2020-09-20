import React, { useState, Fragment } from "react";

import "bootstrap/dist/css/bootstrap.css";

const App = () => {

  const minSize = 2;

  const [inputFields, setInputFields] = useState([
    { option: '' },
    { option: '' }
  ]);
  
  const [pickButton, setPickButton] = useState(true)
  const [randomItemPicked, setRandomItemPicked] = useState(null)

  const handleSubmit = e => {
    e.preventDefault();
    setPickButton(false)
    var randomItem = Math.floor(Math.random()*inputFields.length)
    setRandomItemPicked(randomItem)
    //var randomItem = inputFields[Math.floor(Math.random()*inputFields.length)] 
    var option = document.getElementById('option_'+randomItem);
    option.classList.add("border");
    option.classList.add("border-primary");
    option.classList.add("p-3");
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
      values[index].option = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ option: ''});
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    if(index>=minSize){
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const handleTryAgain = () => {
    var option = document.getElementById('option_'+randomItemPicked);
    option.classList.remove("border");
    option.classList.remove("border-primary");
    option.classList.remove("p-3");
    setPickButton(true);
  }

  const rowLength = inputFields.length;

  return (
    <>
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="#">
        <button className="btn btn-light text-info" disabled>PFM</button>
        <span> Pick For Me</span>
      </a>
      <a className="navbar-brand" href="https://silvandante.github.io/meuportfolio/">
        By Anny Walker
      </a>
    </nav>
    <div className="container p-5">
      <div className="jumbotron t-0 p-3" >
        <h1>Pick For Me (Escolha por Mim)</h1>
        <p>Write 2 or more options for me to pick 1 option for you.</p>
        <p>(Escreva 2 ou mais opções para mim que eu vou escolher 1 opção para você.)</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div id={`option_${index}`} className="form-group col-sm-10">
                <label htmlFor="option">Option {index+1}</label>
                <input
                  type="text"
                  onChange={event => handleInputChange(index, event)}
                  className="form-control"
                  id="option"
                  name="option"
                  value={inputField.option}
                />
              </div>
              {(pickButton)&&(rowLength===index+1)&&
              <div className="form-group col-sm-2">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleAddFields()}
                  >
                    +
                  </button>
              </div>
            }
            </Fragment>
          ))}
        </div>
        <div className="submit-button">
          {pickButton&&
          <button
            className="btn btn-primary mr-2"
            onClick={handleSubmit}
          >
            Pick For Me
          </button>
          }
          {!pickButton&&
          <button
            className="btn btn-primary mr-2"
            onClick={handleTryAgain}
          >
            Try Again
          </button>}
          
        </div>
      </form>
    </div>
    </>
  )
}

export default App;
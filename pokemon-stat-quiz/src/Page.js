import React, { Component, useState } from 'react';
import { FormGroup, Label, Input, InputGroup, Col, Button, CardBody, Card,Row, Container } from 'reactstrap';
import PokemonItem from './PokemonItem';
class Page extends Component{
    constructor(props)
    {
        super(props);
        this.state = {current_pokemon: []};
    }
    updatePokemon=(apiResponse)=>{
        this.setState({current_pokemon:apiResponse});
    }
    getPokemon=()=>{
        fetch('http://localhost:5000/pokemon')
        .then(
          (response) => 
          {
            if (response.status === 200)
            {
              this.setState({current_pokemon:[]});
              return (response.json());
            }
            else
            {
                console.log("HTTP error:" + response.status + ":" +  response.statusText);
                return ([ ["status ", response.status]]);
            }
          }
        )
        .then ((jsonOutput) => //jsonOutput now has result of the data extraction
                {
                    this.updatePokemon(jsonOutput);
                }
              )
        .catch((error) => 
            {console.log(error);
                this.updatePokemon("");
            } )

    
    };
    componentDidMount(){
        this.getPokemon();
    };
    render(){
        return(
           <div>
            <PokemonItem pokemon={this.state.current_pokemon} getNewPokemon={this.getPokemon}></PokemonItem>
           </div>
           
        );
    };
}

export default Page
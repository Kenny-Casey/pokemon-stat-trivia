import React, { Component, useState } from 'react';
import { FormGroup, Label, Input, InputGroup, Col, Button, CardBody, Card,Row, Container } from 'reactstrap';

class PokemonItem extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            showAnswer:false,
            isCorrect: false
        };


    }
    getNewPokemon=()=>{
        this.props.getNewPokemon();
    }
    processContent = () =>{
        if((this.props.pokemon != null) && (this.props.pokemon.length > 0)){
            return(
                this.props.pokemon.map(item =>
                    <div className="pokemon" id={item[0]}>
                        <p key={item[0]}>Name: {item[0]}</p>
                        <p key={item[0]}>HP: {item[1]}</p>
                        <p key={item[0]}>ATK: {item[2]}</p>
                        <p key={item[0]} > DEF: {item[3]}</p>
                        <p key={item[0]} > SP.ATK: {item[4]}</p>
                        <p key={item[0]} > SP.DEF: {item[5]}</p>
                        <p key={item[0]} > SPE: {item[6]}</p>
                        <Button onClick={()=>this.getNewPokemon()}>Next</Button>
                    </div>
                )
            );
        }
        else{
            return (<div id={this.props.pokemon}>Loading Pokemon</div>)
        }
    }

    render(){
        return(
            <div>{this.processContent()}</div>
        );
    }
}

export default PokemonItem
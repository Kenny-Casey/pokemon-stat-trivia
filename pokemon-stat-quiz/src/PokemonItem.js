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
                <div className="pokemon" id={this.props.pokemon[0]}>
                    <p key={this.props.pokemon[0]}>Name: {this.props.pokemon[0]}</p>
                    <p key={this.props.pokemon[0]}>HP: {this.props.pokemon[1]}</p>
                    <p key={this.props.pokemon[0]}>ATK: {this.props.pokemon[2]}</p>
                    <p key={this.props.pokemon[0]} > DEF: {this.props.pokemon[3]}</p>
                    <p key={this.props.pokemon[0]} > SP.ATK: {this.props.pokemon[4]}</p>
                    <p key={this.props.pokemon[0]} > SP.DEF: {this.props.pokemon[5]}</p>
                    <p key={this.props.pokemon[0]} > SPE: {this.props.pokemon[6]}</p>
                    <Button onClick={()=>this.getNewPokemon()}>Next</Button>
                </div>
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
import React, { Component, useState } from 'react';
import { FormGroup, Label, Input, InputGroup, Col, Button, CardBody, Card,Row, Container, Form } from 'reactstrap';

class PokemonItem extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            guess:""
        };


    }
    handleSubmit=(event)=>{
        event.preventDefault();
        this.checkGuess();
    }
    getNewPokemon=()=>{
        this.props.getNewPokemon();
    }

    checkGuess=()=>{
        this.props.checkGuess(this.state.guess)
        this.setState({guess:""})
    }
    updateGuess = (input) =>
    {
        this.setState({guess: input.target.value});
    }
    processContent = () =>{
        if((this.props.pokemon != null) && (this.props.pokemon.length > 0)){
            return(
                <Card className="pokemon" id={this.props.pokemon[0]}>
                    <CardBody>
                        <p>HP: {this.props.pokemon[1]}</p>
                        <p>ATK: {this.props.pokemon[2]}</p>
                        <p>DEF: {this.props.pokemon[3]}</p>
                        <p>SP.ATK: {this.props.pokemon[4]}</p>
                        <p>SP.DEF: {this.props.pokemon[5]}</p>
                        <p>SPE: {this.props.pokemon[6]}</p>
                    </CardBody>
                </Card>
            );
        }
        else{
            return (<div id={this.props.pokemon}>Loading Pokemon</div>)
        }
    }

    render(){
        return(
            <Row>
                {this.processContent()}
                <Form onSubmit={this.handleSubmit}>
                    <Input onChange={this.updateGuess} value={this.state.guess} />
                    <Button type="submit" disabled={this.props.isDisabled}>Submit</Button>
                </Form>
                <Button onClick={()=>this.getNewPokemon()}>Next</Button>
            </Row>
        );
    }
}

export default PokemonItem
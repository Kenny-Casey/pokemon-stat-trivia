import React, { Component, useState } from 'react';
import { FormGroup, Label, Input, InputGroup, Col, Button, CardBody, Card,Row, Container } from 'reactstrap';
import PokemonItem from './PokemonItem';
class Page extends Component{
    constructor(props)
    {
        super(props);
        this.state = {current_pokemon: [],
            showAnswer:false,
            isCorrect: "hidden",
            score: 0,
            isDisabled: false,
            guesses:5,
            guess_text: "Incorrect!",
            answer:"hidden",
            bst_visible: "visible"

        };
    }

    updatePokemon=(apiResponse)=>{
        this.setState({current_pokemon:apiResponse});
        this.setState({isCorrect:"hidden"})
        this.setState({answer:"hidden"})
        this.setState({guesses:5})
    }
    
    handleRadioButton=(value)=>{
        this.setState({bst_visible:value})
    }
    checkGuess=(guess)=>{
        const answer=this.state.current_pokemon[0].toLowerCase()
        if(answer===guess.toLowerCase()){
            var new_score=this.state.score+1
            this.setState({score:new_score})
            this.setState({isCorrect:"visible"})
            this.setState({answer:"visible"})
            this.setState({isDisabled:true})
            this.setState({guess_text:"Correct!"})
        }
        else{
            this.setState({guess_text:"Incorrect!"})
            this.setState({isCorrect:"visible"})
            var guesses_left=this.state.guesses-1
            this.setState({guesses:guesses_left})
            if(guesses_left===0){
                this.setState({isDisabled:true})
                this.setState({answer:"visible"})
            }
        }
        
    }
    getPokemon=()=>{
        fetch('http://localhost:5000/pokemon')
        .then(
          (response) => 
          {
            if (response.status === 200)
            {
              this.setState({current_pokemon:[]});
              this.setState({isDisabled:false})
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
           <Container>
            <div class="control-pannel">
                <Row>Control Pannel</Row>
                <div>Show BST</div>
                <Input type="radio" id="bstOn" value="visible" checked={this.state.bst_visible === "visible"} onChange={()=>this.handleRadioButton("visible")}></Input>
                <Label for="bstOn">Yes</Label>
                <Input type="radio" id="bstOff" value="hidden" checked={this.state.bst_visible === "hidden"} onChange={()=>this.handleRadioButton("hidden")}></Input>
                <Label for="bstOff">No</Label>
            </div>
            <Row> Current Score: {this.state.score}</Row>
            <PokemonItem pokemon={this.state.current_pokemon} getNewPokemon={this.getPokemon} checkGuess={this.checkGuess} isDisabled={this.state.isDisabled} bstVisbile={this.state.bst_visible}></PokemonItem>
            <Row>Guesses Left: {this.state.guesses}</Row>
            <Row style={{visibility:this.state.isCorrect}}>{this.state.guess_text}</Row>
            <Row style={{visibility:this.state.answer}}>The answer was {this.state.current_pokemon[0]}</Row>
           </Container>
           
        );
    };
}

export default Page
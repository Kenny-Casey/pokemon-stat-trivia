import React, { Component, useState } from 'react';
import { FormGroup, Label, Input, InputGroup, Col, Button, CardBody, Card,Row, Container } from 'reactstrap';
import PokemonItem from './PokemonItem';
class Page extends Component{
    constructor(props)
    {
        super(props);
        this.state = {current_pokemon: [],
            showAnswer:false,
            score: 0,
            isDisabled: false,
            guesses:5,
            guess_text: "Incorrect!",
            answer_visibility:"hidden",
            bst_visible: "visible",
            fully_evoled:"Both",
            answer: "",
            previous_guess:""

        };
    }

    updatePokemon=(apiResponse)=>{
        this.setState({current_pokemon:apiResponse});
        this.setState({answer_visibility:"hidden"})
        this.setState({guesses:5})
        this.setState({answer:""})
        this.setState({previous_guess:""})
        this.setState({guess_text:""})
    }
    
    handleVisibleRadioButton=(value)=>{
        this.setState({bst_visible:value})
    }

    handleEvolutionRadioButton=(value)=>{
        this.setState({fully_evoled:value})
        this.setState({answer:this.state.current_pokemon[0]})
        this.setState({isDisabled:true})
        this.setState({answer_visibility:"visible"})
        this.setState({guess_text:""})
        
    }
    checkGuess=(guess)=>{
        const answer=this.state.current_pokemon[0].toLowerCase()
        const guess_reformatted=guess.toLowerCase().trim().split(" ").join("-")
        if(answer===guess.toLowerCase().trim()){
            var new_score=this.state.score+1
            this.setState({score:new_score})
            this.setState({answer:this.state.current_pokemon[0]})
            this.setState({answer_visibility:"visible"})
            this.setState({isDisabled:true})
            this.setState({previous_guess:""})
            this.setState({guess_text:"Correct!"})
        }
        else if(answer===guess_reformatted){
            var new_score=this.state.score+1
            this.setState({score:new_score})
            this.setState({answer:this.state.current_pokemon[0]})
            this.setState({answer_visibility:"visible"})
            this.setState({isDisabled:true})
            this.setState({previous_guess:""})
            this.setState({guess_text:"Correct!"})
        }
        else{
            this.setState({guess_text:"Incorrect!"})
            var guesses_left=this.state.guesses-1
            this.setState({guesses:guesses_left})
            const prev_guess="Previous Guess: "+guess
            this.setState({previous_guess:prev_guess})
            if(guesses_left===0){
                this.setState({answer:this.state.current_pokemon[0]})
                this.setState({isDisabled:true})
                this.setState({answer_visibility:"visible"})
            }
        }
        
    }
    getPokemon=()=>{
        const url='http://localhost:5000/pokemon/'+this.state.fully_evoled
        fetch(url)
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
                <div>Show BST
                    <Input type="radio" id="bstOn" value="visible" checked={this.state.bst_visible === "visible"} onChange={()=>this.handleVisibleRadioButton("visible")}></Input>
                    <Label for="bstOn">Yes</Label>
                    <Input type="radio" id="bstOff" value="hidden" checked={this.state.bst_visible === "hidden"} onChange={()=>this.handleVisibleRadioButton("hidden")}></Input>
                    <Label for="bstOff">No</Label>
                </div>
                <div>Evolution Stage:
                    <Input type="radio" id="fullyEvolvedYes" value="Yes" checked={this.state.fully_evoled === "Yes"} onChange={()=>this.handleEvolutionRadioButton("Yes")}></Input>
                    <Label for="fullyEvolvedYes">Fully Evolved</Label>
                    <Input type="radio" id="fullyEvolvedNo" value="No" checked={this.state.fully_evoled === "No"} onChange={()=>this.handleEvolutionRadioButton("No")}></Input>
                    <Label for="fullyEvolvedNo">Not Fully Evolved</Label>
                    <Input type="radio" id="fullyEvolvedBoth" value="Both" checked={this.state.fully_evoled === "Both"} onChange={()=>this.handleEvolutionRadioButton("Both")}></Input>
                    <Label for="fullyEvolvedBoth">Both</Label>
                </div>
            </div>
            <Row> Current Score: {this.state.score}</Row>
            <PokemonItem pokemon={this.state.current_pokemon} getNewPokemon={this.getPokemon} checkGuess={this.checkGuess} isDisabled={this.state.isDisabled} bstVisbile={this.state.bst_visible}></PokemonItem>
            <Row>{this.state.previous_guess}</Row>
            <Row>Guesses Left: {this.state.guesses}</Row>
            <Row>{this.state.guess_text}</Row>
            <Row style={{visibility:this.state.answer_visibility}}>The answer was: {this.state.answer}</Row>
           </Container>
           
        );
    };
}

export default Page
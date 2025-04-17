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

    getSize=(stat)=>{
        return stat+"px"
    }

    getHpColor=(stat,type)=>{
        var total_stat=Math.floor((2*stat+31))+100+10
        var first_color=0
        if(stat!==1){
            var first_color=Math.ceil(total_stat/4)
        }
        if(type==="background"){
            return "hsl("+first_color+",85%,45%)"
        }
        if(type==="border"){
            return "hsl("+first_color+",85%,35%)"
        }
    }
    
    getOtherStatColor=(stat,type)=>{
        var total_stat=Math.floor((2*stat+31))+5
        var first_color=Math.ceil(total_stat/4)
        if(type==="background"){
            return "hsl("+first_color+",85%,45%)"
        }
        if(type==="border"){
            return "hsl("+first_color+",85%,35%)"
        }
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
                <Card className="pokemon">
                    <CardBody>
                        {/* <p>Name: {this.props.pokemon[0]} </p>  */}
                        <Container>
                            <Row className='stats'>
                                <Col className='col'>
                                    <Row>HP:</Row>
                                    <br></br>
                                    <Row>ATK:</Row>
                                    <br></br>
                                    <Row>DEF:</Row>
                                    <br></br>
                                    <Row>SP.ATK:</Row>
                                    <br></br>
                                    <Row>SP.DEF:</Row>
                                    <br></br>
                                    <Row>SPE:</Row>
                                </Col>
                                <Col className='col'>
                                    <Row>{this.props.pokemon[1]}</Row>
                                    <br></br>
                                    <Row>{this.props.pokemon[2]}</Row>
                                    <br></br>
                                    <Row>{this.props.pokemon[3]}</Row>
                                    <br></br>
                                    <Row>{this.props.pokemon[4]}</Row>
                                    <br></br>
                                    <Row>{this.props.pokemon[5]}</Row>
                                    <br></br>
                                    <Row>{this.props.pokemon[6]}</Row>
                                </Col>
                                <Col className='col'>
                                    <Row className="stat-row" style={{width:this.getSize(this.props.pokemon[1]),backgroundColor:this.getHpColor(this.props.pokemon[1],"background"),borderColor:this.getHpColor(this.props.pokemon[1],"border")}}></Row>
                                    <br></br>
                                    <Row className="stat-row" style={{width:this.getSize(this.props.pokemon[2]),backgroundColor:this.getOtherStatColor(this.props.pokemon[2],"background"),borderColor:this.getOtherStatColor(this.props.pokemon[2],"border")}}></Row>
                                    <br></br>
                                    <Row className="stat-row" style={{width:this.getSize(this.props.pokemon[3]),backgroundColor:this.getOtherStatColor(this.props.pokemon[3],"background"),borderColor:this.getOtherStatColor(this.props.pokemon[3],"border")}}></Row>
                                    <br></br>
                                    <Row className="stat-row" style={{width:this.getSize(this.props.pokemon[4]),backgroundColor:this.getOtherStatColor(this.props.pokemon[4],"background"),borderColor:this.getOtherStatColor(this.props.pokemon[4],"border")}}></Row>
                                    <br></br>
                                    <Row className="stat-row" style={{width:this.getSize(this.props.pokemon[5]),backgroundColor:this.getOtherStatColor(this.props.pokemon[5],"background"),borderColor:this.getOtherStatColor(this.props.pokemon[5],"border")}}></Row>
                                    <br></br>
                                    <Row className="stat-row" style={{width:this.getSize(this.props.pokemon[6]),backgroundColor:this.getOtherStatColor(this.props.pokemon[6],"background"),borderColor:this.getOtherStatColor(this.props.pokemon[6],"border")}}></Row>
                                </Col>
                            </Row> 
                        </Container>
                        <p style={{visibility:this.props.bstVisbile}}>BST: {this.props.pokemon[7]}</p>
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
import React, { Component } from 'react'
import { Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            seconds: 0, 
            running: false, 
            blind: 10, 
            baseBlind: 10, 
            inProgress: false //Stays true while paused --> Used to disable slider
        }
    }

    tick() {
        if (this.state.seconds%10 === 0 && this.state.seconds !== 0){ //SET BLIND TIME
            this.setState(prevState => ({
                blind: prevState.blind + this.state.baseBlind
            }))
        }
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }))
    }

    start() {
        if (!this.state.running) {
            this.interval = setInterval(() => this.tick(), 1000)
            this.setState({running: true})
            this.setState({inProgress: true})
        }
        else {
            clearInterval(this.interval)
            this.setState({running: false})
        }
    }

    reset() {
        this.setState({seconds: 0})
        clearInterval(this.interval)
        this.setState({running: false})
        this.setState({inProgress: false})
        this.setState({blind: this.state.baseBlind})
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">pokertime</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ListGroup>
                            <ListGroupItem>
                                <div>
                                    <Button 
                                        bsStyle="primary" 
                                        onClick={this.start.bind(this)}>
                                        {this.state.seconds}
                                    </Button>
                                    <Button 
                                        bsStyle="danger" 
                                        style={{marginLeft: 5 }} 
                                        onClick={this.reset.bind(this)}>
                                        <i className="fas fa-circle-notch"></i>
                                    </Button>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p style={{display: 'flex', justifyContent: 'center'}}>
                                    {this.state.blind}
                                </p>
                            </ListGroupItem>
                            <ListGroupItem>
                                <p style={{display: 'flex', justifyContent: 'center'}}>
                                    {this.state.blind * 2}
                                </p>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                    <Slider step={10} min={10} max={100} disabled={this.state.inProgress}
                        onAfterChange={
                            value => this.setState({baseBlind: value, blind: value})
                        } 
                    />
                </Panel.Body>
            </Panel>
        )
    }
}
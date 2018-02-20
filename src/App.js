import React, { Component } from 'react'
import { Button, Panel } from 'react-bootstrap'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = { seconds: 0, running: false }
	}

	tick() {
		this.setState(prevState => ({
			seconds: prevState.seconds + 1
		}))
	}

	start() {
		if (!this.state.running) {
			this.interval = setInterval(() => this.tick(), 1000)
			this.setState({running: true})
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
						<Button bsStyle="primary" onClick={this.start.bind(this)}>{this.state.seconds}</Button>
						<Button 
							bsStyle="danger" 
							style={{marginLeft: 5 }} 
							onClick={this.reset.bind(this)}>
							<i class="fas fa-circle-notch"></i>
						</Button>
					</div>
				</Panel.Body>
			</Panel>
		)
	}
}
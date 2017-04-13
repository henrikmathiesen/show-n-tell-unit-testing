import React, { Component } from 'react';

class HelloWorld extends Component {
    constructor(props) {
        super(props);

        this.state = {
            greeting: 'Hello'
        };

        this.french = this.french.bind(this);
    }

    french(){
        this.setState({ greeting: 'Bonjour' });
    }

    render(){
        return(
        <div>
            <h3>{this.state.greeting} World!</h3>
            <div>
                <button className="js-french" onClick={this.french}>Frenchify!</button>
            </div>
        </div>
        );
    }
}

export default HelloWorld;

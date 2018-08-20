import React, { Component } from 'react';
import './css';
import './css/style.css';
class App extends Component {
    render() {
        return (
            <div className="App">
                <p>Finally got this Damn thing working!!!</p>
                <header>
                    <h1>Header Content</h1>
                    <img src="http://erikdkennedy.com/r-r-r-random/divider-triangle.png" className="divider" />
                </header>

                <section>
                    <h1>Section Content</h1>
                </section>
            </div>
        );
    }
}

export default App;
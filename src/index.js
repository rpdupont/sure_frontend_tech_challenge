import React from 'react';
import ReactDOM from 'react-dom';
import { post } from 'axios';

import './scss/app.scss';

import RatingInformation from './components/RatingInformation';
import QuoteOverview from './components/QuoteOverview';

const apiBase = 'https://fed-challenge-api.sure.now.sh/api/v1/quotes';

class App extends React.Component {
    state = {
        quote: undefined,
    };

    constructor (props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    
    async onFormSubmit (details) {
        const { data } = await post(apiBase, details);
        this.setState(data);
    }

    render () {
        let headline = <h2>User Details</h2>;
        let headline2 = null;
        let currentComponent = null;
        
        if(this.state.quote) {
            currentComponent = <QuoteOverview quote={this.state.quote} api={apiBase} />;
            headline = <h2>Quote Overview</h2>;
            headline2 = <h2>Policy Holder</h2>;
        }

        return (
            <div>
                {headline}
                {currentComponent}
                {headline2}
                <RatingInformation submit={this.onFormSubmit} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
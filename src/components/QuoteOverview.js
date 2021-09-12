import React from 'react';
import { put } from 'axios';

class QuoteOverview extends React.Component {

    state = {
        quote: this.props.quote,
        deductible: this.props.quote.variable_options.deductible.values[0],
        asteroid_collision: this.props.quote.variable_options.asteroid_collision.values[0],
    }

    constructor (props) {
        super(props);

        this.loading = false;

        this.onSelectUpdate = this.onSelectUpdate.bind(this);
        this.onQuoteUpdateClick = this.onQuoteUpdateClick.bind(this);
    }

    onSelectUpdate (e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({[name]: Number(value)});

    }

    async onQuoteUpdateClick (e) {
        e.preventDefault();

        this.loading = true;

        const {quoteId, rating_address, policy_holder } = this.props.quote;
        const {deductible, asteroid_collision } = this.state;
        const details = {
            quote: {
                quoteId,
                rating_address,
                policy_holder,
                variable_selections: {
                    deductible,
                    asteroid_collision,
                }
            }
        }
        const { data } = await put(`${this.props.api}/${quoteId}`, details);

        this.setState({quote: data.quote}, () =>{
            this.loading = false;
        });

    }

    formatMoney (value) {
        const valueSplit = String(value).split('.');
        const dollars = valueSplit[0].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        let cents = '00';
        if(valueSplit[1]){
            cents = (valueSplit[1].length < 2) ? `${valueSplit[1]}0` :valueSplit[1];
        }
        return `$${dollars}.${cents}`;
    }

    render () {

        return (
            <div className="quote-overview"> 
                <div className="deducible quote-info">
                    <div className="description">
                        <h3>{this.state?.quote?.variable_options?.deductible?.title}</h3>
                        <p>{this.state?.quote?.variable_options?.deductible?.description}</p>
                    </div>
                    <div className="value">
                        <div className="select-wrapper">
                            <select name="deductible" value={this.state.deductible} onChange={this.onSelectUpdate}>{
                                this.state?.quote?.variable_options?.deductible?.values.map( (value, index) => 
                                <option key={index} value={value}>{this.formatMoney(value)}</option> )
                            }</select>
                        </div>
                    </div>
                </div>

                <div className="asteroid-collision quote-info">
                    <div className="description">
                        <h3>{this.state?.quote?.variable_options?.asteroid_collision?.title}</h3>
                        <p>{this.state?.quote?.variable_options?.asteroid_collision?.description}</p>
                    </div>
                    <div className="value">
                        <div className="select-wrapper">
                            <select name="asteroid_collision" value={this.state.asteroid_collision} onChange={this.onSelectUpdate}>{
                                this.state?.quote?.variable_options?.asteroid_collision?.values.map( (value, index) => 
                                <option key={index} value={value}>{this.formatMoney(value)}</option> )
                            }</select>
                        </div>
                    </div>
                    
                </div>

                <hr/>

                <div className="premium quote-info">
                    <div className="description">
                        <h3>Premium:</h3>
                    </div>
                    <div className="value">
                        <h3>{this.formatMoney(this.state.quote.premium)}</h3>
                    </div>
                </div>
                <div className="premium quote-info">
                    <div className="description"></div>
                    <div className="value">
                        <button disabled={this.loading} onClick={this.onQuoteUpdateClick}>Update Quote</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default QuoteOverview
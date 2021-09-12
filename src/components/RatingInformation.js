import React from 'react';

class RatingInformation extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        address: {
            line_1: '',
            line_2: '',
            city: '',
            region: '',
            postal: '',
        },
    };

    onUserChange (e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if(value !== '' && this.errorsArray.indexOf(name) > -1){
            this.errorsArray.splice(this.errorsArray.indexOf(name), 1);
        }

        this.setState({[name]: value});
        this.forceUpdate();
    }

    onAddressChange (e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if(value !== '' && this.errorsArray.indexOf(name) > -1){
            this.errorsArray.splice(this.errorsArray.indexOf(name), 1);
        }

        this.setState({address: {...this.state.address, [name]: value}});

        this.forceUpdate();
    }

    validateForm (){
        let valid = true;
        const inputs = this.form.current.querySelectorAll('input[required]');

        this.errorsArray = [];

        for(let input of inputs){
            if(input.value === ''){
                valid = false;
                this.errorsArray.push(input.name);
            }
        }

        console.log(this.errorsArray);
        this.forceUpdate();

        return valid;
    }

    isError (name) {
        return this.errorsArray.includes(name);
    }

    onFormSubmit (e) {
        e.preventDefault();

        this.loading = true;

        if(!this.validateForm()){
            this.loading = false;
            return;
        }
        
        this.formSubmitted = true;
        this.props.submit(this.state);
    }

    constructor (props){
        super(props);

        this.formSubmitted = false;
        this.loading = false;
        this.errorsArray = [];

        this.form = React.createRef();

        this.onUserChange = this.onUserChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.isError = this.isError.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    render () {
        return (
            <form 
                noValidate
                ref={this.form}
                className={`${this.formSubmitted ? 'disable' : ''}`}
                onSubmit={this.onFormSubmit}>
                <p className={`error ${(this.errorsArray.length > 0) ? '' : 'hidden'}`}>Houston we have a problem!</p>
                <div className="user">
                    <div className={`field ${this.isError('first_name') ? 'error' : ''}`}>
                        <label htmlFor="first_name">First Name</label>
                        <input 
                            name="first_name"
                            type="text"
                            required
                            value={this.state.first_name}
                            onChange={this.onUserChange}
                        />
                    </div>

                    <div className={`field ${this.isError('last_name') ? 'error' : ''}`}>
                        <label htmlFor="last_name">Last Name</label>
                        <input 
                            name="last_name"
                            type="text"
                            required
                            value={this.state.last_name}
                            onChange={this.onUserChange}
                        />
                    </div>
                </div>

                <div className="address">
                    <div className={`field ${this.isError('line_1') ? 'error' : ''}`}>
                        <label htmlFor="line_1">Address Line 1</label>
                        <input 
                            name="line_1"
                            type="text"
                            required
                            value={this.state.address.line_1}
                            onChange={this.onAddressChange}
                        />
                    </div>

                    <div className={`field ${(this.formSubmitted && this.state.address.line_2 === '') ? 'hidden' : ''}`}>
                        <label htmlFor="line_2">Address Line 2 <span>(optional)</span></label>
                        <input 
                            name="line_2"
                            type="text"
                            value={this.state.address.line_2}
                            onChange={this.onAddressChange}
                        />
                    </div>

                    <div className={`field ${this.isError('city') ? 'error' : ''}`}>
                        <label htmlFor="city">City</label>
                        <input 
                            name="city"
                            type="text"
                            required
                            value={this.state.address.city}
                            onChange={this.onAddressChange}
                        />
                    </div>

                    <div className={`field ${this.isError('region') ? 'error' : ''}`}>
                        <label htmlFor="region">Region</label>
                        <input 
                            name="region"
                            type="text"
                            required
                            value={this.state.address.region}
                            onChange={this.onAddressChange}
                        />
                    </div>
                    
                    <div className={`field ${this.isError('postal') ? 'error' : ''}`}>
                        <label htmlFor="postal">Postal Code</label>
                        <input 
                            name="postal"
                            type="text"
                            required
                            value={this.state.address.postal}
                            onChange={this.onAddressChange}
                        />
                    </div>
                </div>

                <button disabled={this.loading}>Get Quote!</button>
            </form>
        )
    }

}

export default RatingInformation
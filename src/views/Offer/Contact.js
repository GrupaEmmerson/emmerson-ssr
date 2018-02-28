import React, {Component} from "react";
import { connect } from 'react-redux';
import { reduxForm, Field, change as changeFieldValue} from 'redux-form';
import * as actions from '../../actions';
import {API_DIR, API_PORT, DIR_URL} from "../../config/parameters";

let testWeakMap = new WeakMap();

class Contact extends Component {

    constructor (props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            message: 'Jestem zainteresowany ofertą nr ... opublikowaną na stronie www.emmerson.pl. Proszę o kontakt.',
            tel: null,
            email: null,
            name: null,
            adviserId: null
        };

    }

    get state () {
        return testWeakMap.get(this);
    }

    set state (value) {
        testWeakMap.set(this, value);
    }

    componentDidMount() {
        const apiUrl = API_DIR + API_PORT + `/offer/`;

        const url = [apiUrl + this.props.match.params.id].join("");

        fetch(url)
            .then(res => res.json())
            .then(response => {
                this.setState({offer: response});
                this.setState({message: 'Jestem zainteresowany ofertą nr '+this.state.offer.number+' opublikowaną na stronie www.emmerson.pl. Proszę o kontakt. '})
            });
    }

    handleFormSubmit(event) {
        console.log(event);
        this.props.sentMessage({
            tel: this.state.tel,
            email: this.state.email,
            name: this.state.name,
            message: this.state.message,
            adviserId: this.state.adviserId
        });

        this.props.dispatch(changeFieldValue("sentMessage", "tel", null));
        this.props.dispatch(changeFieldValue("sentMessage", "email", null));
        this.props.dispatch(changeFieldValue("sentMessage", "name", null));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {
            adviser,
            handleSubmit
        } = this.props;
        if(!this.state.adviserId){
            this.setState({
                adviserId: adviser.id
            })
        }
        const TextArea = ({input:{ checked, onChange, name, value}, className, placeholder, id, label, type, children}) => (

            <textarea name={name} id={id} type='textarea' className="form-control" rows="9" cols="25" required="required"
               placeholder="" value={value ? value :  this.state.message } onChange={onChange}/>
        );
        console.log(this.props.responseMessage);
        return (
            <div className="container-fluid nopadding" >
                <div className="row nopadding">
                    <div className="col-12 nopadding">
                        <form>
                            <legend><span className="fa fa-envelope"></span> Kontakt:</legend>
                            <div className='row'>
                                <div className='col-5 col-sm-5 col-md-5 col-lg-5'>
                                    <img src={adviser.photo} style={{width: 100+'px'}} alt={adviser.name}/>
                                </div>
                                <div className='col-7 col-sm-7 col-md-7 col-lg-7'>
                                    <address>
                                        <strong>{adviser.name}</strong><br/>
                                        <strong>+48 {adviser.cell_phone}</strong><br/>
                                        {adviser.phone ? adviser.phone : ''}<br/><br/>
                                        {adviser.branch.address}<br/>
                                        {adviser.branch.postal} {adviser.branch.town}<br/>
                                    </address>
                                </div>
                                <div className='col-12'>
                                    <strong>{ adviser.job_title.toString() }</strong><br/>
                                    <a style={{color:'#fff'}} href={adviser.email}>{adviser.email}</a>
                                    <br/><br/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="well well-sm col-12 nopadding">
                        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Imię i nazwisko *</label>
                                        <Field component='input' name="name" type="text" className="form-control" id="name" value={this.state.name}
                                               placeholder="Wpisz Imię i Nazwisko" required="required" onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            E-mail *</label>
                                        <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <span className="fa fa-envelope"></span>
                                                    </span>
                                            <Field component='input' name="email" type="email" className="form-control" id="email" value={this.state.email}
                                                   placeholder="Wpisz E-mail" required="required" onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tel">
                                            Telefon *</label>
                                        <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <span className="fa fa-phone"></span>
                                                    </span>
                                            <Field component='input' name="tel" type="tel" className="form-control" id="tel" placeholder="Wpisz Telefon"
                                                   value={this.state.tel} required="required" onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="message">
                                            Wiadomość *</label>
                                        <Field component={TextArea} name="message" id="message" className="form-control" rows="9" cols="25" required="required"
                                                  placeholder="" value={this.state.message} onChange={this.handleInputChange}/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button type='submit' className="btn btn-outline-light col-12 " id="btnContactUs" >
                                        Wyślij wiadomość
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        location: state.location.location,
        viewport: state.viewport.viewport,
        offers: state.offers.offers,
        isLoaded: state.isLoaded.isLoaded,
        searchProperties: state.searchProperties.searchProperties,
        search: state.search.search,
        rowsCount: state.rowsCount.rowsCount,
        responseMessage: state.responseMessage.responseMessage
    }
}

Contact = connect(
    mapStateToProps,
    actions
)(Contact);

export default Contact = reduxForm({
    form: 'sentMessage',
    fields:
        [
            'name',
            'tel',
            'email',
            'message',
            'adviserId'
        ]
})(Contact);

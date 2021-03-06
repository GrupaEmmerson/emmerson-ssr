import React, {Component} from "react";
import Lightbox from 'react-image-lightbox';
import Contact from './Contact';

let testWeakMap = new WeakMap();

class InfoOfferView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offer: null,
            photoIndex: 0,
            isOpen: false,
        };

    }

    get state() {
        return testWeakMap.get(this);
    }

    set state(value) {
        testWeakMap.set(this, value);
    }

    renderField(value){
        return(
            <div key={value.name} className='row col-12 nopadding ' style={{color: '#000', fontSize: 12+'px'}}>
                <div className="col-5 nopadding">{value.name}:</div>
                <div className="row align-items-end col-7 nopadding">
                        <div className='col-12 nopadding text-right'>{value.value+' '+value.format}</div>
                </div>
            </div>
        );
    }

    renderFields(array){

        return(
            this.renderField(array)
        );
    }

    render() {
        const { offer } = this.props;

        return(
          <div className='col-12' style={{marginBottom: 50+'px'}}>
              {offer.feature.map((attribute, index) => {
                  /**
                   * Aby działały rzuty nazwa pola musi być taka sama jak pole atrybutu.
                   */
                  if(attribute.name === "Rzuty")
                  {
                    if(attribute.value.length === 0)
                        return(
                            <div key={index+'main'}>
                                <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                                    <div key={attribute.name} style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-9'>{attribute.name}:</div>
                                </div>
                                <div style={{marginTop: 10+'px'}}>
                                    Zapytaj o rzut doradcę
                                </div>
                            </div>
                        );
                    else{
                      return(
                          <div key={index+'main'} style={{marginBottom: 50+'px'}}>
                              <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                                  <div key={attribute.name} style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-9'>{attribute.name}:</div>
                              </div>
                              {
                                  attribute.value.map( (array, index) => {
                                      return(
                                          <div key={index+'sub'}>
                                              <img src={array.value[0].link} style={{width: 100+'%',
                                                  cursor: 'pointer'}} onClick={()=>this.setState({ isOpen: true, photoIndex: 0 })} alt={array.value[0].description}/>
                                              {this.state.isOpen && (
                                                  <Lightbox
                                                      mainSrc={array.value[this.state.photoIndex].link}
                                                      nextSrc={array.value[(this.state.photoIndex + 1) % array.value.length].link}
                                                      prevSrc={array.value[(this.state.photoIndex + array.value.length - 1) % array.value.length].link}
                                                      onCloseRequest={() => this.setState({ isOpen: false })}
                                                      onMovePrevRequest={() =>
                                                          this.setState({
                                                              photoIndex: (this.state.photoIndex + array.value.length - 1) % array.value.length,
                                                          })
                                                      }
                                                      onMoveNextRequest={() =>
                                                          this.setState({
                                                              photoIndex: (this.state.photoIndex + 1) % array.value.length,
                                                          })
                                                      }
                                                  />
                                              )}
                                          </div>
                                      )
                                  })
                              }
                          </div>
                      )
                    }
                  }
                  return(
                      <div key={index}>
                          <div style={{borderBottom: '1px solid #e3001b', color: '#fff', margin: 0, padding: 0, fontSize: 14+'px', marginTop: 40+'px'}}>
                              <div key={attribute.name} style={{backgroundColor: '#e3001b', padding: 4+'px'}} className='col-9'>{attribute.name}:</div>
                          </div>
                          {
                              attribute.value.map(array => {
                                  return(
                                      <div className='nopadding'>
                                          {
                                              this.renderFields(array)
                                          }
                                      </div>
                                  )
                              })
                          }
                      </div>
                  )}
              )}
          </div>
        );
    }
}

export default InfoOfferView;
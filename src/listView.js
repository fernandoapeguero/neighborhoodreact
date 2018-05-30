import React, {Component} from 'react'


class ListView extends Component {


callProp = (value) => {
    this.props.updateMarkersList(value);

}

render(){

       return(

        <dl id="listview">
        { this.props.someMark.map((element , index) => {
            return <dt tabIndex="0" key={index} onClick={() =>this.callProp(element.title)} > {element.title} </dt>
        }) }

          </dl>

       )
}

}

export default ListView
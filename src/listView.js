import React, {Component} from 'react'


class ListView extends Component {


callProp = (value) => {
    this.props.updateMarkersList(value);
}

render(){

       return(

        <ul id="listview">
        { this.props.someMark.map((element , index) => {
            return <li tabIndex="0" key={index} onKeyPress={() =>this.callProp(element.title)} onClick={() =>this.callProp(element.title)} > {element.title} </li>
        }) }

          </ul>
           )
}

}

export default ListView
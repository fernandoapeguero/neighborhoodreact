import React, {Component} from 'react'


class ListView extends Component {


callProp = (value) => {
    console.log(value);
    this.props.updateMarkersList(value);

}

render(){

       return(

        <ul  id="listview" style={{marginTop: "20px"}}>

        { this.props.someMark.map((element , index) => {
            return <li key={index} onClick={() =>this.callProp(element.title)} > {element.title} </li>
        }) }

          </ul>

       )
}

}

export default ListView
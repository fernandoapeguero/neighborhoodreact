import React, {Component} from 'react'


class ListView extends Component {

render(){

       return(

        <ul id="listview" style={{marginTop: "20px"}}>

        { this.props.someMark.map((element , index) => {
            return <li key={index}>{element.title} </li>
        }) }

          </ul>

       )
}

}

export default ListView
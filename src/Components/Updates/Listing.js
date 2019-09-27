import React from 'react'
import axios from '../../Config/axios'

class Listing extends React.Component{
    constructor(){
        super()
        this.state = {
            transportData:[]
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/transport_plans/${id}`,{
            headers: {
                'Authorization':localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            const transportData = response.data.data
            this.setState(() => ({transportData}))
        })
        .catch((err) => {
            alert(err)
        })
    }
    render(){
        return(
            <div>
                <h1>{this.props.match.params.id}</h1>
            </div>
        )
    }
}

export default Listing
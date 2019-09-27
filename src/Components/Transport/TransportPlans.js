import React from 'react'
import axios from '../../Config/axios'
import {NavLink} from 'react-router-dom'

class TransportPlans extends React.Component{
    constructor(){
        super()
        this.state = {
            TransportPlans: ''
        }
    }
    componentDidMount(){
        axios.get('/transport_plans/trip_acceptance',{
            headers: {
                'Authorization':localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            const TransportPlans = response.data
            this.setState(() => ({TransportPlans}))
        }) 
        .catch((err) => {
            alert(err)
        })
    }
    render(){
        return(
            <div>
                <ul>
                    {this.state.TransportPlans && 
                        this.state.TransportPlans.data.map((trans) => {
                            return <div key={trans.id}>
                                <li>
                                    <NavLink to={`/list/${trans.id}`}><h4>{trans.attributes.vehicle}</h4></NavLink>
                                    <h4>{trans.attributes.source}</h4>
                                    <h6>{trans.attributes.destination}</h6>
                                    <NavLink to={`/book/${trans.id}`}>Book Trip</NavLink>
                                </li>
                            </div>
                        })
                    }
                </ul>
                
                <NavLink to="/">Back</NavLink>
            </div>
        )
    }
}

export default TransportPlans
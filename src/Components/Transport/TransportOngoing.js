import React from 'react'
import axios from '../../Config/axios'
import {NavLink} from 'react-router-dom'

class OngoingTrip extends React.Component{
    constructor(){
        super()
        this.state = {
            OngoingData: []
        }
    }
    componentDidMount(){
        axios.get('/transport_plans/trip_ongoing',{
            headers:{
                'Authorization': localStorage.getItem('Authorization')
            }
        })
        .then((response) => {
            const OngoingData = response.data.data
            this.setState(() => ({OngoingData}))
        }) 
        .catch((err) => {
            alert(err)
        })
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <ol>
                {this.state.OngoingData &&
                    this.state.OngoingData.map((data) => {
                        return <div key={data.id}>
                            <li>
                                <input type="text" value={data.attributes.atd}disabled/>
                                <NavLink to={`/list/${data.id}`}><small>{data.attributes.booking_code}</small></NavLink>
                                <h2>{data.attributes.customer_name}</h2>
                                <h3>{data.attributes.destination}</h3>
                                <h5>{data.attributes.source}</h5>
                                <img src={`https://www.mapquestapi.com/staticmap/v5/map?key=()&locations=${data.attributes.src_lat},${data.attributes.src_lng}|marker-red||${data.attributes.dst_lat},${data.attributes.dst_lng}|marker-green`}/>
                            </li>
                        </div>
                    })}
                </ol>
                
            </div>
        )
    }
}

export default OngoingTrip
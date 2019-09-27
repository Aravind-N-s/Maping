import React from 'react'
import axios from '../../Config/axios'

class UpdateTrip extends React.Component{
    constructor(){
        super()
        this.state = {
            transportData: [],
            initialOdometer : '',
            status: ''
        }
        this.handleAccept = this.handleAccept.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleAccept() {
        const confirmWindow = window.confirm("Are You Sure to Book")
        if(confirmWindow){
            this.setState(() => ({status: 'Started'}) )
        }
    }

    handleClick() {
        const confirmWindow = window.confirm("Are You Sure to Reset the trip")
        if(confirmWindow){
            this.setState(() => ({initialOdometer: 0}) )
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const id = this.props.match.params.id
        const formData = {
            data: {
                attributes:{
                    trip_status: this.state.status,
                    initial_odometer_reading: this.state.initialOdometer
                }
            }
        }
        axios.put(`/transport_plans/${id}`,formData,{
            headers: {
                'Authorization':localStorage.getItem('Authorization')
            },
        })
        .then((response) => {
            console.log(response.data)
            this.props.history.push('/ongoing')
        })
        .catch((err) => {
            alert(err)
        })
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
            this.setState(() => ({
                transportData,
                status:transportData.attributes.trip_confirm,
                initialOdometer: transportData.attributes.initial_odometer_reading
            }))
        })
        .catch((err) => {
            alert(err)
        })
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <h2>Trip Status - {this.state.status}</h2>
                <button onClick={this.handleAccept}>Accept Trip</button><br/>
                <input type="text" value={this.state.initialOdometer} disabled={true}/><br/>
                <button onClick={this.handleClick} disabled={this.state.initialOdometer == 0}>Reset</button><br/>
                <button onClick={this.handleSubmit} disabled={this.state.initialOdometer == 0 && this.state.status == 'Not Accepted'}>Submit</button>
            </div>
        )
    }

}

export default UpdateTrip
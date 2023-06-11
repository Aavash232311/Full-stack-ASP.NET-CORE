import React, {Component} from "react";
import "../style/register.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {OutlinedInput} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import {Services} from "../utils/services";
import Alert from '@mui/material/Alert';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            confrom_password: null,
            address: null,
            city: null,
            phone: null,
            email: null,
            error: null,
            renderErr: false,
        };
        this.updateState = this.updateState.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.utils = new Services();
    }

    updateState(ev) {
        this.setState({[ev.target.name]: ev.target.value})
    }

    submitForm() {
        fetch(this.utils.getServer() + "/auth/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        }).then(rsp => rsp.json()).then((res) => {
            if (res.statusCode !== 200) {
                let error = res.value;
                if (error === undefined ) {
                    error = res.errors;
                }
                this.setState({error: error}, () => {this.setState({renderErr: true})});
            }
            if (res.statusCode === 200) {
                this.setState({renderErr: false});
            }
            console.log(res);
        })
    }

    render() {
        const ErrorList = (errorArr) => {
            return (
                <div>{errorArr.err.map((i, j) => (<li className="errorList" key={j}>{i}</li>))}</div>
            )
        }
        return (
            <div>
                <center>
                    <div id="frame">
                        <br/>
                        <center>
                            <h5>Few steps to let you in</h5>
                        </center>
                        <br/>
                        <TextField onInput={(ev) => {
                            this.updateState(ev)
                        }} name="username" className="input" id="standard-basic" label="username" variant="standard"/>
                        <br/>
                        <br/>
                        <TextField onInput={(ev) => {
                            this.updateState(ev)
                        }} name="password" className="input" id="standard-basic" label="password" variant="standard"/>
                        <br/>
                        <br/>
                        <TextField onInput={(ev) => {
                            this.updateState(ev)
                        }} name="confrom_password" className="input" id="standard-basic" label="conform password"
                                   variant="standard"/>
                        <br/> <br/>
                        <TextField onInput={(ev) => {
                            this.updateState(ev)
                        }} name="email" className="input" id="standard-basic" label="email" variant="standard"/> <br/>
                        <br/>
                        <TextField onInput={(ev) => {
                            this.updateState(ev)
                        }} name="address" className="input" id="standard-basic" label="address" variant="standard"/>
                        <br/>
                        <br/>
                        <TextField onInput={(ev) => {
                            this.updateState(ev)
                        }} name="city" className="input" id="standard-basic" label="city" variant="standard"/> <br/>
                        <br/>
                        <OutlinedInput onInput={(ev) => {
                            this.updateState(ev)
                        }}
                                       id="outlined-adornment-amount"
                                       className="input"
                                       startAdornment={<InputAdornment position="start">977</InputAdornment>}
                                       label="Phone number"
                                       variant="standard"
                                       type="number"
                                       name="phone"
                        /> <br/> <br/>
                        <Button onClick={this.submitForm} className="input" variant="outlined">Register</Button>
                    </div>
                    <br />
                    {this.state.renderErr &&   <Alert id="alert" severity="warning"><ErrorList err={this.state.error} /></Alert> }
                </center>
            </div>
        )
    }
}
import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import "../../style/register_restaurant.css";
import MenuItem from "@mui/material/MenuItem";
import {FaPhotoVideo} from "react-icons/fa";

export class RegisterSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherSelected: false,
      profile: null,
      cover: null
    };
    this.ResSelectionEvent = this.ResSelectionEvent.bind(this);
  }

  ResSelectionEvent(ev) {
    if (ev.target.value === "other") {
      this.setState({ otherSelected: true });
    } else {
      this.setState({ otherSelected: false });
    }
  }

  PreviewImage(ev, src) {
    const element = ev.target;
    const fakeURL = URL.createObjectURL(element.files[0]);
    this.setState({[src]: fakeURL});
  }

  render() {
    const rest = [
      {
        value: "Fast Food",
      },
      {
        value: "Casual",
      },
      {
        value: "Fast Casual",
      },
      {
        value: "Contemporary Casual",
      },
      {
        value: "Fine Dining",
      },
      {
        value: "Cafes and Coffee Shops",
      },
      {
        value: "Specialty Drinks",
      },
      {
        value: "Buffet",
      },
      {
        value: "Food Trucks",
      },
      {
        value: "Concession Stands",
      },
      {
        value: "Pop-Ups",
      },
      {
        value: "Ghost Restaurants",
      },
      {
        value: "other",
      },
    ];
    return (
      <div>
        <h6>Register your restaurant</h6> <br />
        <div>
          <form action="">
            <TextField className="input" label="Name" variant="outlined" />{" "}
            <br /> <br />
            <TextField
              id="outlined-select-currency"
              select
              label="your restaurant type"
              defaultValue="Casual"
              helperText="Types of Restaurant"
              className="input"
              onChange={(ev) => {
                this.ResSelectionEvent(ev);
              }}
            >
              {rest.map((option, j) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            {this.state.otherSelected === true && (
              <div>
                <br />
                <TextField
                  className="input"
                  name="otherResType"
                  label="Other"
                  variant="outlined"
                />
              </div>
            )}{" "}
            <br /> <br />
            <TextField
              id="outlined-number"
              label="Phone Number 977"
              type="number"
              className="input"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br /> <br />
            <label id="profileInputUi">
            {this.state.profile !== null && <div style={{width: "100%", height: "100%"}}>  <img src={this.state.profile} height="100%" width="100%" /> </div>}
            {this.state.profile === null &&  <FaPhotoVideo id="mid-icons" />}
            <input onInput={(ev) => {this.PreviewImage(ev, "profile")}} type="file" accept="image/*" style={{display: "none"}}  />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

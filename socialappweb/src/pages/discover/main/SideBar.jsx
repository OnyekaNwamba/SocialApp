import React from "react";

import { Authenticator } from "../../../commons/authenticator";

export class SideBar extends React.Component {
  constructor(props) {
    super(props);

    let isAuthenticated = Authenticator.authenticate();

    this.state = {
      user: isAuthenticated ? JSON.parse(localStorage.getItem('user')) : this.props.history.push(`login`)
    };
  }

  async componentDidMount() {
    // console.log("STATE")
    // console.log(this.state)
    // const response = await this.props.api.getAllFriendRequests(this.state.user.id);
    // let friendRequests = [];
    //
    // if(response.isError) {
    //   console.log(response)
    // } else {
    //   friendRequests = response.success;
    //   console.log("RE")
    //   console.log(friendRequests)
    // }
  }

  render() {
    return <div></div>
  }
}
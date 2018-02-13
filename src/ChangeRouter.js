import React from "react";
import {withRouter} from "react-router-dom";

class ChangeRouter extends React.Component {

    goToSearch() {
        this.props.history.push("/search");
    }
}
export default withRouter(ChangeRouter);
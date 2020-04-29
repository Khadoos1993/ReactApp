import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Auth from "../../auth/Auth";

function Callback(props) {
  useEffect(() => {
    if (/access_token|id_token|error/.test(props.location.hash))
      props.auth.handleAuthentication();
    else throw new Error("Invalid callback url.");
  }, []);

  return <h1>...Loading</h1>;
}

Callback.propTypes = {
  location: PropTypes.object.isRequired,
  auth: PropTypes.objectOf(Auth).isRequired,
};

export default Callback;

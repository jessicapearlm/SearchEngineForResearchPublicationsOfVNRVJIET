import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import React from 'react';
import { useState, useEffect } from 'react';
import {

  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBCardText
}
from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    //  const [ profile, setProfile ] = useState(null);
    const [ login, setLogin] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token")||"")
    const clientId = '1006405223734-89bsslid5t5ivhaspa7qpgp12v17d7f8.apps.googleusercontent.com';
    console.log(token)
    if(token!==""){
        navigate("/home");
    }
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        console.log("res",res)
        if(res.profileObj.email.split('@')[1]==="vnrvjiet.in" && ('a'<=res.profileObj.email[0]<='z' || res.profileObj.email==="20071a05f0@vnrvjiet.in")){
            console.log("TRUE")
            // setProfile(res.profileObj);
            navigate("/home");
            setToken(res.accessToken)
            localStorage.setItem("token",res.accessToken)
        }
        else{
            setLogin("FAILED")
            // console.log("HEREEE")
            // console.log(res.profileObj.email[0].isAlpha)
            logOut();

        }
        // setProfile(res.profileObj);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
            const auth2 = window.gapi.auth2.getAuthInstance()
            let tokens = localStorage.getItem("token")
            if(tokens){
                localStorage.removeItem("token")
            }
            if (auth2 != null) {
              auth2.signOut().then(
                auth2.disconnect().then(this.props.onLogoutSuccess)
              )
            }
          
    };
  return (
    // <div style={{"backgroundColor":"#C8DF52"}}></div>
    <>    
    <div class="col d-flex justify-content-center" style={{height: "100vh",
        width: "100vw",
      "backgroundColor":"#FDFDBD", paddingTop:"90px"}}>

      <MDBCard style={{ maxHeight: '390px', maxWidth: '900px'}}>
        <MDBRow className='g-0'>

          <MDBCol md='8'>
          <MDBCardImage style={{ maxHeight: '380px', margin:5 ,width: '100%' }} src={require('./static/homepage.jpg')} fluid />
          </MDBCol>

          <MDBCol md='4'>
          <MDBCardBody style={{ maxHeight: '380px', margin:5 }}>
          <MDBCardImage src={require('./static/vnrvjiet-logo.jpg')} fluid />
            <MDBCardTitle style={{"fontSize":"px100"}}>Research Publications Search Engine</MDBCardTitle>
            {login==="FAILED"?<MDBCardText style={{"color":"red"}}>Not AUTHORIZED User</MDBCardText>:""}
            <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    //hostedDomain={"vnrvjiet.in"}
                />
          </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </div>

    </>

  );
}

export default Login;

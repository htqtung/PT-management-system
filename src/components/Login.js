import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { firebaseAuth } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import SkyLight from 'react-skylight';
import { Redirect } from 'react-router-dom';
import { grey300 } from 'material-ui/styles/colors';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '', 
            password: '', 
            redirect: false 
        };
    }

    componentDidMount() {
        this.customDialog.show();
    }

    resetPassword = (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        firebaseAuth().sendPasswordResetEmail(email).then(function () {
            toast.success("Password reset email sent.", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }).catch(function (error) {
            toast.error("Error in resetting password. Type your email to email field.", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        });
    }

    onLoginClick = (event) => {
        event.preventDefault();

        const { email, password } = this.state;
        firebaseAuth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // Redirect 
                this.setState({ redirect: true });
            })
            .catch(() => {
                // No account found. Create a new one and send verification email
                firebaseAuth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        var user = firebaseAuth().currentUser;
                        user.sendEmailVerification().then(function () {
                            toast.success("Verification email sent.", {
                                position: toast.POSITION.BOTTOM_CENTER
                            });
                        }).catch(function (error) {
                            toast.error("Error in authentication.", {
                                position: toast.POSITION.BOTTOM_CENTER
                            });
                        });
                    })
                    .catch(() => {
                        toast.error("Could not login. Check your email and password.", {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                    });
            });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/'/>);
        }

        var loginDialog = {
            backgroundColor: '#fff',
            width: '20%',
            height: '300px',
            marginTop: '-300px',
            marginLeft: '-10%',
        };

        var loginDialogTitle = {
            fontSize: 24,
            backgroundColor: grey300,
        }

        return (
            // <div className="col-6 py-5">
            //     <form>
            //         <TextField name="email" hintText="email@domain.com"
            //             onChange={this.handleChange}

            //         />
            //         <br />
            //         <TextField name="password"
            //             hintText="Password Field"

            //             type="password"
            //             onChange={this.handleChange}

            //         />
            //         <br />
            //         <RaisedButton onClick={this.resetPassword} className="float-left" default={true} label="Forgot password?" />
            //         <RaisedButton onClick={this.onLoginClick} className="float-right" primary={true} label="Login" />
            //     </form>
            //     <ToastContainer />
            // </div>
            <div>
                <SkyLight
                    titleStyle={loginDialogTitle}
                    dialogStyles={loginDialog}
                    hideOnOverlayClicked
                    ref={ref => this.customDialog = ref}
                    title="Login to PT Training"
                >
                    <form>
                        <TextField name="email" hintText="email@domain.com"
                            onChange={this.handleChange}

                        />
                        <br />
                        <TextField name="password"
                            hintText="Password"

                            type="password"
                            onChange={this.handleChange}

                        />
                        <br />
                        <div className="col">
                            <RaisedButton onClick={this.resetPassword} className="center" fullWidth={true} default={true} label="Forgot password?" />
                            <RaisedButton onClick={this.onLoginClick} className="center" fullWidth={true} primary={true} label="Login" />
                        </div>
                    </form>
                    <ToastContainer />
                </SkyLight>
            </div>
        );
    }
}

export default Login;
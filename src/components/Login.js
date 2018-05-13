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
        console.log(this.props.isAuthenticated);
        if(this.props.isAuthenticated) {
            this.setState({
                redirect: true
            })
        }
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
            minWidth: 300,
            minHeight: 250,
            height: 250,
            padding: 0,
            borderRadius: 8,
            // marginTop: '-300px',
            // marginLeft: '-10%',

        };

        var loginDialogTitle = {
            fontSize: 24,
            backgroundColor: grey300,
            padding: 16,
            fontStyle: 'Roboto',
        }

        return (
            <div>
                <SkyLight
                    titleStyle={loginDialogTitle}
                    dialogStyles={loginDialog}
                    hideOnOverlayClicked
                    ref={ref => this.customDialog = ref}
                    title="Login to PT Fitness"
                >
                    <form>
                        <TextField 
                            name="email" 
                            hintText="email@domain.com"
                            fullWidth
                            onChange={this.handleChange}
                            style={{paddingLeft: 5, paddingRight: 5}}
                            underlineStyle={{ width: '95%' }}
                        />
                        <br />
                        <TextField 
                            name="password"
                            hintText="Password"
                            type="password"
                            onChange={this.handleChange}
                            fullWidth
                            style={{ paddingLeft: 5, paddingRight: 5 }}
                            underlineStyle={{ width: '95%' }}
                        />
                        <br />
                        <div className="col">
                            <RaisedButton onClick={this.resetPassword} fullWidth={true} default={true} label="Forgot password?" />
                            <RaisedButton onClick={this.onLoginClick} fullWidth={true} primary={true} label="Login" />
                        </div>
                    </form>
                    <ToastContainer />
                </SkyLight>
            </div>
        );
    }
}

export default Login;
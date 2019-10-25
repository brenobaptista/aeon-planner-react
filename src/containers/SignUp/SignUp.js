import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Card, CardText, CardBody, CardTitle } from 'reactstrap';

import classes from './SignUp.module.css';
import FormError from '../../components/FormError/FormError';
import Spinner from '../../components/Spinner/Spinner';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordAgain: '',
    error: false,
    authLoading: false,
  }

  signUpHandler = async (event) => {
    try {
      if (this.state.password === this.state.passwordAgain) {
        event.preventDefault()
        this.setState({ authLoading: true })
        const data = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
        const res = await axios.put('https://trello-api-nodejs.herokuapp.com/signup', data)
        console.log(res)
        this.setState({ authLoading: false })
        this.props.history.push('login');
      }
    } catch {
      this.setState({ 
        error: true,
        authLoading: false
      })
    }
  }

  nameHandler = (event) => this.setState({ name: event.target.value });
  emailHandler = (event) => this.setState({ email: event.target.value });
  passwordHandler = (event) => this.setState({ password: event.target.value });
  passwordAgainHandler = (event) => this.setState({ passwordAgain: event.target.value });

  render() {
    return (
      <div className="centerText">
        <Card className={`shadow ${classes.card80} bg-light`}>
          <CardBody>
            <CardTitle tag="h1">Sign Up</CardTitle>
            <CardText>
              <Form onSubmit={this.signUpHandler}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input type="text" name="name" id="name" placeholder="Type your name" value={this.state.name} onChange={this.nameHandler} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="email" placeholder="Type your email" value={this.state.email} onChange={this.emailHandler} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" id="password" placeholder="Choose your password" value={this.state.password} onChange={this.passwordHandler} />
                </FormGroup>
                <FormGroup>
                  <Label for="passwordAgain">Password Again</Label>
                  <Input type="password" name="passwordAgain" id="passwordAgain" placeholder="Type your password again" value={this.state.passwordAgain} onChange={this.passwordAgainHandler} />
                </FormGroup>
                <Button color="danger" className="margin-teeth" onClick={this.props.history.goBack}>Cancel</Button>
                <Button type="submit" color="success" className="margin-teeth">Sign Up</Button>
              </Form>
            </CardText>
          </CardBody>
        </Card>
        
        {this.state.authLoading ? <Spinner /> : null}
        {this.state.error ? <FormError /> : null}
      </div>
    )
  }
}

export default SignUp
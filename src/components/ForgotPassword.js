import React, { useRef, useState } from 'react'
import { Alert, Card, Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef()

  const history = useHistory()

  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      //   await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                className='mb-2'
                type='email'
                required
                ref={emailRef}
              />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>
              Reset Password
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/login'>Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        New here? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  )
}

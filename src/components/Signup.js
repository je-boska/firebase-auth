import React, { useRef, useState } from 'react'
import { Alert, Card, Button, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { signup } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    // validation checks here
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Failed to create an acccount')
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
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
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className='mb-2'
                type='password'
                required
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                className='mb-2'
                type='password'
                required
                ref={passwordConfirmRef}
              />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? Log In
      </div>
    </>
  )
}

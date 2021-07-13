import React, { useRef, useState } from 'react'
import { Alert, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const emailRef = useRef()

  const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage(
        'Check your inbox for instructions on how to change your password'
      )
    } catch {
      setError('Failed to reset password')
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
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

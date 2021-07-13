import React, { useRef, useState } from 'react'
import { Alert, Card, Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function UpdateProfile() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const history = useHistory()

  const { currentUser, updateEmail, updatePassword } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    setLoading(true)
    const promises = []
    setError('')
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setError('Failed to update user')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                className='mb-2'
                type='email'
                required
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className='mb-2'
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep current password'
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                className='mb-2'
                type='password'
                ref={passwordConfirmRef}
                placeholder='Leave blank to keep current password'
              />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  )
}

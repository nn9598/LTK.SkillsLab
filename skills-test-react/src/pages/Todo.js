import { Container } from '@mui/material';
import * as React from 'react';
import AccountMenu from '../components/AccountMenu';
import BasicForm from '../components/BasicForm';

export default function Todo() {
  return (

    <Container maxWidth="sm">
			<AccountMenu />
      <BasicForm />
    </Container>
  )
}
import React from 'react';
import Container from '@mui/material/Container';
import Header from '../components/Header';  

function PageContainer({children}) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default PageContainer;

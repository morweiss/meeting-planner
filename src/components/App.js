import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import NewMeetingForm from './NewMeetingForm';
import MeetingsTableContainer from './MeetingsTableContainer';
import Header from './Header';

const App = () => {
    return (
    <Container maxWidth="lg">
      <Header />
        <Container maxWidth="lg">
          <Box my={4}>
            <NewMeetingForm />
          </Box>
          <Box my={4}>
            <MeetingsTableContainer />
          </Box>
      </Container>
    </Container>
    );
};

export default App;
import React, {useState} from 'react';
import {
  ChakraProvider,
  theme,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Container,
  Box
} from '@chakra-ui/react';

async function notifyUser(notificationText="Thank you for enabling notifications!"){
  if(!("Notification" in window)){
    alert("Browser does not support notifications");
  }
  else if(Notification.permission==='granted'){
    const notification=new Notification(notificationText);
  } else if(Notification.permission!=='denied'){
    await Notification.requestPermission().then((permission)=>{
      if(permission==='granted'){
        const notification=new Notification(notificationText);
      }
    })
  }
}
function App() {
  const [userResponded, setUserResponded]= useState(false);

  async function enableNotifsAndClsoe(){
  await notifyUser().then(()=>{
    setUserResponded(true);
  });
 
  }

 function disableNotifsAndClsoe(){
  setUserResponded(true);
  }

  return(!(userResponded)&& !(Notification.permission==='granted'))? (
    <ChakraProvider theme={theme}>
     <Container>
      <Alert status='success'>
        <AlertIcon/>
        <Box>
          <AlertTitle>Notifications</AlertTitle>
          <AlertDescription>Would you like to enable notifications?</AlertDescription>
        </Box>
        <Button colorScheme='teal' size='sm' onClick={enableNotifsAndClsoe}>
          Sure!
        </Button>
        <Button colorScheme='gray' size='sm' onClick={disableNotifsAndClsoe}>
          No thanks!
        </Button>
      </Alert>
     </Container>
    </ChakraProvider>
  ): (Notification.permission==='granted')? (
    <ChakraProvider theme={theme}>
    <Button colorScheme='gray' size='sm' onClick={()=>notifyUser("Thanks for using this website")}>
      Click to show a thank you!
    </Button>
    </ChakraProvider>
  ):
  <>
  <h1>You have disablede notifications</h1>
  </>
}

export default App;

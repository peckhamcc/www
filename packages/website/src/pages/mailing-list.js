import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel, Button } from '../components/panels'
import background from '../../assets/routes-bg.jpg'
import styled from 'styled-components'
import { Hero } from '../components/panels'
import { spacing } from '../units'
import {
  Label,
  Input,
  HelpText
} from '../components/forms'

class MailingListPage extends Component {
 render () {
   return (
     <PageWrapper>
       <Hero background={background.src} />
       <Panel>
         <h2>Mailing list</h2>
         <p>Sign up to our infrequent mailing list for club updates, including rides, trips, training, kit, etc</p>
         <form
           style={{
             padding: 3
           }}
           action='https://tinyletter.com/peckhamcc'
           method='post'
           target='popupwindow'
           onSubmit={() => {
             window.open('https://tinyletter.com/peckhamcc', 'popupwindow', 'scrollbars=yes,width=800,height=600')
             return true
           }}
         >
           <p>
             <Label htmlFor='tlemail'>Enter your email address</Label>
           </p>
           <p>
             <Input type='text'
               name='email'
               id='tlemail'
               type='email'
               placeholder='me@example.com'
             />
           </p>
           <input type='hidden' value='1' name='embed'/>
           <Button>Subscribe</Button>
         </form>
         <HelpText>You can unsubscribe at any time. We promise never to share your details with anyone, ever.</HelpText>
       </Panel>
     </PageWrapper>
   )
 }
}

export default MailingListPage

import React from 'react';
import NavbarProfile from '../../components/Layouts/NavbarProfile';
import { FooterComponent } from '../../components/Layouts/FooterComponent';
import UserProfile from '../../components/Layouts/UserProfile';
import TableCard from '../../components/Layouts/TableCard';


export default function ProfileCard() {
  return (
    <div>
    <NavbarProfile/>
     <UserProfile/>
     {/* <TableCard/> */}
    <FooterComponent/>
    </div>
  )
}

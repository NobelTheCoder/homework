import Card from '../components/Card'
import NavBar from '../components/nav'
import './Home.css'
import { Navigate, useNavigate } from 'react-router-dom';
function Home(){
    const navigate = useNavigate(); // Move the hook inside the component


    return(
        <>
        <NavBar name="Home" link=""/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        
        </>
    )
}
export default Home
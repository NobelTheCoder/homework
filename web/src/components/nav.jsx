import './nav.css'
import { Navigate, useNavigate } from 'react-router-dom';
function NavBar(props) {
    const navigate = useNavigate(); // Move the hook inside the component

    const handleButtonClick = () => {
      navigate('/'+props.link); // Navigate to the /app route
    };
  

    return (
        <>
        <div className="nav">
            <p onClick={handleButtonClick}>{props.name}</p>
            <button>Contact Us</button>
        </div>
        </>
    )
}
export default NavBar;
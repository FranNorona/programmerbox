import "./navbar.css";

const Navbar = () => {
    return (
        <div className="navbar_container">
            <img src="https://res.cloudinary.com/dmhprmqnk/image/upload/v1726067335/logop_smiqmt.png" alt="logo" />
            <ul>
                <li>Pedidos(R:ORDERS)</li> 
                <li>Cuarentena</li>
                <li>Exportaciones</li>
            </ul>
        </div>
    )
}

export default Navbar;
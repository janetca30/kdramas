import { Link, useLocation } from 'react-router-dom';
import home from '../../assets/home.png'
import plus from '../../assets/plus.png'
import './FooterNav.css';

function FooterNav() {
    const location = useLocation();
    const homePage = location.pathname === "/";
    const newVideoPage = location.pathname === "/newVideo";

    return (
        <div className="footerNav">
            {homePage && (
                <>
                    <Link to="/" className="footerHome">
                        <button className="icon">
                            <img className="home" src={home} />
                            <p>HOME</p>
                        </button>
                    </Link>
                    <Link to="/newVideo" className="footerPlus">
                        <img className="plus" src={plus} />
                    </Link>
                </>
            )}
            {newVideoPage && (
                <>
                    <Link to="/" className="footerHome">
                        < img className="home" src={home} />
                    </Link>
                    <Link to="/newVideo" className="footerPlus">
                        <button className="icon">
                            <img className="plus" src={plus} />
                            <p>NEW VIDEO</p>
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default FooterNav;

import { React, useEffect, useRef, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { BsFillPeopleFill, BsFillPlayCircleFill, BsTable } from 'react-icons/bs';
import { MdSportsCricket } from 'react-icons/md';
import './layout.scss';


const sidebarNavItems = [
  {
    display: 'Matches',
    icon: <BsFillPlayCircleFill />,
    to: '/matches',
    section: 'matches'
  },
  {
    display: 'Player',
    icon: <BsFillPeopleFill />,
    to: '/players',
    section: 'players'
  },
  {
    display: 'Points Table',
    icon: <BsTable />,
    to: '/pointstable',
    section: 'pointstable'
  },
  {
    display: 'Venues',
    icon: <MdSportsCricket />,
    to: '/venues',
    section: 'venue'
  }
]

const Layout = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    const curPath2 = curPath.slice(0, -1);
    const activeItem = sidebarNavItems.findIndex(item => item.section === curPath || item.section === curPath2);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return <div style={{ padding: '0px 0px 0px 320px' }}>
    <div className="sidebar">
      <div className="sidebar__logo">
        IITCricInfo
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
          }}
        ></div>
        {
          sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index} style={{ textDecoration: 'none' }}>
              <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                <div className="sidebar__menu__item__icon">
                  {item.icon}
                </div>
                <div className="sidebar__menu__item__text">
                  {item.display}
                </div>
              </div>
            </Link>
          ))
        }
      
        <div className="credit"><a href="https://www.facebook.com/MSDhoni">Credits: MS Dhoni</a>
      
        </div>
      </div>

    </div>
    <Outlet />
  </div>;
};
export default Layout;
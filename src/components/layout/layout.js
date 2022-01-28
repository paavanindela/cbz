import React from "react";
import {Link} from "react-router-dom";

const Layout = (props) => {
return <div>
   <ul>
       <li><Link to={"/match"}>match</Link></li>
       <li><Link to={"/setting"}>Setting</Link></li>
       <li><Link to={"/payment"}>Payment</Link></li>
  </ul>
  {props.children}
</div>
};
export default Layout;
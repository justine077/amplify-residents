/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "./views/Dashboard";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";

var routes = [
  {
    path: "/",
    layout: "/admin/dashboard",
    name: "Admin Dashboard",
    icon: MdSpaceDashboard, // Use the imported icon component
    component: Dashboard,
  },

  {
    path: "/add-new-resident",
    layout: "/admin/dashboard",
    name: "Residents",
    icon: IoIosPeople,
    // component: Home,
  },

  {
    path: "/resident-list-page",
    layout: "/admin/dashboard",
    name: "Add New Resident",
    icon: IoIosPersonAdd,
    // component: Home,
  },
];
export default routes;

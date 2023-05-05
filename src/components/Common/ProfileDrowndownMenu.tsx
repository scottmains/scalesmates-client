import { useState, useEffect} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./ProfileDropdownMenu.css";
import { motion, Variants } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";
import { setIsAuthenticated, setToken } from "../../store/reducers/user";
import { useDispatch } from 'react-redux'; // Add this import

type DropdownMenuProps = {};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const ProfileDropdownMenu: React.FC<DropdownMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(setIsAuthenticated(false)); // Dispatch setIsAuthenticated action
    dispatch(setToken(null)); // Dispatch setToken action
    navigate('/');
  };


  return (
    <div className="profile-dropdown-wrapper">
      <motion.div initial={false} animate={isOpen ? "open" : "closed"} className="profile-menu">
      <FaUserAlt className="profile-icon" size={24} whiletap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)} />

        <motion.ul
        className="p-2"
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transform: "translateX(-130%)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <motion.li className="transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-white px-3 rounded"variants={itemVariants}>
            <NavLink 
            className="transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-white rounded"
            to="/profile">Profile</NavLink>
          </motion.li>
          <motion.li className="transition-colors duration-300 ease-in-out text-black hover:bg-gray-200 hover:text-black rounded" variants={itemVariants}>
            <p 
            onClick={handleLogout}>Logout</p>
          </motion.li>
        </motion.ul>
      </motion.div>
    </div> 
  );
};

export default ProfileDropdownMenu;

import { useState, useEffect} from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./DropdownMenu.css";
import { motion, Variants } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

type DropdownMenuProps = {};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const DropdownMenu: React.FC<DropdownMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="dropdown-wrapper"> {/* Add wrapper */}
      <motion.div initial={false} animate={isOpen ? "open" : "closed"} className="menu">
        <motion.button className="hamburger-menu" whileTap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.button>
        <motion.ul
        className="p-2"
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
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
        <motion.li variants={itemVariants}>
          <NavLink
            to="/"
            className="transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-white px-3 py-2 rounded"
          >
            Home
          </NavLink>
        </motion.li>
        <motion.li variants={itemVariants}>
          <NavLink
            to="/weight-tracker"
            className="transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-white px-3 py-2 rounded"
          >
            Weight Tracker
          </NavLink>
        </motion.li>
        <motion.li variants={itemVariants}>
          <NavLink
            to="/calorie-tracker"
            className="transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:text-white px-3 py-2 rounded"
          >
            Calorie Tracker
          </NavLink>
        </motion.li>
        </motion.ul>
      </motion.div>
    </div> 
  );
};

export default DropdownMenu;

import { CardContext } from "./Card";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar() {
  const [data, pathname] = useContext(CardContext);
  const [isVisible, setIsVisible] = useState(false);
  const closeBtnRef = useRef();

  const toggleSidebar = (event) => {
    document.body.classList.toggle(
      "sidebar-visible",
      closeBtnRef.current && closeBtnRef.current.contains(event.target)
    );
    setIsVisible(document.body.classList.contains("sidebar-visible"));
  };

  useEffect(() => {
    document.addEventListener("click", (event) => {
      toggleSidebar(event);
    });
  }, []);

  return (
    <>
      <div id="sidebar" className="sidebar">
        <div className="sidebar-content">
          <h3>Lo que juego</h3>
          <nav>
            <ul>
              {Object.keys(data).map((key, i) => {
                return (
                  data[key].title && (
                    <li key={i}>
                      <NavLink
                        to={key}
                        className={key === pathname ? "active" : ""}
                      >
                        {data[key].title}
                      </NavLink>
                    </li>
                  )
                );
              })}
            </ul>
          </nav>
          <button className="close-sidebar" aria-label="Cerrar">
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-controls="sidebar"
        aria-expanded={isVisible}
        ref={closeBtnRef}
      >
        <FontAwesomeIcon icon="fa-solid fa-gamepad" /> Más juegos
      </button>
    </>
  );
}

export default Sidebar;

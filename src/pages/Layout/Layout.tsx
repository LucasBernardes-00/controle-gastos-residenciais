import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { routesConfig } from "../routes";
import "./Layout.css";

export function Layout() {
  const [isConsultasOpen, setIsConsultasOpen] = useState(false);

  const mainRoutes = routesConfig.filter(r => !r.group && !r.hideInMenu);
  const groupRoutes = routesConfig.filter(r => r.group === "Consultas Totais");

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Menu</h2>
        <nav>
          <ul>
            {/* Renderiza rotas normais */}
            {mainRoutes.map((route, i) => (
              <li key={i}><Link to={route.index ? "/" : `/${route.path}`}>{route.label}</Link></li>
            ))}

            {/* Menu Retrátil */}
            <li className="menu-group">
              <div className="group-header" onClick={() => setIsConsultasOpen(!isConsultasOpen)}>
                Consultas Totais <span>{isConsultasOpen ? "▼" : "▶"}</span>
              </div>
              
              {isConsultasOpen && (
                <ul className="submenu">
                  {groupRoutes.map((route, i) => (
                    <li key={i}>
                      <Link to={`/${route.path}`}>{route.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
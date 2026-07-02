import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Label System</h2>

            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/print">Imprimir</Link>
                <Link to="/history">Historial</Link>
            </nav>
        </div>
    );
}
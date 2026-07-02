import { Routes, Route } from 'react-router-dom';

import DashboardPage from '../pages/DashboardPage';
import PrintLabelPage from '../pages/PrintLabelPage';
import HistoryPage from '../pages/HistoryPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/print" element={<PrintLabelPage />} />
            <Route path="/history" element={<HistoryPage />} />
        </Routes>
    );
}
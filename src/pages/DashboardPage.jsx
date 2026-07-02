import { useEffect, useState } from 'react';
import Layout from '../layouts/DashboardLayout';
import { getHistory } from '../api/labelApi';

export default function Dashboard() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const load = async () => {
            const res = await getHistory();
            setHistory(res.data.result || []);
        };

        load();
    }, []);

    const stats = history.reduce(
        (acc, item) => {
            if (item.eventType === 'PRINT') acc.impresiones++;
            if (item.eventType === 'REPRINT') acc.reimpresiones++;
            if (item.eventType === 'REJECTED') acc.rechazos++;
            return acc;
        },
        { impresiones: 0, reimpresiones: 0, rechazos: 0 }
    );

    return (
        <Layout>
            <h1>Dashboard</h1>

            <div className="cards">
                <div className="card">
                    <h2>{stats.impresiones}</h2>
                    <p>Impresiones</p>
                </div>

                <div className="card">
                    <h2>{stats.reimpresiones}</h2>
                    <p>Reimpresiones</p>
                </div>

                <div className="card">
                    <h2>{stats.rechazos}</h2>
                    <p>Rechazos</p>
                </div>
            </div>
        </Layout>
    );
}
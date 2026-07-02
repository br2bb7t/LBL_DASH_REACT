import { useEffect, useState } from "react";

import Layout from "../layouts/DashboardLayout";
import { getHistory } from "../api/labelApi";

export default function HistoryPage() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const response = await getHistory();

            setHistory(
                response.data.result || []
            );

        } catch (error) {

            console.error(
                "Error loading history",
                error
            );

        }

    };

    return (
        <Layout>

            <h1>Historial</h1>

            <table>

                <thead>
                    <tr>
                        <th>LPN</th>
                        <th>Evento</th>
                        <th>Resultado</th>
                        <th>Usuario</th>
                        <th>Fecha</th>
                        <th>Observación</th>
                    </tr>
                </thead>

                <tbody>

                    {history.map((item, index) => (
                        <tr key={index}>
                            <td>{item.lpnId}</td>
                            <td>{item.eventType}</td>
                            <td>{item.result}</td>
                            <td>{item.user}</td>
                            <td>{item.createdAt}</td>
                            <td>{item.reason}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </Layout>
    );

}
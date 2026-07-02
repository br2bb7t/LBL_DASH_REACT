import { useState } from 'react';
import Layout from '../layouts/DashboardLayout';
import { printLabel } from '../api/labelApi';

export default function PrintLabel() {
    const [lpn, setLpn] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const search = async () => {
        if (!lpn) return;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const r = await printLabel(lpn);
            const response = r.data;

            if (response.isError || response.isSuccessful === false) {
                setError(response.errorMessage || 'Error desconocido');
                return;
            }

            setData(response);
        } catch (err) {
            console.error('Error printing label', err);
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <h1>Imprimir Etiqueta</h1>

            {/* FORM */}
            <div className="form">
                <input
                    value={lpn}
                    onChange={(e) => setLpn(e.target.value)}
                    placeholder="Ingrese LPN"
                />

                <button onClick={search} disabled={loading}>
                    {loading ? 'Procesando...' : 'Buscar'}
                </button>
            </div>

            {/* ERROR */}
            {error && (
                <div className="error-card">
                    ❌ {error}
                </div>
            )}

            {/* RESULTADO */}
            {data && data.result && (
                <div className="card">
                    <h2>Resultado de impresión</h2>

                    <div className="print-details">
                        <p><strong>ID Etiqueta:</strong> {data.result.idEtiqueta}</p>
                        <p><strong>Orden de Compra:</strong> {data.result.purchaseOrder}</p>
                        <p><strong>TC Order:</strong> {data.result.tcOrderId}</p>
                        <p><strong>ZPL:</strong> {data.result.zpl}</p>
                        <p>
                            <strong>Reimpresión:</strong>{' '}
                            {data.result.isReprint ? 'Sí' : 'No'}
                        </p>
                    </div>

                    {/* PRODUCTOS */}
                    {data.result.products?.length > 0 && (
                        <div className="products-section">
                            <h3>Productos</h3>

                            <div className="products-grid">
                                {data.result.products.map((p, index) => (
                                    <div key={index} className="product-card">
                                        <p><strong>SKU:</strong> {p.sku}</p>
                                        <p><strong>Cant. Solicitada:</strong> {p.requestedQty}</p>
                                        <p><strong>Cant. Disponible:</strong> {p.availableQty}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
}
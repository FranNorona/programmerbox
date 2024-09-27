import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const GranelesDetail = () => {
    const { id } = useParams();  // Obtiene el ID desde la URL
    const [granel, setGranel] = useState(null);  // Estado para almacenar los datos del granel
    const [loading, setLoading] = useState(true);  // Estado de carga

    // Función para obtener el granel desde Firebase
    const fetchGranelDetail = async () => {
        try {
            const granelDoc = await getDoc(doc(db, "graneles", id)); // Obtiene el documento por ID
            if (granelDoc.exists()) {
                setGranel(granelDoc.data());  // Almacena los datos del granel en el estado
            } else {
                console.log("No se encontró el granel");
            }
        } catch (error) {
            console.error("Error obteniendo los detalles del granel: ", error);
        } finally {
            setLoading(false);  // Desactiva el estado de carga
        }
    };

    // Ejecuta la consulta cuando el componente se monta
    useEffect(() => {
        fetchGranelDetail();
    }, [id]);

    // Si está cargando los datos, muestra un mensaje de carga
    if (loading) {
        return <div>Cargando detalles...</div>;
    }

    // Si no se encontró el granel, muestra un mensaje
    if (!granel) {
        return <div>No se encontraron detalles para este granel</div>;
    }

    // Renderiza la tarjeta con los detalles del granel
    return (
        <Card sx={{ margin: 2 }}>
            <CardContent>
                <Typography variant="h4">Detalles del Granel {granel.code}</Typography>
                <Typography variant="body1"><strong>Descripción:</strong> {granel.description}</Typography>
                <Typography variant="body1"><strong>Lotes:</strong> {granel.lotes}</Typography>
                <Typography variant="body1"><strong>Cantidad:</strong> {granel.cuantity}</Typography>
                <Typography variant="body1"><strong>Estado:</strong> {granel.state}</Typography>
                <Typography variant="body1"><strong>Lotes en Stock:</strong> {granel.lotesInStock}</Typography>
                <Typography variant="body1"><strong>Acondicionar:</strong> {granel.toPacking}</Typography>
                <Typography variant="body1"><strong>Cantidad Acondicionar:</strong> {granel.cuantityPacking}</Typography>
                <Typography variant="body1"><strong>Comentarios:</strong> {granel.comments}</Typography>
            </CardContent>
        </Card>
    );
};

export default GranelesDetail;


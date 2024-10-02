import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const GranelesDetail = () => {
    const { id } = useParams();
    const [granel, setGranel] = useState(null);
    const [loading, setLoading] = useState(true); 

    const fetchGranelDetail = async () => {
        try {
            const granelDoc = await getDoc(doc(db, "graneles", id));
            if (granelDoc.exists()) {
                setGranel(granelDoc.data());
            } else {
                console.log("No se encontró el granel");
            }
        } catch (error) {
            console.error("Error obteniendo los detalles del granel: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGranelDetail();
    }, [id]);

    if (loading) {
        return <div>Cargando detalles...</div>; //AGREGAR SKELETON
    }

    if (!granel) {
        return <div>No se encontraron detalles para este granel</div>;
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
            <Card sx={{width: "500px", boxShadow: "0px 4px 8px grey;", borderRadius: "15px"}}>
                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly",  height: "400px",}}>
                    <h3 style={{ textAlign: "center" }}>DETALLES DE GRANEL - {granel.code}</h3>
                    <div>
                    <Typography variant="body1"><strong>Descripción:</strong> {granel.description}</Typography>
                    <Typography variant="body1"><strong>Lotes:</strong> {granel.lotes}</Typography>
                    <Typography variant="body1"><strong>Cantidad:</strong> {granel.cuantity}</Typography>
                    <Typography variant="body1"><strong>Estado:</strong> {granel.state}</Typography>
                    </div>
                    <h3 style={{ textAlign: "center" }}>EMPAQUE/ACONDICIONAR</h3>
                    <div>
                    <Typography variant="body1"><strong>Lotes en Stock:</strong> {granel.lotesInStock}</Typography>
                    <Typography variant="body1"><strong>Acondicionar:</strong> {granel.toPacking}</Typography>
                    <Typography variant="body1"><strong>Cantidad Acondicionar:</strong> {granel.cuantityPacking}</Typography>
                    <Typography variant="body1"><strong>Comentarios:</strong> {granel.comments}</Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GranelesDetail;


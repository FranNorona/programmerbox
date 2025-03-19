import { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {Box} from "@mui/material";
import { MaterialsUpdateContext } from "../../components/contexts/MaterialsUpdateContext";

const Materials = () => {
    const [materials, setMaterials] = useState([]);
    const { updateTrigger } = useContext(MaterialsUpdateContext);

    const fetchMaterials = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "materials"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMaterials(data);
        } catch (error) {
            console.error("Error al traer los datos", error);
        };
    };

    useEffect(() => {
        fetchMaterials();
    }, [updateTrigger]);

    return (
        <Box sx={{ width:"100vw", height:"auto", marginTop: "80px", padding:"20px"}}>
            {materials.length > 0 ? (
                materials.map(material => (
                    <Box key={material.id} 
                        sx={{padding: 2, 
                        border: "1px solid #ccc", 
                        borderRadius: "8px", 
                        marginBottom: "10px"}}>
                        <h3>{material.code}</h3>
                        <p>{material.description}</p>
                        <p>{material.provider}</p>
                        <p>Fecha Solicitada: {material.dateAnnoun}</p>
                        <p>Fecha Requerida: {material.dateRequest}</p>
                        <p>{material.comments}</p>
                    </Box>
                ))
            ) : (
                <p>No hay datos disponibles</p>
            )}
        </Box>
    );
};

export default Materials;
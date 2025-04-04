import { doc, setDoc } from "firebase/firestore";
import { Button } from "@mui/material";
import { db } from "../../firebaseConfig"
import UpdateIcon from '@mui/icons-material/Update';

const UpdateButton = ({ docId }) => {
    const handleUpdate = async () => {
        try {
            const docRef = doc(db, "materials", docId)
            await setDoc(docRef);
            console.log("Material actualizado" + docRef)
        } catch (error) {
            console.error("No se pudo actualizar el material", error)
        };
    };

    return (
        <div>
            <Button onClick={handleUpdate}><UpdateIcon /></Button>
        </div>
    )
};

export default UpdateButton;
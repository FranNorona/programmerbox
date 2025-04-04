import { doc, deleteDoc} from "firebase/firestore"
import { db } from "../../firebaseConfig"
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

const DeleteButton = ({ docId }) => {
    const handleDelete = async () => {
        try {
            const docRef = doc(db, "materials", docId);
            await deleteDoc(docRef);
            console.log("Documento eliminado" + docRef);
        } catch (error) {
            console.error("Error al eliminar el documento", error);
        }
    };

    return (
        <Button onClick={handleDelete}><DeleteIcon /></Button>
    );
};

export default DeleteButton;
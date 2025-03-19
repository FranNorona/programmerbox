import { useState, useContext } from "react";
import { MaterialsUpdateContext } from "../contexts/MaterialsUpdateContext"
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import FormMaterials from "../formMaterials/FormMaterials";

const AddButton = () => {
    const [openForm, setOpenForm] = useState(false);
    const { triggerUpdate } = useContext(MaterialsUpdateContext);

    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    return (
        <>
            <Button
                variant="contained"
                sx={{ height: '50px', bgcolor: "white", color: "#1976D2" }}
                onClick={handleOpenForm}
            >
                Agregar Pedido
            </Button>
            <Dialog open={openForm} onClose={handleCloseForm} sx={{
                    '& .MuiDialog-container': {
                        display: 'flex',
                        justifyContent: 'center',
                    },
                    '& .MuiDialog-paper': {
                        width: '50%',
                        maxWidth: '70%',
                    }
                }}>
                <DialogTitle>Ingresar Datos del Pedido</DialogTitle>
                <DialogContent>
                    <FormMaterials onClose={handleCloseForm} onAddOrder={triggerUpdate} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddButton;

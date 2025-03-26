import { useState, useContext } from "react";
import { MaterialsUpdateContext } from "../contexts/materialsUpdateContext/MaterialsUpdateContext"
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import FormMaterials from "../formMaterials/FormMaterials";
import AddIcon from '@mui/icons-material/Add';

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
                onClick={handleOpenForm}
            className="h-13.5 !bg-[white] !text-emerald-500">
                <AddIcon />
            </Button>
            <Dialog open={openForm} onClose={handleCloseForm} sx={{
                    '& .MuiDialog-container': {
                        display: 'flex',
                        justifyContent: 'center',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',
                        maxWidth: '70%',
                    }
                }}>
                <DialogTitle className="text-center">Ingresar Datos del Pedido</DialogTitle>
                <DialogContent>
                    <FormMaterials onClose={handleCloseForm} onAddOrder={triggerUpdate} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddButton;

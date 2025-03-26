import { TextField } from "@mui/material";

const Seeker = () => {
    return (
        <div className="!grow !mx-4">
            <TextField className="bg-[white] rounded-sm" label="Buscar" variant="filled" fullWidth/>
        </div>
    );
};

export default Seeker;
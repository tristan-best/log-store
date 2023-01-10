import { FormControl, Select, MenuItem } from "@mui/material";
import "../../css/FilterProduct/style.css";

const SelectCategory = ({ onChange, selectedCategory, categories }) => {
    return (
        <FormControl className="formControl">
            <Select value={selectedCategory.id} onChange={onChange}>
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectCategory;
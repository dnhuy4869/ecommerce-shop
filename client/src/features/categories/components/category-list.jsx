import { DataTable } from "@components/data-table"
import { useMemo } from "react"

export const CategoryList = () => {

    const headCells = useMemo(() => [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Dessert (100g serving)',
        },
        {
            id: 'calories',
            numeric: true,
            disablePadding: false,
            label: 'Calories',
        },
        {
            id: 'fat',
            numeric: true,
            disablePadding: false,
            label: 'Fat (g)',
        },
        {
            id: 'carbs',
            numeric: true,
            disablePadding: false,
            label: 'Carbs (g)',
        },
        {
            id: 'protein',
            numeric: true,
            disablePadding: false,
            label: 'Protein (g)',
        },
    ], []);

    const allCategories = [
        {
            name:'Cupcake', 
            calories: 305,
            fat: 3.7, 
            carbs: 67, 
            protein: 4.3, 
        },
    ];

    //const rows = useMemo(() => allCategories, [allCategories]);

    return (
        <>
            <DataTable title="Loại hàng" headCells={headCells} rows={allCategories} />
        </>
    )
}
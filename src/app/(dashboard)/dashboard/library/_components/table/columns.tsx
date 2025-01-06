// src/app/(dashboard)/dashboard/library/_components/table/columns.tsx

import {ColumnDef} from "@tanstack/react-table"

import {Button} from "@mantine/core";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    description: string
    createdAt: string
    name: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    名称
                    {/*<ArrowUpDown className="ml-2 h-4 w-4"/>*/}
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    简介
                    {/*<ArrowUpDown className="ml-2 h-4 w-4"/>*/}
                </Button>
            )
        },
    },
    { // todo: updatedAt
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    创建时间
                    {/*<ArrowUpDown className="ml-2 h-4 w-4"/>*/}
                </Button>
            )
        },
    },
]
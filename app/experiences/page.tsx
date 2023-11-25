import { allExperiences } from "contentlayer/generated"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function ExperiencesPage() {

    return (
    <div className="mx-auto py-10">
        <DataTable columns={columns} data={allExperiences} />
    </div>
    )
}

import { allProjects } from "contentlayer/generated"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function ProjectsPage() {

    return (
    <div className="mx-auto py-10">
        <DataTable columns={columns} data={allProjects} />
    </div>
    )
}

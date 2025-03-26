// src/app/(dashboard)/dashboard/library/page.tsx
import '@/App.css'
import LibraryUse from "@/app/(dashboard)/dashboard/library/_components/library-use";
import LibraryList from "@/app/(dashboard)/dashboard/library/_components/library-list";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "@/app/(dashboard)/layout.tsx";
import { Library } from "@/lib/types";
// import {Library} from "@/lib/types";
// import { API_BASE_PATH } from "@/lib/constants.ts";
import { getLibraries } from '@/lib/utils/db';
//import {fetch} from "@tauri-apps/plugin-http";

const DashboardLibraryPage = () => {
    const params = useParams()
    let [searchParams] = useSearchParams()

    let [libraries, setLibraries] = useState<Library[] | null>([])
    useEffect(() => {
        (async () => {
            // const res = await fetch(`${API_BASE_PATH}/api/db/library`)
            // const json = await res.json();
            // setLibraries(json.libraries)
            setLibraries(await getLibraries())
        })()
    }, [searchParams, params])
    if (!libraries || libraries.length == 0) {
        return
    }

    return (
        <Layout>
            <div>
                <h2 className={`p-4 font-semibold`}>知识库</h2>
                <div className={`p-4`}>
                    <LibraryUse libraries={libraries?.slice(0, 6)!} />
                </div>
                <LibraryList
                    libraries={libraries!}
                    // @ts-ignore
                    view={searchParams.get('view') || 'group'} />
            </div>
        </Layout>
    );
};

export default DashboardLibraryPage;
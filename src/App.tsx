import "./App.css";
import StartCards from '@/app/(dashboard)/_components/start-cards';
import NotesList from '@/app/(dashboard)/_components/notes-list';
import Layout from "@/app/(dashboard)/layout.tsx";

function App() {

    return (
        <Layout>
            <div>
                <h2 className={`p-4 font-semibold`}>开始</h2>
                <StartCards/>
                <h2 className={`p-4 font-semibold`}>文档</h2>
                <NotesList/>
            </div>
        </Layout>
    );
}

export default App;

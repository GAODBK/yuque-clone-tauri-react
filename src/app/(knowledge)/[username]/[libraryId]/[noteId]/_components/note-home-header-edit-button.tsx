// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-edit-button.tsx

import {Link, useSearchParams} from 'react-router-dom';

const NoteHomeHeaderEditButton = ({id, libraryId}: {
    id: string
    libraryId: string
}) => {
    let url = ``
    const [searchParams] = useSearchParams()
    if (searchParams.get('type') === 'ai-read' ||
        searchParams.get('type') === 'both') {
        url = `/malred/${libraryId}/${id}?type=both`
    } else {
        url = `/malred/${libraryId}/${id}?type=edit`
    }

    return (
        <Link to={url}>
            <span className={`py-2 px-4 font-semibold rounded-md text-sm bg-green-600 text-white`}>
                编辑
            </span>
        </Link>
    );
};

export default NoteHomeHeaderEditButton;
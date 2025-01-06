// src/app/(knowledge)/[username]/[libraryId]/[noteId]/_components/note-home-header-ai-button.tsx

import {useSearchParams} from "react-router-dom";
import {Link} from 'react-router-dom';
import {RiRobot2Line} from "react-icons/ri";

const NoteHomeHeaderAIButton = ({id, libraryId}: {
    id: string
    libraryId: string
}) => {
    let url = ``
    const [searchParams] = useSearchParams()
    if (searchParams.get('type') === 'edit' ||
        searchParams.get('type') === 'both') {
        url = `/malred/${libraryId}/${id}?type=both`
    } else {
        url = `/malred/${libraryId}/${id}?type=ai-read`
    }

    return (
        <Link to={url} className={``}>
            <RiRobot2Line className={`size-6`}/>
        </Link>
    );
};

export default NoteHomeHeaderAIButton;
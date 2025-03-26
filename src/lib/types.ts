// src/lib/types.ts

export type Library = {
    id: number;
    name: string;
    description: string;
    text: string;
    showDir: boolean;
    createdAt: Date;
    updatedAt: Date;

    notes: Note[]
    groups: Group[]
};

export type Group = {
    id: number;
    name: string;
    libraryId: number

    createdAt: Date;
    updatedAt: Date;
}

export type Note = {
    id: number;
    name: string;
    level: number;
    text: string;

    libraryId: number;
    groupId: number;
    parentNoteId: number;

    childrenNote?: Note[]
    library?: Library

    createdAt: Date;
    updatedAt: Date;
};

export type NoteHistory = {
    id: number;
    text: string;
    noteId: number;
    createdAt: Date;
    updatedAt: Date;
};

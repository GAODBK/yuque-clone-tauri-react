// src/lib/db.ts

import Database from "@tauri-apps/plugin-sql";

// import {PrismaClient} from "@prisma/client"

// // const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
// declare global {
//     var prisma: PrismaClient | undefined
// }

// // export const prisma = globalForPrisma.prisma || new PrismaClient()
// export const db = globalThis.prisma || new PrismaClient()

// // if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
// if (process.env.NODE_ENV !== "production") globalThis.prisma = db

declare global {
    var db: Database | undefined
}

export const db = globalThis.db || await Database.load("sqlite:malnote.db"); 
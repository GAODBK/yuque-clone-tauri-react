use tauri::utils::platform::current_exe;
use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn current_exe_pkg() -> String {
    let pkg_name = env!("CARGO_PKG_NAME");
    let pkg_name = pkg_name.to_string() + ".exe";

    // 获取当前目录的路径
    let current_exe = current_exe().unwrap();
    current_exe.display().to_string().replace(&pkg_name, "")
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            // 执行脚本的顺序, 1表示第一个执行
            version: 1,
            description: "create library table",
            sql: "
                    -- 启用外键支持
                    PRAGMA foreign_keys = ON;

                    CREATE TABLE library
                    (
                        id          integer                              NOT NULL PRIMARY KEY AUTOINCREMENT,
                        name        VARCHAR(191)                         NOT NULL,
                        description VARCHAR(191)                         NOT NULL,
                        text        LONGTEXT                             NOT NULL,
                        showDir     TINYINT(1) DEFAULT 0                 NOT NULL,
                        createdAt   DATETIME   DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        updatedAt   DATETIME
                    );

                    -- 创建触发器以自动更新 updatedAt 字段
                    CREATE TRIGGER update_updatedAt1
                        AFTER UPDATE
                        ON library
                        FOR EACH ROW
                    BEGIN
                        UPDATE library SET updatedAt = datetime('now', 'localtime') WHERE id = OLD.id;
                    END;
                  ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create group table",
            sql: "
                    -- 启用外键支持
                    PRAGMA foreign_keys = ON;

                    CREATE TABLE tb_group
                    (
                        id            integer                            NOT NULL PRIMARY KEY AUTOINCREMENT,
                        name          VARCHAR(191)                       NOT NULL,
                        parentGroupId integer,
                        libraryId     integer                            NOT NULL,
                        createdAt     DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        updatedAt     DATETIME,
                        FOREIGN KEY (libraryId) REFERENCES library (id) ON UPDATE CASCADE,
                        FOREIGN KEY (parentGroupId) REFERENCES tb_group (id) ON UPDATE CASCADE ON DELETE CASCADE
                    );

                    -- 创建触发器以自动更新 updatedAt 字段
                    CREATE TRIGGER update_updatedAt2
                        AFTER UPDATE
                        ON tb_group
                        FOR EACH ROW
                    BEGIN
                        UPDATE tb_group SET updatedAt = datetime('now', 'localtime') WHERE id = OLD.id;
                    END;
                  ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create note table",
            sql: "
                    -- 启用外键支持
                    PRAGMA foreign_keys = ON;

                    CREATE TABLE IF NOT EXISTS note
                    (
                        id           integer                            NOT NULL PRIMARY KEY AUTOINCREMENT,
                        name         TEXT                               NOT NULL,
                        level        INTEGER,
                        text         LONGTEXT                               NOT NULL,
                        libraryId    integer                               NOT NULL,
                        parentNoteId integer                               NULL,
                        groupId      integer                               NULL,
                        createdAt    DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        updatedAt    DATETIME,
                        FOREIGN KEY (groupId) REFERENCES tb_group (id),
                        FOREIGN KEY (libraryId) REFERENCES library (id),
                        FOREIGN KEY (parentNoteId) REFERENCES note (id)
                    );

                    -- 创建触发器以自动更新 updatedAt 字段
                    CREATE TRIGGER update_updatedAt3
                        AFTER UPDATE
                        ON note
                        FOR EACH ROW
                    BEGIN
                        UPDATE note SET updatedAt = datetime('now', 'localtime') WHERE id = OLD.id;
                    END;
                  ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create note history table",
            sql: "
                    -- 启用外键支持
                    PRAGMA foreign_keys = ON;

                    CREATE TABLE IF NOT EXISTS notehistory
                    (
                        id        integer PRIMARY KEY AUTOINCREMENT,
                        text      LONGTEXT                               NOT NULL,
                        noteId    integer                            NOT NULL,
                        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        updatedAt DATETIME,
                        FOREIGN KEY (noteId) REFERENCES note (id) ON UPDATE CASCADE ON DELETE CASCADE
                    );

                    -- 创建触发器来更新 updatedAt 字段
                    CREATE TRIGGER update_updatedAt4
                        AFTER UPDATE
                        ON notehistory
                        FOR EACH ROW
                    BEGIN
                        UPDATE notehistory SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
                    END;
                  ",
            kind: MigrationKind::Up,
        },
    ];

    let mut ctx = tauri::generate_context!();

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        // .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(
            tauri_plugin_sql::Builder::default()
                // 创建数据库
                .add_migrations("sqlite:malnote.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        // Init plugin and auto restore window theme !!!
        .plugin(tauri_plugin_theme::init(ctx.config_mut()))
        // .plugin(tauri_plugin_http::init())
        // .plugin(tauri_plugin_upload::init()) // 上传文件
        .invoke_handler(tauri::generate_handler![current_exe_pkg, greet])
        .run(ctx)
        .expect("error while running tauri application");
}

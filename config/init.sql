
CREATE TYPE role AS ENUM ('REVIEWER', 'EDITOR');

CREATE TABLE USERS (
        id BIGSERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        organization VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE PAPER_REGISTER (
        fk_user_id BIGINT ,
        registration_id BIGSERIAL PRIMARY KEY,
        title_main VARCHAR(255) NOT NULL,
        abstract VARCHAR(255) NOT NULL, //keywords , paper domain 
        no_of_authors INT NOT NULL CHECK (no_of_authors > 0),
        status VARCHAR(255) NOT NULL,
        current_version BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user_id FOREIGN KEY (fk_user_id) REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ISSUES (
        issue_id BIGSERIAL PRIMARY KEY,
        issue_name VARCHAR(255) NOT NULL,
        issue_url VARCHAR(255) NOT NULL,
        fk_admin_id BIGINT,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_admin_id FOREIGN KEY (fk_admin_id) REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE
);
        CREATE TABLE AUTHOR (
                fk_registration_id BIGINT,
                author_id BIGSERIAL PRIMARY KEY,
                fname VARCHAR(255) NOT NULL,
                lname VARCHAR(255) NOT NULL,
                organization VARCHAR(255) NOT NULL, 
                email VARCHAR(255) NOT NULL ,
                phone VARCHAR(255) NOT NULL, // country
                CONSTRAINT fk_registration_id FOREIGN KEY (fk_registration_id) REFERENCES PAPER_REGISTER(registration_id) ON DELETE CASCADE ON UPDATE CASCADE
        );
CREATE TABLE AUTHORPOSITION (
        fk_author_id BIGINT,
        fk_registration_id INT,
        position VARCHAR(255) NOT NULL,
        CONSTRAINT fk_author_id FOREIGN KEY (fk_author_id) REFERENCES AUTHOR(author_id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_registration_id FOREIGN KEY (fk_registration_id) REFERENCES PAPER_REGISTER(registration_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE PUBLISHED_PAPER (
        fk_issue_id BIGINT,
        fk_registration_id BIGINT,
        paper_url VARCHAR(255) NOT NULL,
        fk_editior_id BIGINT,
        copyright_fotm_url VARCHAR(255) NOT NULL,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_issue_id FOREIGN KEY (fk_issue_id) REFERENCES ISSUES(issue_id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_registration_id FOREIGN KEY (fk_registration_id) REFERENCES PAPER_REGISTER(registration_id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_editior_id FOREIGN KEY (fk_editior_id) REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE VERSION (
        fk_registration_id BIGINT NOT NULL,
        version_id BIGSERIAL PRIMARY KEY,
        tittle VARCHAR(255) NOT NULL,// spell change
        paper_url VARCHAR(255) NOT NULL,
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        comments VARCHAR(255) NOT NULL,
        CONSTRAINT fk_registration_id FOREIGN KEY (fk_registration_id) REFERENCES PAPER_REGISTER(registration_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE EDITOR (
        fk_usr_id BIGINT,
        fk_registration_id BIGINT,
        reviwer_type role NOT NULL,
        undertaking_status BOOLEAN NOT NULL,
        ASSIGNED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_usr_id FOREIGN KEY (fk_usr_id) REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_registration_id FOREIGN KEY (fk_registration_id) REFERENCES PAPER_REGISTER(registration_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ADMIN_TOKEN (
    admin_token_id BIGSERIAL PRIMARY KEY,
    admin_token_value TEXT NOT NULL,
    fk_admin_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_id FOREIGN KEY (fk_admin_id) REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE AUTHOR_TOKEN (
    author_token_id BIGSERIAL PRIMARY KEY,
    author_token_value TEXT NOT NULL,
    fk_author_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_author_id FOREIGN KEY (fk_author_id) REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE EDITOR_TOKEN (
    editor_token_id BIGSERIAL PRIMARY KEY,
    editor_token_value TEXT NOT NULL,
    fk_editor_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_editor_id FOREIGN KEY (fk_editor_id) REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE
);


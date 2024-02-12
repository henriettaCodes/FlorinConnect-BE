DROP TABLE IF EXISTS reply;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    account_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(20),
    password CHAR(60),
    isAdmin BOOLEAN,
    PRIMARY KEY (account_id),
    UNIQUE (username)
);

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    account_id INT NOT NULL,
    category VARCHAR(30),
    title VARCHAR(50),
    content VARCHAR(1500),
    date_posted TIMESTAMP,
    PRIMARY KEY (post_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE reply (
    reply_id INT GENERATED ALWAYS AS IDENTITY,
    post_id INT NOT NULL,
    account_id INT NOT NULL,
    content VARCHAR(300),
    date_posted TIMESTAMP,
    PRIMARY KEY (reply_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    account_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

INSERT INTO account(username, password, isAdmin) VALUES (
    'test',
    'pass',
    true
);

INSERT INTO post (account_id, category, title, content, date_posted) VALUES (
    1,
    'test',
    'test',
    'test',
    CURRENT_TIMESTAMP
);
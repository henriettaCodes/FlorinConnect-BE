DROP TABLE IF EXISTS reply;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    account_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(20),
    password CHAR(60),
    is_admin BOOLEAN,
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
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    account_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

INSERT INTO account(username, password, is_admin) VALUES (
    'test',
    'pass',
    true
);

INSERT INTO account(username, password, is_admin) VALUES (
    'test2',
    'pass',
    false
);

INSERT INTO post (account_id, category, title, content, date_posted) VALUES (
    1,
    'test',
    'test',
    'test',
    CURRENT_TIMESTAMP
);

INSERT INTO post (account_id, category, title, content, date_posted) VALUES (
    1,
    'test',
    'test2',
    'test2',
    CURRENT_TIMESTAMP
);

INSERT INTO post (account_id, category, title, content, date_posted) VALUES (
    1,
    'event',
    'Formal Dance',
    'This years community ball will take place on May 18th at the village hall!',
    CURRENT_TIMESTAMP
);

INSERT INTO post (account_id, category, title, content, date_posted) VALUES (
    2,
    'event',
    'Choir service',
    'Tomorrow night (14th Feb) is our valentine day choir service at the church',
    CURRENT_TIMESTAMP
);

INSERT INTO post (account_id, category, title, content, date_posted) VALUES (
    1,
    'job',
    'Graduate Cleaner with chance at promotion',
    'Looking for graduates to clean our garage. 2:1 minimum in a STEM subject. Text 072324454 for more details...',
    CURRENT_TIMESTAMP
);

INSERT INTO post (account_id, category, title, content, date_posted) VALUES (
    1,
    'job',
    'Hit Man wanted',
    'Looking for an agent. you know how to contact me...',
    CURRENT_TIMESTAMP
);

INSERT INTO post (account_id, category, title, content, date_posted) VALUES (
    2,
    'volunteering',
    'Help needed at surgery',
    'Doctors needed for brain transplant. No experience required, just a can do attitude',
    CURRENT_TIMESTAMP
);

INSERT INTO post (account_id, category, title, content, date_posted) VALUES (
    2,
    'volunteering',
    'Coach needed for premier league side',
    'Need someone to win us games. contact us in person at the ground',
    CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS post;

CREATE TABLE post(
    post_id INT GENERATED ALWAYS AS IDENTITY,
    content VARCHAR(255)
);

INSERT INTO post (content) VALUES
('test 1'),
('test 2'),
('test 3');
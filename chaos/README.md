> This question is relevant for **chaos backend**

# DevSoc Subcommittee Recruitment: Chaos Backend

**_Complete as many questions as you can._**

## Question 1

You have been given a skeleton function `process_data` in the `data.rs` file.
Complete the parameters and body of the function so that given a JSON request of the form

```json
{
  "data": ["Hello", 1, 5, "World", "!"]
}
```

the handler returns the following JSON:

```json
{
  "string_len": 11,
  "int_sum": 6
}
```

Edit the `DataResponse` and `DataRequest` structs as you need.

## Question 2

### a)

Write (Postgres) SQL `CREATE TABLE` statements to create the following schema.
Make sure to include foreign keys for the relationships that will `CASCADE` upon deletion.
![Database Schema](db_schema.png)

**Answer box:**

```sql
CREATE TABLE forms (
    --     Add columns here
    id            SERIAL PRIMARY KEY,
    title         TEXT,
    description   TEXT
);

-- I am assuming that the question type is a
-- uniquely defined ENUM
CREATE TYPE question_type AS ENUM ('ShortAnswer','MULTISELECT','MultiChoice');

CREATE TABLE questions (
    --     Add columns here
    id           SERIAL PRIMARY KEY,
    form_id      INT NOT NULL,
    title        TEXT,
    question_type question_type NOT NULL,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE

);

CREATE TABLE question_options (
    --     Add columns here
    id               SERIAL PRIMARY KEY,
    question_id      INT NOT NULL,
    option           TEXT,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE

);
```

### b)

Using the above schema, write a (Postgres) SQL `SELECT` query to return all questions in the following format, given the form id `26583`:

```
   id    |   form_id   |           title             |   question_type   |     options
------------------------------------------------------------------------------------------------------------
 2       | 26583       | What is your full name?     | ShortAnswer       | [null]
 3       | 26583       | What languages do you know? | MULTISELECT      | {"Rust", "JavaScript", "Python"}
 7       | 26583       | What year are you in?       | MultiChoice       | {"1", "2", "3", "4", "5+"}
```

**Answer box:**

```sql
-- Write query here
-- If you want a less hassle version without the arrays
SELECT * FROM questions WHERE form_id = 26583;

-- Okay, this one is annoying, for starters what we do is that set the questions table as q
-- for easy handling, then we define the question options as qo
-- then we basically link the id in the entries on the quesiton table to the parent id in the question options
-- this way, each question is now linked to each of its options in the table
-- Now, we basically took the questions parent form id and we call up every question from that form?
-- After calling up every question with the form id specified. We use JSON.AGG where we aggregate all
-- the options with the specific q.id. After this, we add a filter, so if we have a question with no options
-- It returns NULL, and coalesce turns null into []. Then it groups all them into an array, and we get a cut table.

SELECT
      q.id AS id,
      q.form_id AS form_id,
      q.title AS title,
      q.question_type,
      COALESCE(JSON_AGG(qo.option) FILTER (WHERE qo.id IS NOT NULL) , '[]') AS options
FROM questions q
LEFT JOIN question_options qo ON q.id = qo.question_id
WHERE q.form_id = 26583
GROUP BY q.id;
```

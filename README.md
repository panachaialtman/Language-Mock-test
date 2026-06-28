# Language Mock Test Practice

A simple static practice website for JLPT N5 and HSK 4 mock tests.

The site uses only HTML, CSS, and JavaScript. There is no backend, database, login, build step, or package install.

## Current Features

- JLPT N5 and HSK 4 practice modes
- Full tests, mini tests, section practice, and wrong answer review
- Random question selection with recent-question tracking
- Answer option shuffling
- Result history and wrong answer saving in the browser
- Export and import saved progress as a JSON file
- Question bank validation tools
- Mobile-friendly layout

## Files

- `index.html` - page structure
- `style.css` - visual styling and mobile layout
- `script.js` - test logic, scoring, storage, export/import, and validation
- `questions.js` - question bank

## How To Run Locally

Open `index.html` directly in a browser.

No local server is required.

## GitHub Pages Deployment

1. Put these files in a GitHub repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `questions.js`
   - `README.md`
2. In GitHub, open the repository settings.
3. Go to Pages.
4. Choose the main branch and the root folder.
5. Save and wait for GitHub Pages to publish the site.

The app uses relative file paths, so it should work from the repository root on GitHub Pages.

## Saved Progress

Progress is saved in the visitor's own browser with `localStorage`.

This includes:

- latest result
- result history
- wrong answers
- recently used question IDs
- simple settings

Use **Export Progress** to download a backup JSON file. Use **Import Progress** to restore that file in another browser or computer.

Importing progress replaces the current saved progress in that browser.

## Question Bank Counts

Current total: 290 questions.

- JLPT N5: 240
- HSK 4: 50
- Vocabulary: 90
- Grammar: 90
- Reading: 50
- Listening-style: 50
- Writing: 10

## Adding More Questions

Add new question objects to `questions.js`.

Each question should have:

- unique `id`
- `exam`
- `language`
- `level`
- `section`
- `type`
- `difficulty`
- `question`
- `passage`
- `options`
- `correctIndex`
- `explanation`
- `tags`

Each question must have exactly 4 options, and `correctIndex` must be `0`, `1`, `2`, or `3`.

After adding questions, open the site and click **Question bank tools** then **Check Question Bank**. The browser console also prints a validation report when the page loads.

## Public Note

This is an unofficial study tool. It is not an official JLPT or HSK exam product.

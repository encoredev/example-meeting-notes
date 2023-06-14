<img width="200px" src="https://encore.dev/assets/branding/logo/logo.svg" alt="Encore - The Backend Development Engine" />

# Meeting Notes

This is an example application (frontend + backend) for a Markdown Meeting Notes app.

Live demo: <https://encoredev.github.io/example-meeting-notes/>

The backend uses an SQL database to store meeting notes and has three API endpoints: 
* `GET  /note/:id` - Retrieve a note by ID.
* `POST /note` - Create a new note (or update an existing one).
* `GET  /images/:query` - Search for images by using the [Pexels API](https://www.pexels.com/api/).

The frontend is a React application...

## Developing locally

When you have [installed Encore](https://encore.dev/docs/install), you can create a new Encore application and clone this example by running this command:

```bash
encore app create my-app-name --example=meeting-notes
```

## Running

To run the application locally, make sure you have [Docker](https://docker.com) installed and running. This is required to run Encore applications with SQL databases.

```bash
# Run the backend
encore run

# In a different terminal window, run the frontend
cd frontend
npm install
npm run generate_request_client:local # Creates request client used to make requests to your backend
npm run dev
```

### Encore developer dashboard

While `encore run` is running, open <http://localhost:4000/> to view Encore's local developer dashboard.
Here you can see the request you just made and a view a trace of the response.

## Deployment

### Backend

Deploy your backend to a staging environment in Encore's free development cloud.

```bash
git push encore
```

You can view your backend deploys, metrics and traces <https://app.encore.dev>.

### Frontend

#### Using GitHub pages

1. Create a repo on GitHub
2. In the `vite.config.js` file, set the `base` property to the name of your repo: 
```ts
base: "/example-meeting-notes/",
```
3. Push your code to GitHub and wait for the GitHub actions workflow to finish.
4. Go to *Settings* → *Pages* for your repo on GitHub and set *Branch* to `gh-pages`.

Your site should now be available at `https://<your-github-username>.github.io/<your-repo-name>/`.

Pushing new code to GitHub will automatically update your site (see the GitHub actions workflow in the `.github` folder).

Read more about GitHub pages here: <https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site>

#### Using Vercel

...

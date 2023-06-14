<img width="200px" src="https://encore.dev/assets/branding/logo/logo.svg" alt="Encore - The Backend Development Engine" />

# Meeting Notes

This is an example application (frontend + backend) for a Markdown Meeting Notes app.

The backend uses an SQL database to store meeting notes and has three API endpoints: 
* `GET  /note/:id` - Retrieve a note by ID.
* `POST /note` - Create a new note (or update an existing one).
* `GET  /images/:query` - Search for images by using the [Pexels API](https://www.pexels.com/api/).

The frontend is a React application...

## Developing locally

When you have [installed Encore](https://encore.dev/docs/install), you can create a new Encore application and clone this example with this command.

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
npm run dev
```

## Open the developer dashboard

While `encore run` is running, open <http://localhost:4000/> to view Encore's local developer dashboard.
Here you can see the request you just made and a view a trace of the response.

## Deployment

Deploy your backend to a staging environment in Encore's free development cloud.

```bash
git push encore
```

Then head over to <https://app.encore.dev> to find out your production URL, and off you go into the clouds!

Frontend deployments...

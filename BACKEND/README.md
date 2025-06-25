# MongoDB Connection Setup

To connect to MongoDB Atlas (cloud database):

1. Go to https://www.mongodb.com/cloud/atlas and create a free account.
2. Create a new cluster (use the free tier).
3. Create a database user and password.
4. Get your connection string from the Atlas dashboard. It will look like:
   mongodb+srv://<username>:<password>@<cluster-url>/tailorTMS?retryWrites=true&w=majority
5. In the BACKEND directory, create a file named `.env` and add:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/tailorTMS?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=5000
```

6. Save the file and start your backend server with `npm start`.

--- 
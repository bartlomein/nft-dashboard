#  NFT Dashboard

This is a full stack application for showing NFTs from the OpenSea plaform and being able to add and remove them using a shopping cart.

## Installation

1. Clone the repository

## Backend

### Backend Installation

1. Go into the `backend` folder
2. run `npm i`

### Backend Running

1. While inside of `backend` folder run `npm run start:dev`
2. GraphQL playground can be accessed at `http://localhost:3000/graphql`

### Backend Testing

1. While inside `backend` folder run `npm run test`

## Frontend

### Frontend Installation

1. Go into the `frontend` folder
2. run `npm i`
3. Create a `.env.local` file inside the `frontend` root
4. Add your OpenSea API key `NEXT_PUBLIC_OPENSEA = "KEY"`

### Frontend Running

1. While inside of `frontend` folder run `npm run dev`
2. Open `http://localhost:8080/`

### Frontend Testing

1. While inside `frontend` folder run `npm run test`

## Application Description

- The application will load the top 12 collections from OpenSea on the main page `http://localhost:8080/`
- A user can click on one of these collections to see the the NFTs inside of that collection
- A user can also navigate to `/collection/<COLLECTION_NAME>`
- A user can click the "Add to cart" button to add it to the shopping cart
- Top right a shopping cart will appear with the names of the items in the cart and the button to add the NFT to cart will be disabled
- A user can click on the name of the NFT in the shopping cart to remove it from the cart and re-enable the button.

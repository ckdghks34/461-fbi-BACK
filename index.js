import {GraphQLServer} from "graphql-yoga";
import resolvers from "./graphql/resolvers";
import {PrismaClient} from "@prisma/client";

const express = require('express');
const prisma = new PrismaClient();
// const PORT = process.env.PORT || 5000;
const morgan = require('morgan');

//server options
const options = {
	port:5000,
	endpoint:'/graphql',
	debug:false,
}

//server 
const server = new GraphQLServer({
	typeDefs: ["graphql/schema.graphql"],
	resolvers,
	debug : false
});

server.express.use('/img',express.static('img'));
server.express.use(morgan('short'));

async function main() {
	// ... you will write your Prisma Client queries here
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.disconnect()
	})



server.start(options, ({port}) => 
	console.log("Graphql Server Running : port = "+`${port}`)
);

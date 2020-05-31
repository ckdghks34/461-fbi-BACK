import {GraphQLServer} from "graphql-yoga";
import resolvers from "./graphql/resolvers";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

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

const server = new GraphQLServer({
	typeDefs: ["graphql/schema.graphql"],
	resolvers
});

server.start({ port : 5000},() => console.log("Graphql Server Running : port = 5000!"));

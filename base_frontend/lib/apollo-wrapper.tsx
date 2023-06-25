import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
  from,
} from "@apollo/client";
// import { getOperationAST } from "graphql";
// import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`,
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => {
    // const authMiddleware = setContext(async (_, { headers }) => {
    //   const { token } = await fetch("/api/auth/token").then((res) =>
    //     res.json()
    //   );
    //   return {
    //     headers: {
    //       ...headers,
    //       authorization: `Bearer ${token}`,
    //     },
    //   };
    // });

    // console.log("auth-middleware: ", authMiddleware);

    return new ApolloClient({
      link: from([
        // authMiddleware,
        httpLink,
        // split(
        //   ({ query, operationName, variables }) =>
        //     isLiveQuery(getOperationAST(query, operationName), variables),
        //   sseLink,
        //   httpLink
        // ),
      ]),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

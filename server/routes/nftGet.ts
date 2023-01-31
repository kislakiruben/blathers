import Express from "express";
import { request, gql } from "graphql-request";

const endpoint: string = process.env.API_ENDPOINT!;

interface RequestQuery {
  after?: string;
  limit?: number;
  ownerAddresses?: string;
}
interface Node {
  token: Object;
}

export default async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const variables: RequestQuery = req.query;
  const query = gql`
    query getNFTsForAddress(
      $ownerAddresses: [String!]
      $limit: Int! = 3
      $after: String
    ) {
      tokens(
        networks: [{ network: ETHEREUM, chain: MAINNET }]
        pagination: { after: $after, limit: $limit }
        where: { ownerAddresses: $ownerAddresses }
      ) {
        nodes {
          token {
            tokenId
            name
            owner
            image {
              url
            }
            metadata
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          limit
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query, variables);

    res.json({
      entries: data.tokens.nodes.map((node: Node) => node.token),
      metadata: {
        cursor: data.tokens.pageInfo.endCursor,
        limit: data.tokens.pageInfo.limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

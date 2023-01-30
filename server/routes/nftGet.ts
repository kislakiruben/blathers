import Express from "express";
import { request, gql } from "graphql-request";

const endpoint: string = process.env.API_ENDPOINT!;

interface RequestBody {
  after?: string;
  limit: number;
  ownerAddresses: string;
}

export default async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const variables: RequestBody = req.body;
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

    res.json(data);
  } catch (error) {
    next(error);
  }
};

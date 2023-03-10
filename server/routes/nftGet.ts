import Express from "express";
import get from "lodash/get";
import { request, gql } from "graphql-request";
import has from "lodash/has";

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
  const variables: RequestQuery = {
    ...req.query,
    ...(has(req.query, "limit")
      ? { limit: parseInt(req.query.limit as string, 10) }
      : {}),
  };
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
            content {
              url
              mimeType
              size
              mediaEncoding {
                ... on ImageEncodingTypes {
                  poster
                }
                ... on VideoEncodingTypes {
                  preview
                }
              }
            }
            description
            metadata
            image {
              mediaEncoding {
                ... on ImageEncodingTypes {
                  poster
                }
                ... on VideoEncodingTypes {
                  preview
                }
              }
              mimeType
              url
            }
            collectionName
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
        hasNextPage: data.tokens.pageInfo.hasNextPage,
        limit: data.tokens.pageInfo.limit,
      },
    });
  } catch (error: any) {
    const addressNotFoundError = get(error, "response.errors", []).some(
      (err: any) => {
        return err.message.includes(
          "Address must be a valid address or ENS domain"
        );
      }
    );

    if (addressNotFoundError) {
      res.sendStatus(404);
    } else {
      next(error);
    }
  }
};

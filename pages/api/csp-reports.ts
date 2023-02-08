// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type CspReport = {
  "csp-report": {
    "blocked-uri": string;
    disposition: string;
    "document-uri": string;
    "effective-directive": string;
    "original-policy": string;
    referrer: string;
    "status-code": number;
    "violated-directive": string;
  };
};

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // Process a POST request
    res.status(200).json(req.body);
  } else {
    res.status(200).json({ name: "OK" });
  }
}

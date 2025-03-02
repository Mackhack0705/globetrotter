import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { city, userAnswer } = req.body;
    const isCorrect = city.toLowerCase() === userAnswer.toLowerCase();
    res.status(200).json({ isCorrect });
}